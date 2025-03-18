import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
    train_name: {
        type: String,
        required: true
    },
    train_number: {
        type: String,
        required: true
    },
    train_type: {
        type: String,
        enum: ['Express', 'Passenger'],
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
    availableDates: {
        type: [Date],
        required: true
    },
    source: {
        type: String,
        enum: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'],
        required: true
    },
    destination: {
        type: String,
        enum: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'],
        required: true
    },
    ticket_price: {
        type: Number,
        required: true,
        default: function () {
            return this.bus_type === 'AC' ? 1500 : 1000;
        }
    },
    tranport_type: {    //dont show to frontend
        type: String,
        default: 'train'
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

const Train = mongoose.model('Train', TrainSchema);
export default Train;