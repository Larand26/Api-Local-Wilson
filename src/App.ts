import express from "express";
import routes from "./routes/index.js";

class App {
  server: express.Express;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.server.use(routes);
  }

  middlewares() {
    this.server.use(express.json({ limit: "1mb" }));
    this.server.use(express.urlencoded({ limit: "1mb", extended: true }));

    this.server.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        if (err?.type === "entity.too.large") {
          return res
            .status(413)
            .json({ success: false, error: "Payload too large" });
        }

        return next(err);
      },
    );
  }
}

export default App;
