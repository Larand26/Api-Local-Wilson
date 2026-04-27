import OrdersService from "../services/OrdersService.js";

import type { Request, Response } from "express";

abstract class OrdersController {
  static async getOrders(req: Request, res: Response) {
    const result = await OrdersService.getOrders();
    res.json(result);
  }
}

export default OrdersController;
