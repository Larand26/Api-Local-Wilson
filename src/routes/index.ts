import { Router } from "express";
import type { Request, Response } from "express";

// Controlers
import OrdersController from "../controllers/OrdersController.js";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Hello from the routes!");
});

routes.get("/api/get-orders", async (req: Request, res: Response) => {
  await OrdersController.getOrders(req, res);
});

export default routes;
