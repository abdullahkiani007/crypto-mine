import Joi from "joi";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import UserDto from "../dto/user.js";
import JWTService from "../services/JWTService.js";
import RefreshToken from "../models/token.js";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;

const authController = {
  // Register
  async register(req, res, next) {
    // validate User input
    const userRegisterSchema = Joi.object({
      userName: Joi.string().min(5).max(30).required(),
      name: Joi.string().max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(passwordPattern).required(),
      confirmPassword: Joi.ref("password"),
    });

    // if error in validation return error via middleware
    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { userName, name, email, password } = req.body;

    try {
      const emailInUse = await User.exists({ email });
      const nameInUse = await User.exists({ userName });

      // if email or username is already registerd => return error

      if (emailInUse) {
        const error = {
          status: 409,
          message: "Email already Registered, use another email",
        };
        return next(error);
      }

      if (nameInUse) {
        const error = {
          status: 409,
          message: "UserName not available, use another userName",
        };
        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    // password hash

    const hashedPassword = await bcrypt.hash(password, 10);

    // store user data in db
    let accessToken;
    let refreshToken;
    let user;

    try {
      user = await User.create({
        name: name,
        userName: userName,
        email: email,
        password: hashedPassword,
      });

      // token generation
      accessToken = JWTService.signAccessToken(
        {
          _id: user._id,
        },
        "30m"
      );

      refreshToken = JWTService.signRefreshToken(
        {
          _id: user._id,
        },
        "60m"
      );
    } catch (error) {
      return next(error);
    }

    // store refresh token in db
    await JWTService.storeRefreshToken(refreshToken, user._id);

    // send cookies
    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    // creating data transfer object
    const userDto = new UserDto(user);
    // send response
    res.status(200).json({ user: userDto, auth: true });
  },

  // login
  async login(req, res, next) {
    // validate User input

    const userLoginSchema = Joi.object({
      userName: Joi.string().min(5).max(30).required(),
      password: Joi.string().pattern(passwordPattern),
    });

    const { error } = userLoginSchema.validate(req.body);
    const { userName, password } = req.body;

    // if validation error return error through middle ware
    if (error) {
      return next(error);
    }
    // match userName and password
    let user;
    try {
      // match Username
      user = await User.findOne({ userName: { $eq: userName } });

      // match Username
      if (!user) {
        const error = {
          status: 401,
          message: "Invalid User Name or Password",
        };

        return next(error);
      }

      // match password
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        const error = {
          status: 401,
          message: "Invalid Password",
        };

        return next(error);
      }
    } catch (error) {
      return next(error);
    }

    let accessToken = JWTService.signAccessToken(
      {
        _id: user._id,
      },
      "30m"
    );
    let refreshToken = JWTService.signRefreshToken(
      {
        _id: user._id,
      },
      "60m"
    );

    // update Refresh Token

    try {
      await RefreshToken.updateOne(
        { _id: user._id },
        {
          token: refreshToken,
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      return next(error);
    }

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    // return response
    res.status(200).json({
      user: userDto,
      auth: true,
    });
  },

  // Logout
  async logout(req, res, next) {
    // delete Refresh Token from db
    const { refreshToken } = req.cookies;

    try {
      await RefreshToken.deleteOne({ token: refreshToken });
    } catch (error) {
      return next(error);
    }

    // clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    // send Response
    res.status(200).json({
      user: null,
      auth: false,
    });
  },

  async refresh(req, res, next) {
    // get refresh token form cookies
    const originalRefreshToken = req.cookies.refreshToken;

    // verify refresh token
    let id;
    try {
      id = JWTService.verifyRefreshToken(originalRefreshToken)._id;
    } catch (e) {
      const error = {
        status: 401,
        message: "Unauthorized",
      };
      return next(error);
    }
    try {
      const match = RefreshToken.findOne({
        _id: id,
        token: originalRefreshToken,
      });
      if (!match) {
        const error = {
          status: 401,
          message: "Unauthorized",
        };
      }
    } catch (error) {
      return next(error);
    }
    // generate new Token update database, return response
    try {
      const accessToken = JWTService.signAccessToken({ _id: id }, "30m");
      const refreshToken = JWTService.signRefreshToken({ _id: id }, "60m");
      await RefreshToken.updateOne({ _id: id }, { token: refreshToken });
      res.cookie("accessToken", accessToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
      res.cookie("refreshToken", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });
    } catch (error) {
      return next(error);
    }

    const user = await User.findOne({ _id: id });
    const userDto = new UserDto(user);

    res.status(200).json({ user: userDto, auth: true });
  },
};

export default authController;
