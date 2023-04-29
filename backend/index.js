import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.js";
import customerRoutes from "./routes/customerRoutes.js";

//Server
const app = express();

//Read Json
app.use(express.json());

//.DOT
dotenv.config();

//Database Connectiion
databaseConnection();

//Routing
app.use("/api/customers", customerRoutes);

//PORT
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
