const express = require("express");

const app = express();

app.listen(3033, () => {
  console.log("shelly2 listening on ::3033");
});

app.get("/**", (req, res) => {
  console.log(`req: ${req.url}`);
  res.status(200).json({
    name: "shelly2",
    msg: "got request",
    req: `${req.url}`,
  });
});
