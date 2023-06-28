// Auth MiddleWare
import JWTService from "../services/JWTService.js";
import userModel from "../models/user.js";
import userDto from "../dto/user.js";

const auth = async (req, res, next) => {
  try {
    // validate refresh and access token
    const { refreshToken, accessToken } = req.cookies;

    if (!refreshToken || !accessToken) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }
    let _id;
    try {
      _id = JWTService.verifyAccessToken(accessToken)._id;
    } catch (error) {
      return next(error);
    }

    let user;
    try {
      user = await userModel.findOne({ _id: _id });
    } catch (error) {
      return next(error);
    }

    const userDTO = new userDto(user);
    req.user = userDTO;

    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;
