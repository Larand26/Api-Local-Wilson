import type { Iresponse } from "../interface/interfaces.js";
import MySql from "../db/MySql.js";

abstract class ChangeAddressService {
  static async login(name: string, password: string): Promise<Iresponse> {
    try {
      const query = "SELECT * FROM USUARIOS WHERE NOME = ? AND SENHA = ?";
      const [result] = await MySql.query(query, [name, password]);

      return { success: true, data: result[0] };
    } catch (error) {
      console.error("Error fetching user:", error);
      return { success: false, error: "Failed to fetch user" };
    }
  }
}

export default ChangeAddressService;
