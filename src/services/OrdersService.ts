import type { Iresponse } from "../interface/interfaces.js";

abstract class OrdersService {
  static async getOrders(): Promise<Iresponse> {
    try {
      // Simulate an API call
      const orders = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            { id: 1, product: "Product 1", quantity: 2 },
            { id: 2, product: "Product 2", quantity: 1 },
          ]);
        }, 1000);
      });
      return { success: true, data: orders };
    } catch (error) {
      return { success: false, error: "Failed to fetch orders" };
    }
  }
}

export default OrdersService;
