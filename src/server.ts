import App from "./App.js";
import SqlServer from "./db/SqlServer.js";
import serverConfig from "./config/serverConfig.js";

const app = new App();
const server = app.server.listen(serverConfig.port, () => {
  console.log(`Server is running in http://localhost:${serverConfig.port}`);
});

const shutdown = (signal: string) => {
  console.log(`Received ${signal}. Closing server and database pool...`);

  server.close(() => {
    void SqlServer.close()
      .catch((error) => {
        console.error("Error closing SQL Server pool:", error);
      })
      .finally(() => {
        process.exit(0);
      });
  });
};

process.on("SIGINT", () => {
  shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  shutdown("SIGTERM");
});
