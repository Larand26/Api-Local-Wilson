import App from "./App.js";
import serverConfig from "./config/serverConfig.js";

const app = new App();
app.server.listen(serverConfig.port, () => {
  console.log(`Server is running in http://localhost:${serverConfig.port}`);
});
