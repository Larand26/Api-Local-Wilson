import dotenv from "dotenv";
import type { Secret, SignOptions } from "jsonwebtoken";
dotenv.config();

const jwtConfig = {
  secret: (process.env.JWT_SECRET || "your_jwt_secret") as Secret,
  expiresIn: (process.env.JWT_EXPIRES_IN || "1h") as SignOptions["expiresIn"],
};

export default jwtConfig;
