import OrdersService from "../services/OrdersService.js";

import type { Request, Response } from "express";

abstract class OrdersController {
  static async getOrders(req: Request, res: Response) {
    const result = await OrdersService.getOrders();
    if (result.success) {
      res.status(200).json(result.data);
    } else {
      res.status(500).json({ error: result.error });
    }
  }
}

export default OrdersController;
