import mysql from "mysql2/promise";
import mysqlConfig from "../config/mysqlConfig.js";

class MySql {
  private pool: mysql.Pool;
  constructor() {
    this.pool = mysql.createPool(mysqlConfig);
  }

  async query(sql: string, params?: any[]): Promise<any> {
    const [rows] = await this.pool.query(sql, params);
    return rows;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export default new MySql();
