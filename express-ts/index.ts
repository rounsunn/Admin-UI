import express, { Express, Request, Response } from "express";
const app = express();
const port = 8000;

app.get("/users", (req, res) => {
  res.send("Hello World! from express using TS!!!");
});

app.listen(port, () => {
  console.log("server app listening on port 8000!");
});
