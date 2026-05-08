import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import SqlServer from "../db/SqlServer.js";

import type { Iresponse } from "../interface/interfaces.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

abstract class ClientsService {
  private static queryPath = path.resolve(
    __dirname,
    "..",
    "db",
    "query",
    "getClientByCnpj.sql",
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
        `[ClientsService] Erro fatal: Não foi possível carregar a query em ${this.queryPath}`,
      );
      throw error;
    }
  }

  static async getClientByCnpj(cnpj: string): Promise<Iresponse> {
    try {
      if (!this.query) {
        throw new Error("SQL query not found");
      }
      const client = await SqlServer.query(this.query, { cnpj });
      return { success: true, data: client };
    } catch (error) {
      console.error("Error fetching client:", error);
      return { success: false, error: "Failed to fetch client" };
    }
  }
}

export default ClientsService;
