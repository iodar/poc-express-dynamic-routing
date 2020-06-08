const express = require("express");

const app = express();

app.listen(3038, () => {
  console.log("shelly2 listening on ::3038");
});

app.get("/**", (req, res) => {
  console.log(`req: ${req.url}`);
  res.status(200).json({
    name: "shelly3",
    msg: "got request",
    req: `${req.url}`,
  });
});
