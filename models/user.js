import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true,
        unique: true
    },
    user_phone:{
        type:String,
        required:true,
        unique:true
    },
    user_password: {
        type: String,
        required: true
    },
    user_role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
    
})

const User = mongoose.model('User', userSchema);
export default User;
