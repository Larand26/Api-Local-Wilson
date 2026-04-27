import sql from "mssql";
import sqlserverConfig from "../config/sqlserverConfig.js";

class SqlServer {
  private pool: sql.ConnectionPool | null;

  constructor() {
    this.pool = null;
  }

  private async connect() {
    try {
      this.pool = await new sql.ConnectionPool(sqlserverConfig).connect();
      console.log("Connected to SQL Server");
      return this.pool;
    } catch (error) {
      console.error("Error connecting to SQL Server:", error);
      this.pool = null;
      throw error;
    }
  }

  async query(
    queryString: string,
    params?: Array<string | number | boolean>,
  ): Promise<any> {
    try {
      if (!this.pool) {
        await this.connect();
      }

      if (!this.pool) {
        throw new Error("SQL Server connection pool is not initialized");
      }

      const request = this.pool.request();
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
