import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";

const checkAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.customer = await Customer.findById(decoded.id).select(
        "-password -confirmed -token -createdAt -updatedAt -__v"
      );

      return next();
    } catch (error) {
      return res.status(404).json({ msg: "An error has occurred!" });
    }
  }

  if (!token) {
    const error = new Error("Invalid Token");
    res.status(401).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
