import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({   
    bus_name: {
        type: String,
        required: true
    },
    bus_number: {
        type: String,
        required: true
    },
    bus_type: {
        type: String,
        enum: ['AC', 'Non-AC'],
        required: true
    },
    total_seats: {
        type: Number,
        required: true
    },
    operator: {
        type: String,
        required: true
    },
    driver_name:{
        type:String,
        required:true
    },
    driver_phone:{
        type:String,
        required:true
    },
    availableDates: {  //booking wale me jo booking dates hai usme ye wali date save hogi 
        type: [Date],
        required: true
    },
    source:{      // booking wale me arrival location 
        type: String,
        enum: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'],
        required: true
    },
    destination: {    //booking wale me depart location 
        type: String,
        enum: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'],
        required: true
    },
    transport_type: {    // dont show to frontend
        type: String,
        default: 'bus',

    },
    ticket_price: {
        type: Number,
        required: true,
        default: function () {
            return this.bus_type === 'AC' ? 1500 : 1000;
        }
    },
    arrival_time: {
        type: String,
        required: true
    },
    departure_time: {
        type: String,
        required: true
    }
});

const Bus = mongoose.model('Bus', BusSchema);
export default Bus;