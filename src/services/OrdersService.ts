import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import SqlServer from "../db/SqlServer.js";

import type { Iresponse } from "../interface/interfaces.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

abstract class OrdersService {
  private static queryPath = path.resolve(
    __dirname,
    "..",
    "db",
    "query",
    "getOrdersQuery.sql",
  );
  private static query: string | null = null;

  static async initialize() {
    try {
      if (this.query) {
        return;
      }
      this.query = await fs.readFile(this.queryPath, "utf8");
    } catch (error) {
      console.error(
        `[OrdersService] Erro fatal: Não foi possível carregar a query em ${this.queryPath}`,
      );
      throw error;
    }
  }

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
