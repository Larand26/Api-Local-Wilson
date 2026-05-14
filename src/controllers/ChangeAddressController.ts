import ChangeAddressService from "../services/ChangeAddressService.js";

abstract class ChangeAddressController {
  static async login(req: any, res: any) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        res.status(400).json({ error: "Name and password are required" });
        return;
      }
      const user = await ChangeAddressService.login(name, password);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the user." });
    }
  }

  static async getProductByBarcode(req: any, res: any) {
    try {
      const { barcode } = req.params;
      if (!barcode) {
        res.status(400).json({ error: "Barcode is required" });
        return;
      }
      const product = await ChangeAddressService.getProductByBarcode(barcode);
      if (!product.success) {
        res.status(404).json({ error: product.error || "Product not found" });
        return;
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the product." });
    }
  }

  static async updateAddress(req: any, res: any) {
    try {
      const { products, shelf, street, token } = req.body;
      if (!products || !shelf || !street || !token) {
        res
          .status(400)
          .json({ error: "Products, shelf, street, and token are required" });
        return;
      }

      const result = await ChangeAddressService.updateAddress(
        products,
        shelf,
        street,
        token,
      );

      if (result.success) {
        res.json({ message: "Address updated successfully" });
      } else {
        res.status(400).json({ error: result.error });
      }
    } catch (error) {
      console.error("Error updating address:", error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the address." });
    }
  }
}

export default ChangeAddressController;
