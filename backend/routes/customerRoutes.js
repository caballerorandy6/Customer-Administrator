import express from "express";
const router = express.Router();

//Controllers
import {
  registerCustomer,
  getCustomers,
  authenticateCustomer,
  confirmCustomerAcount,
} from "../controllers/customerController.js";

router.get("/", getCustomers);
router.post("/", registerCustomer);
router.post("/login", authenticateCustomer);
router.get("/confirm/:token", confirmCustomerAcount);

export default router;
