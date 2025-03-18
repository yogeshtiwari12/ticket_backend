import express from 'express';
import { deleteuser, getallusers, getmyprofile, login, logout, signup, stats, updateuser } from '../methods/user.js';
import { isadmin, verifytoken } from '../methods/auth.js';
const route = express.Router();


route.put("/signup", signup);
route.post("/login", login);
route.get("/logout",verifytoken, logout);
route.get("/myprofile",verifytoken,getmyprofile)
route.get("/allusers",verifytoken,isadmin("admin"),getallusers)  //admin page
route.get("/stats",verifytoken,isadmin("admin"),stats)  //admin page 
route.post("/deleteuser",verifytoken,isadmin("admin"),deleteuser)
route.post("/updateuser",verifytoken,isadmin("admin"),updateuser)

export default route;
