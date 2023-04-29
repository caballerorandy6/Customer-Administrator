import express from "express";
const router = express.Router();

//Controllers
import {
  registerCustomer,
  getCustomers,
} from "../controllers/customerController.js";

router.route("/").post(registerCustomer);

export default router;
