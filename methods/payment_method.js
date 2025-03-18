import { Cashfree } from "cashfree-pg";
import Payment from "../models/payment.js";

// const cashfreeApiKey = "YOUR_API_KEY_HERE"; // Replace with a placeholder

Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export async function createPayment(req, res) {

  try {
    const { order_amount } = req.body;

     //req.body me bas order_amount dena hai baaking jo login user hoga 
    // ussi ki ticket book hogi to details req.user se mil jaygi

    if (!order_amount) {
      return res.status(400).json({ error: "Missing required payment details." });
    }

   
if(!req.user){
    return res.status(401).json({ error: "Unauthorized: User not found ." });    
}
console.log(req.user)
 
    const request = {
      order_amount,
      order_currency: "INR",
      customer_details: {
        customer_id :req.user._id,
        customer_name: req.user.user_name,
        customer_email: req.user.user_email,
        customer_phone: req.user.user_phone,
      },
      order_note: "Payment for booking",
    };


    const response = await Cashfree.PGCreateOrder("2023-08-01", request);

    const paymentSessionId = response?.data?.payment_session_id;

    if (paymentSessionId) {
      return res.status(200).json({ payment_session_id: paymentSessionId,res:response.data });
    } else {
      console.error("Error: Payment session ID not found in the response:", response?.data);
      return res.status(500).json({ error: "Payment session ID not found." });
    }

  } catch (error) {
    console.error("Error creating payment order:", error.response?.data || error.message);
    return res.status(500).json({ error: "Error creating payment order." });
  }
}





export async function savePayment(req, res) {
    try {
        const {
            order_id,
            cf_order_id,
            created_at,
            order_expiry_time,
            order_amount,
            order_currency,
        } = req.body;

        if (
            !order_id ||
            !cf_order_id ||
            !created_at ||
            !order_expiry_time ||
            !order_amount ||
            !order_currency ||
            !req.user?.user_.id ||
            !req.user?.user_name ||
            !req.user?.user_email ||
            !req.user?.user_phone
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const customer_details = {
            customer_id: req.user._id,
            customer_name: req.user.user_name,
            customer_email: req.user.user_email,
            customer_phone: req.user.user_phone,
        };

        const existingPayment = await Payment.findOne({ order_id });
        if (existingPayment) {
            return res.status(409).json({ error: "Payment already exists" });
        }

        const newPayment = new Payment({
            order_id,
            cf_order_id,
            created_at,
            order_expiry_time,
            order_amount,
            order_currency,
            customer_details,
        });

        await newPayment.save();
      
        return res.status(201).json({ message: "Payment saved successfully", payment: newPayment });
    } catch (error) {
        console.error("Error saving payment:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
