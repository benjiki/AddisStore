import express, { Request, Response } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from "@clerk/express";
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3002", "http://localhost:3003"],
    credentials: true,
  })
);
app.use(clerkMiddleware());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: Date.now() });
});

app.get("/test", (req: Request, res: Response) => {
  const auth = getAuth(req);
  if (!auth.isAuthenticated) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  res.json({ message: "Product Serive Auth:", auth });
});
app.listen(8000, () => {
  console.log("Product service is running on port 8000");
});
