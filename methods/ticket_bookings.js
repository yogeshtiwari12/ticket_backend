import Booking from "../models/booking.js";
import Bus from "../models/busmodel.js";
import Train from "../models/trainmodel.js";

export const ticket_booking = async (req, res) => {
    const { booking_transport_name, booking_transport_type,
         booking_transport_number, depart_location, arrival_location, bookingDate } = req.body;

    try {
        if ( !booking_transport_name || 
            !booking_transport_type || !booking_transport_number || !depart_location || 
            !arrival_location || !bookingDate) {
            return res.status(400).json({ message: 'All fields are required.' });
        }


        let transport;
        if (booking_transport_type === "bus") {
            transport = await Bus.findOne({ bus_number: booking_transport_number });
        } else if (booking_transport_type === "train") {
            transport = await Train.findOne({ train_number: booking_transport_number });
        } else {
            return res.status(400).json({ message: "Invalid transport type. Must be 'bus' or 'train'." });
        }
        if (!transport) {
            return res.status(404).json({ message: `${booking_transport_type} not found.` });
        }
        if (transport.total_seats <= 0) {
            return res.status(400).json({ message: "No seats available." });
        }

        transport.total_seats -= 1;
        await transport.save();
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not logged in." });
        }


        const booking = new Booking({
            userName: req?.user.user_name,
            userEmail: req?.user.user_email,
            userPhone: req?.user.user_phone,

            booking_transport_name: booking_transport_name,
            booking_transport_type: booking_transport_type,
            booking_transport_number: booking_transport_number,
            depart_location: depart_location,
            arrival_location: arrival_location,
            bookingDate: bookingDate,
        

            userId: req.user.id
        });

        await booking.save();

        const data = { 
            total_seats: transport.total_seats,
            arrival_time: transport.arrival_time,
            departure_time: transport.departure_time,
            driver_name: transport.driver_name, 
            driver_phone: transport.driver_phone

        }
        res.status(201).json({ message: 'Booking successful', booking,data});

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const user_tickets_data = async(req,res)=>{
    try {

     const ticket_data  = await Booking.find();

     const per_day_booking = await Booking.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$bookingDate" } },
                totalBookings: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } } 
    ]);

     if(!ticket_data){
        res.status(500).json({ message: "Server error", error: error.message });

     }
     const ticket_dataa = ticket_data.map(ticket=>({
         userName:ticket.userName,
         userEmail:ticket.userEmail,
         userPhone:ticket.userPhone,
         booking_transport_name: ticket.booking_transport_name,
         booking_transport_type: ticket.booking_transport_type,
         booking_transport_number: ticket.booking_transport_number,
         depart_location: ticket.depart_location,
         arrival_location: ticket.arrival_location,
         bookingDate: ticket.bookingDate,
     }))
    
        // console.log(trends)
        res.status(201).json({ticket_dataa,per_day_booking});
        
    } catch (error) {

        res.status(500).json({ message: "Server error", error: error.message });

    }

}