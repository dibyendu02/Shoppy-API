const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connection succesfull!"))
    .catch((err) => console.log(err));

//allows to send json file
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute); 
app.use("/api/users", userRoute); 
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.get("/api/test", () => {
    console.log("test is succesfull");
});

app.listen(5000, () => {
    console.log("Backend server started")
});
