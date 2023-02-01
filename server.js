const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

app.use(express.json());

//load env
dotenv.config({ path: "./config/config.env" });

//connect to the database
connectDB();

//Route files
const routes = require("./routes");

//Mount routers
app.use("", routes);

//Error Handling
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.PORT}`));
