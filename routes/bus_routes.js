import express from 'express';
import { bus_register, getallbusdetails, getbusbyid } from '../methods/bus.js';
import { verifytoken } from '../methods/auth.js';
const route = express.Router();

route.put("/registerbus",verifytoken,bus_register)
route.get("/getallbusdetails",verifytoken,getallbusdetails)
route.get("/getbusbyid/:id",verifytoken,getbusbyid)

export default route;