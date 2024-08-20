import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authroutes from "./routes/authroutes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import path from "path";

import { app, server } from "./socket/socket.js";

dotenv.config();
app.use(cookieParser());

app.use(express.json());
// to parse the incomming request with json payload(from req.body)

const Port = process.env.PORT || 5000;

const __dirname = path.resolve();
// console.log(process.env.PORT);
// app.get("/", (req, res) => {
//   res.send("Hello World Sever Ready!");
// });

app.use("/api/auth", authroutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(Port, () => {
  connectToMongoDB();
  console.log(`server Running on port ${Port} `);
});
