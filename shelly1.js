const express = require("express");

const app = express();

app.listen(3030, () => {
  console.log("shelly1 listening on ::3030");
});

app.get("/**", (req, res) => {
  console.log(`req: ${req.url}`);
  res.status(200).json({
    name: "shelly1",
    msg: "got request",
    req: `${req.url}`,
  });
});
