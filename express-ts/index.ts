import express, { Express, Request, Response } from "express";
const app = express();
const port = 8000;

app.get("/users", (req, res) => {
  res.send("Users is not available till now using concurrently");
});

app.listen(port, () => {
  console.log("server app listening on port 8000!");
});
