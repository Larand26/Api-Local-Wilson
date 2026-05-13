import type { Iresponse } from "../interface/interfaces.js";
import JwtService from "./JwtService.js";
import MySql from "../db/MySql.js";

abstract class ChangeAddressService {
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

      return { success: true, data: token };
    } catch (error) {
      console.error("Error fetching user:", error);
      return { success: false, error: "Failed to fetch user" };
    }
  }
}

export default ChangeAddressService;
