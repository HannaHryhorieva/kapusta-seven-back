const { Unauthorized, NotFound } = require("http-errors");
const jwt = require("jsonwebtoken");

const { User } = require("../model");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    const [bearer, token] = req.headers.authorization.split(" ");
    const userFind = allUsers.find((user) => {
      return user.token === token ? user : null;
    });
    console.log("User find ------", userFind);
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    if (userFind && userFind.token !== token) {
      throw new Unauthorized("Invalid token");
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      console.log("JWT id -------", id);
      const user = await User.findById(id);
      console.log("User jwt ------", user);
      if (!user || !userFind) {
        throw new NotFound("User not found!");
      }
      if (!user.token || user.token !== token) {
        throw new Unauthorized("Invalid token");
      }
      id && user ? (req.user = user) : (req.user = userFind);

      next();
    } catch (error) {
      throw new Unauthorized("Invalid token");
    }
  } catch (error) {
    next(error);
  }
  // try {
  //   const [bearer, token] = req.headers.authorization.split(" ");
  //   if (bearer !== "Bearer") {
  //     throw new Unauthorized(`Not authorized`);
  //   }
  //   try {
  //     const { id } = jwt.verify(token, SECRET_KEY);
  //     const user = await User.findById(id);
  //     if (!user) {
  //       throw new NotFound(`User not found!`);
  //     }
  //     if (!user.token) {
  //       throw new Unauthorized();
  //     }
  //     req.user = user;
  //     next();
  //   } catch (error) {
  //     throw new Unauthorized(error.message);
  //   }
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = authenticate;
