import express from "express";
import startSocket from "./utils/socket.js";
import connectDb from "./utils/database.js";
import { AppRouter } from "./utils/route.js";
const PORT = 4000;
try {
  const app = express();
  app.use(express.json());
  await connectDb();

  // IiZGWHBhANPfBFsX

  app.use("/", AppRouter);
  startSocket(app);
} catch (error) {
  console.log(error);
}
