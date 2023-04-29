import { Error } from "mongoose";
import Customer from "../models/Customer.js";

//Create Customer
const registerCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    const existCustomer = await Customer.findOne({ email });

    if (existCustomer) {
      const error = new Error("User already registered");
      return res.status(400).json({ msg: error.message });
    }

    const customer = new Customer(req.body);
    const customerSaved = await customer.save();
    res.json(customerSaved);
  } catch (error) {
    console.log(error);
  }
};

//Get Customers
const getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

export { registerCustomer, getCustomers };
