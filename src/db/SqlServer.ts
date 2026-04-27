import sql from "mssql";
import sqlserverConfig from "../config/sqlserverConfig.js";

class SqlServer {
  private pool: sql.ConnectionPool | null;
  private connecting: Promise<sql.ConnectionPool> | null;

  constructor() {
    this.pool = null;
    this.connecting = null;
  }

  private async connect() {
    try {
      if (this.pool?.connected) {
        return this.pool;
      }

      if (this.connecting) {
        return this.connecting;
      }

      this.connecting = new sql.ConnectionPool(sqlserverConfig)
        .connect()
        .then((pool) => {
          this.pool = pool;
          return pool;
        })
        .catch((error) => {
          this.pool = null;
          throw error;
        })
        .finally(() => {
          this.connecting = null;
        });

      return this.connecting;
    } catch (error) {
      console.error("Error connecting to SQL Server:", error);
      this.pool = null;
      throw error;
    }
  }

  async close() {
    if (!this.pool) {
      return;
    }

    await this.pool.close();
    this.pool = null;
  }

  async query(
    queryString: string,
    params?: Array<string | number | boolean>,
  ): Promise<any> {
    try {
      const pool = await this.connect();
      const request = pool.request();
      if (params) {
        for (const key in params) {
          request.input(key, params[key]);
        }
      }
      const result = await request.query(queryString);
      return result.recordset;
    } catch (error) {
      console.error("Error executing query:", error);
      throw error;
    }
  }
}

export default new SqlServer();
