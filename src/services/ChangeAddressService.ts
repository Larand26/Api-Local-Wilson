import type { Iresponse } from "../interface/interfaces.js";

abstract class ChangeAddressService {
  static async getUser(name: string, password: string): Promise<Iresponse> {
    try {
      // Simulate fetching user data based on name and password
      const user = { name, password }; // Replace with actual user fetching logic
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: "Failed to fetch user" };
    }
  }
}

export default ChangeAddressService;
