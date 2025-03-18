import express from "express";
import { createPayment, savePayment } from "../methods/payment_method.js";
import { verifytoken } from "../methods/auth.js";

const router = express.Router();

router.post("/payment/krdo",verifytoken,createPayment)
router.post("/payment/success",verifytoken,savePayment)


export default router;
