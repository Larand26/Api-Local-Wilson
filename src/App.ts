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
    // Aumentando o limite para 50 megabytes
    this.server.use(express.json({ limit: "50mb" }));

    // Se você estiver recebendo dados via urlencoded, adicione o limite lá também
    this.server.use(express.urlencoded({ limit: "50mb", extended: true }));
  }
}

export default App;
