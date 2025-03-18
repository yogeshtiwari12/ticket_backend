import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import Booking from "../models/booking.js";
const jwtkey = "abcdefghijklmnopqrstuvwxyz12345"


export const signup = async (req, res) => {
    const { user_name, user_email, user_phone, user_password, user_role } = req.body;
    try {
        const user = await User.findOne({ user_email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(user_password, 10);

        const newUser = new User({
            user_name: user_name,
            user_email: user_email,
            user_password: hashedPassword,
            user_phone: user_phone,
            user_role: user_role
        })
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const login = async (req, res) => {
    const { user_email, user_password } = req.body;

    try {
        if (!user_email || !user_password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }
        const user = await User.findOne({ user_email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const ismatch = await bcrypt.compare(user_password, user.user_password)

        if (user.user_role !== "user" && user.user_role !== "admin") {
            return res.status(403).json({ message: `User with role ${user.user_role} is not found` });
        }

        if (!ismatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        jwt.sign({ id: user.id }, jwtkey, { expiresIn: "1d" }, (error, token) => {
            if (error) {
                return res.json({ message: "Token error", error: error.message });
            }

            res.cookie('token', token, {
                secure: true,
                httpOnly: true,
                sameSite: 'None',
            });
            res.json({message: 'Logged in successfully'})
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getmyprofile = async(req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const bookings  = await Booking.find({userId: user.id});
        
        res.json({ message: "User profile fetched successfully", user, bookings });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getallusers = async (req, res) => {
    try {
        const allusers = await User.find();
        if (!allusers) {
            return res.status(404).json({ message: "No users found" });
        }
        res.json({ message: "All users fetched successfully", users: allusers });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Token not found" });
        }

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/'
        });

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Server error during logout" });
    }
};

export const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const updateuser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id,req.body,{ new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const stats = async(req,res)=>{
    try {
        // booking 
        const total_bookings = await Booking.find().countDocuments()
        // users
        const total_users = await User.find().countDocuments();
        const users = await User.find({user_role:"user"}).countDocuments();
        const admin = await User.find({user_role:"admin"}).countDocuments();

         if(total_users){
          res.status(200).json({
        total_users:total_users,
        users:users,
        admin:admin,
        total_bookings:total_bookings
    });
         }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

