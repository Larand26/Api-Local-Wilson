import dotenv from "dotenv";

dotenv.config();

const toBoolean = (value: string | undefined, defaultValue: boolean) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value.toLowerCase() === "true";
};

const sqlserverConfig = {
  server: process.env.SQLSERVER_HOST || "",
  port: process.env.SQLSERVER_PORT ? Number(process.env.SQLSERVER_PORT) : 0,
  user: process.env.SQLSERVER_USER || "",
  password: process.env.SQLSERVER_PASSWORD || "",
  database: process.env.SQLSERVER_DATABASE || "",
  options: {
    encrypt: toBoolean(process.env.SQLSERVER_ENCRYPT, true),
    trustServerCertificate: toBoolean(
      process.env.SQLSERVER_TRUST_SERVER_CERTIFICATE,
      true,
    ),
  },
};

export default sqlserverConfig;
