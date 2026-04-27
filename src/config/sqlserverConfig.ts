import dotenv from "dotenv";

dotenv.config();

const toBoolean = (value: string | undefined, defaultValue: boolean) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
};

const sqlserverConfig = {
  server: process.env.SQLSERVER_HOST || "localhost",
  port: process.env.SQLSERVER_PORT ? Number(process.env.SQLSERVER_PORT) : 1433,
  user: process.env.SQLSERVER_USER || "sa",
  password: process.env.SQLSERVER_PASSWORD || "yourStrong(!)Password",
  database: process.env.SQLSERVER_DATABASE || "yourDatabase",
  options: {
    encrypt: toBoolean(process.env.SQLSERVER_ENCRYPT, true),
    trustServerCertificate: toBoolean(
      process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE,
      true,
    ),
  },
};

export default sqlserverConfig;
