import { Router } from "express";
import type { Request, Response } from "express";

// Controlers

const routes = Router();

routes.get("/", (req: Request, res: Response) => {
  res.send("Hello from the routes!");
});

export default routes;
