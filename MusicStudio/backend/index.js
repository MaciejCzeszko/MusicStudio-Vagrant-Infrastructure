import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import studioRoutes from "./routes/studios.js";
import reservationRoutes from "./routes/reservation.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("Music Studio Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/studios", studioRoutes);
app.use("/api", reservationRoutes);

app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend listening on port ${PORT}`);
});
