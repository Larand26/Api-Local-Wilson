import sql from "mssql";
import sqlserverConfig from "../config/sqlserverConfig.js";

class SqlServer {
  private pool: any;

  constructor() {}

  async connect() {
    try {
      this.pool = await sql.connect(sqlserverConfig);
      console.log("Connected to SQL Server");
    } catch (error) {
      console.error("Error connecting to SQL Server:", error);
    }
  }

  async query(queryString: string, params?: any) {
    try {
      if (!this.pool) {
        await this.connect();
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
