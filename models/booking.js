import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

    //                  ye detail UserName se lekr userId tak auth user se aaygi jo current user hoga req.body se nhi lena hai
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
                 // ye saari details ek get req laga ke recive krna hai jo bus ya train k liye select kiya hai us model se 
    booking_transport_name: {
        type: String,
        required: true
    },
    booking_transport_type: {
        type: String,
        required: true
    },
    booking_transport_number: {
        type: String,
        required: true
    },

    depart_location: {
        type: String,
        required: true
    },

    arrival_location: {
        type: String,
        required: true
    },

    bookingDate: {
        type: Date,
        required: true
    },
    
    
},{  timeStamps: true}
)

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;