const express = require("express");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

const app = express();

let routing = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routes.json"), {
    encoding: "utf-8",
  })
);

app.listen(3000, () => {
  console.log("express server ready");
});

app.use("/", (req, _, next) => {
  console.log(`req: ${req.originalUrl}`);
  next();
});

app.get("/config/reload", (_, res) => {
  routing = JSON.parse(
    fs.readFileSync(path.join(__dirname, "routes.json"), {
      encoding: "utf-8",
    })
  );
  res.status(200).json({
    amountOfRoutes: routing.routes.length,
    routes: routing.routes,
  });
});

app.use("/", (req, res, next) => {
  const urlMatchPattern = /^\/shelly\d{1,}\//;
  const requestUrl = req.url;

  if (requestUrl.match(urlMatchPattern) === null) {
    next();
  } else {
    const shellyName = requestUrl.match(urlMatchPattern)[0].replace(/\//g, "");
    const route = routing.routes.find((route) => route.name === shellyName);
    if (route === undefined) {
      next();
    } else {
      // redirect request
      const [, path] = requestUrl.split(shellyName);
      fetch(`${route.baseUrl}${path}`).then(async (response) => {
        const body = await response.json();
        res.status(response.status).json(body);
      });
    }
  }
});

app.use("/", (req, res) => {
  console.log(`no handler: req: ${req.url}`);
  res.status(404).json({
    name: "unknown handler",
    msg: "got request",
    req: `${req.url}`,
  });
});
