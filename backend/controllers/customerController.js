import { Error } from "mongoose";
import Customer from "../models/Customer.js";
import generateId from "../helpers/generateId.js";
import generateJWT from "../helpers/generateJWT.js";

//Create Customer
const registerCustomer = async (req, res) => {
  try {
    const { email } = req.body;
    const existCustomer = await Customer.findOne({ email });

    if (existCustomer) {
      const error = new Error("User already registered!");
      return res.status(400).json({ msg: error.message });
    }

    const customer = new Customer(req.body);
    customer.token = generateId();
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

//Authenticate Customer
const authenticateCustomer = async (req, res) => {
  const { email, password } = req.body;

  //Check if user exists
  const customer = await Customer.findOne({ email });

  if (!customer) {
    const error = new Error("User already authenticated!");
    return res.status(404).json({ msg: error.message });
  }

  //Check if the user is confirmed
  if (!customer.confirmed) {
    const error = new Error("Your account has not been confirmed!");
    return res.status(403).json({ msg: error.message });
  }

  //Check Password
  if (await customer.checkPassword(password)) {
    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: generateJWT(usuario._id),
    });
  } else {
    const error = new Error("Password incorrect!");
    return res.status(403).json({ msg: error.message });
  }
};

//Confirm Customer Account
const confirmCustomerAcount = async (req, res) => {
  const { token } = req.params;

  const confirmedCustomer = await Customer.findOne({ token });
  if (!confirmedCustomer) {
    const error = new Error("Invalid token!");
    return res.status(403).json({ msg: error.message });
  }
  try {
    confirmedCustomer.confirmed = true;
    confirmedCustomer.token = "";
    await confirmedCustomer.save();
    res.json({ msg: "User successfully confirmed!" });
    console.log(confirmedCustomer);
  } catch (error) {
    console.log(error);
  }
};

export {
  registerCustomer,
  getCustomers,
  authenticateCustomer,
  confirmCustomerAcount,
};
