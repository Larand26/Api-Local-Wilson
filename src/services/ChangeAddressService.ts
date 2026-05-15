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
  private static queryUpdateAddressPath = path.resolve(
    __dirname,
    "..",
    "db",
    "query",
    "changeAddress.sql",
  );

  private static extractProductIds(products: any[]): Array<string | number> {
    return products
      .map((product) => {
        if (typeof product === "string" || typeof product === "number") {
          return product;
        }

        return (
          product?.ID_CODPRODUTO ??
          product?.id ??
          product?.ID ??
          product?.id_product ??
          product?.productId ??
          null
        );
      })
      .filter((productId): productId is string | number => productId !== null);
  }

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

  static async updateAddress(
    products: { id: number }[],
    shelf: string,
    street: string,
    token: string,
  ): Promise<Iresponse> {
    try {
      const user = JwtService.verifyToken(token);
      if (!user) {
        return { success: false, error: "Invalid token" };
      }

      const productIds = this.extractProductIds(products);
      if (productIds.length === 0) {
        return { success: false, error: "No valid products were provided" };
      }

      // Altera o endereço
      const query = await fs.readFile(this.queryUpdateAddressPath, "utf8");
      for (const productId of productIds) {
        await SqlServer.query(query, {
          id_product: productId,
          fileira: shelf,
          rua: street,
        });
      }

      // Salva o histórico da mudança de endereço
      return { success: true };
    } catch (error) {
      console.error("Error verifying token:", error);
      return { success: false, error: "Failed to verify token" };
    }
  }
}

export default ChangeAddressService;
