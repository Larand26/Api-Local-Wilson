import ChangeAddressService from "../services/ChangeAddressService.js";

abstract class ChangeAddressController {
  static async getUser(req: any, res: any) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        res.status(400).json({ error: "Name and password are required" });
        return;
      }
      const user = await ChangeAddressService.getUser(name, password);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the user." });
    }
  }
}

export default ChangeAddressController;
