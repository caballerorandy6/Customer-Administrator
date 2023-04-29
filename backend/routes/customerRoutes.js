import express from "express";
const router = express.Router();

//Controllers
import {
  registerCustomer,
  getCustomers,
} from "../controllers/customerController.js";

router.route("/").get(getCustomers).post(registerCustomer);

export default router;
