import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Iresponse } from "../interface/interfaces.js";
import JwtService from "./JwtService.js";
import MySql from "../db/MySql.js";
import SqlServer from "../db/SqlServer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

abstract class ChangeAddressService {
  private static queryPath = path.resolve(
    __dirname,
    "..",
    "db",
    "query",
    "getProductChangeApp.sql",
  );
  static async login(name: string, password: string): Promise<Iresponse> {
    try {
      const query = "SELECT * FROM USUARIOS WHERE NOME = ? AND SENHA = ?";
      const result = await MySql.query(query, [name, password]);

      if (result.length === 0) {
        return { success: false, error: "Invalid credentials" };
      }

      const token = JwtService.generateToken({
        id: result[0].ID,
        name: result[0].NOME,
        ID_FUNCAO: result[0].ID_FUNCAO,
      });

      return {
        success: true,
        data: { token: token, username: result[0].NOME },
      };
    } catch (error) {
      console.error("Error fetching user:", error);
      return { success: false, error: "Failed to fetch user" };
    }
  }

  static async getProductByBarcode(barcode: string): Promise<Iresponse> {
    try {
      const query = await fs.readFile(this.queryPath, "utf8");
      const result = await SqlServer.query(query, { barcode });
      if (result.length === 0) {
        return { success: false, error: "Product not found" };
      }
      return { success: true, data: result[0] };
    } catch (error) {
      console.error("Error fetching product:", error);
      return { success: false, error: "Failed to fetch product" };
    }
  }
}

export default ChangeAddressService;
