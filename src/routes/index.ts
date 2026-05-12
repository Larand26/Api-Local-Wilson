import { Router } from "express";
import type { Request, Response } from "express";

// Controlers
import OrdersController from "../controllers/OrdersController.js";
import ClientsController from "../controllers/ClientsController.js";
import ChangeAddressController from "../controllers/ChangeAddressController.js";

// Middlewares
import authToken from "../middlewares/authToken.js";

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Hello from the routes!");
});

routes.get(
  "/api/get-orders",
  authToken,
  async (req: Request, res: Response) => {
    await OrdersController.getOrders(req, res);
  },
);

routes.get(
  "/api/get-client/:cnpj",
  authToken,
  async (req: Request, res: Response) => {
    await ClientsController.getClientByCnpj(req, res);
  },
);

routes.get(
  "/api/change-address-app/get-user",
  authToken,
  async (req: Request, res: Response) => {
    await ChangeAddressController.getUser(req, res);
  },
);

export default routes;
