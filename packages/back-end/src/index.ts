import express from "express";

export default function createApp() {
  const app = express();

  app.get("/", (_, res) => {
    res.json({ message: "Hello World" });
  });
  
  return app;
}