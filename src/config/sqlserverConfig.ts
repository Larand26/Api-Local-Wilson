import dotenv from "dotenv";

dotenv.config();

const sqlserverConfig = {
  server: process.env.SQLSERVER_HOST || "localhost",
  port: process.env.SQLSERVER_PORT ? Number(process.env.SQLSERVER_PORT) : 1433,
  user: process.env.SQLSERVER_USER || "sa",
  password: process.env.SQLSERVER_PASSWORD || "yourStrong(!)Password",
  database: process.env.SQLSERVER_DATABASE || "yourDatabase",
};

export default sqlserverConfig;
