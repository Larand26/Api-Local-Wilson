import fs from "fs";
import path, { dirname } from "path";

import SqlServer from "../db/SqlServer.js";

import type { Iresponse } from "../interface/interfaces.js";

const __dirname = dirname(import.meta.url);

abstract class OrdersService {
  private static queryPath = path.join(__dirname, "../queries/getOrders.sql");
  private static query = fs.readFileSync(this.queryPath, "utf8");

  static async getOrders(): Promise<Iresponse> {
    try {
      if (!this.query) {
        throw new Error("SQL query not found");
      }
      const orders = await SqlServer.query(this.query);
      return { success: true, data: orders };
    } catch (error) {
      console.error("Error fetching orders:", error);
      return { success: false, error: "Failed to fetch orders" };
    }
  }
}

export default OrdersService;
