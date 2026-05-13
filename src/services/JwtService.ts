import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwtConfig.js";

abstract class JwtService {
  static generateToken(payload: object): string {
    return jwt.sign(payload, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn || "1h",
    });
  }

  static verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, jwtConfig.secret) as object;
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
}

export default JwtService;
