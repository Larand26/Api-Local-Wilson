import fs from "fs";
import path from "path";

import SqlServer from "../db/SqlServer.js";

import type { Iresponse } from "../interface/interfaces.js";

abstract class OrdersService {
  static async getOrders(): Promise<Iresponse> {
    try {
      const queryPath = path.join("src", "db", "query", "getOrdersQuery.sql");
      const query = fs.readFileSync(queryPath, "utf8");
      const orders = await SqlServer.query(query);
      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { success: false, error: "Failed to fetch orders" };
    }
  }
}

export default OrdersService;
