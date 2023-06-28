import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import RefreshToken from "../models/token.js";
dotenv.config();

class JWTService {
  // sign access token
  static signAccessToken(payload, expiryTime) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: expiryTime,
    });
  }
  // sign refresh token
  static signRefreshToken(payload, expiryTime) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: expiryTime,
    });
  }
  // verify accesss token

  static verifyAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
  }
  // verify refresh token
  static verifyRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_KEY);
  }
  // store refresh token
  static async storeRefreshToken(token, userId) {
    try {
      RefreshToken.create({
        token: token,
        userId: userId,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default JWTService;
