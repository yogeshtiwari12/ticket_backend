import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userroutes from "./routes/user_routes.js";
import bus_routes from "./routes/bus_routes.js";
import train_routes from "./routes/train_routes.js";
import booking_routes from "./routes/booking_routes.js";
import payment_routes from "./routes/payment_routes.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
mongoose.connect(process.env.MOGO_URI)
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => console.log("MongoDB Connection Error ", err));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));


app.use("/api",userroutes );
app.use("/bus",bus_routes)
app.use("/train",train_routes)
app.use("/booking",booking_routes)
app.use("/payment",payment_routes)


app.listen(4000, () => {
    console.log("Server is running on port 4000");
})