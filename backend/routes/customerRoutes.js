import express from "express";
const router = express.Router();

//Controllers
import {
  registerCustomer,
  getCustomers,
  authenticateCustomer,
  confirmCustomerAcount,
  forgotPassword,
  checkToken,
  newPassword,
  profile,
} from "../controllers/customerController.js";

import checkAuth from "../middleware/checkAuth.js";

router.get("/", getCustomers);
router.post("/", registerCustomer);
router.post("/login", authenticateCustomer);
router.get("/confirm/:token", confirmCustomerAcount);
router.post("/forgot-password", forgotPassword);

router.route("/forgot-password/:token").get(checkToken).post(newPassword);

router.get("/profile", checkAuth, profile);

export default router;
