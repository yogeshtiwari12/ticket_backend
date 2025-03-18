import express from 'express';
import { ticket_booking, user_tickets_data } from '../methods/ticket_bookings.js';
import { isadmin, verifytoken } from '../methods/auth.js';
const route = express.Router();


route.post("/bookticket",verifytoken,ticket_booking)
route.get("/ticketdata",user_tickets_data)



export default route;
