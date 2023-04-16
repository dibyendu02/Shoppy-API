const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection succesfull!"))
    .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute); 
app.use("/api/user", userRoute); 

app.listen(5000, () => {
    console.log("Backend server started")
});
