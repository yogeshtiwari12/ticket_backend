import express from 'express';
import { gettrainbyid, gettrainsdata, register_train } from '../methods/train.js';
import { verifytoken } from '../methods/auth.js';
const route = express.Router();

route.put("/register_train",verifytoken,register_train)
route.post("/get_trainsdata",verifytoken,gettrainsdata)
route.get("/get_trainbyid/:id",verifytoken,gettrainbyid)


export default route;



