import type { Request, Response } from "express";

import ClientsService from "../services/ClientsService.js";

abstract class ClientsController {
  static async getClientByCnpj(req: Request, res: Response) {
    const { cnpj } = req.params;
    if (!cnpj) {
      res.status(400).json({ error: "CNPJ is required" });
      return;
    }

    try {
      const response = await ClientsService.getClientByCnpj(String(cnpj));
      if (response.success) {
        res.status(200).json(response.data);
      } else {
        res.status(404).json({ error: response.error });
      }
    } catch (error) {
      console.error("Error in ClientsController:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default ClientsController;
