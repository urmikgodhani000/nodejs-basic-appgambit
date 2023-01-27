const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const logger = require("./middleware/logger");
const app = express();

//connect to the database
const connectDB = require("./config/db");
connectDB();

//Route files
const bootcamps = require("./routes/bootcamps");

//middleware
app.use(logger);

//Mount routers
app.use("/bootcamps", bootcamps);

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running in ${process.env.PORT}`));
