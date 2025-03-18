import Bus from "../models/busmodel.js";


export const bus_register = async (req, res) => {
    const { bus_name, bus_number, bus_type, total_seats, operator, availableDates, source, destination,arrival_time,departure_time,driver_name,driver_phone } = req.body;
    try {
        if (!bus_name || !bus_number || !bus_type || !total_seats || !operator || !availableDates || !source || !destination || !arrival_time || !departure_time || !driver_name || !driver_phone) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const bus = new Bus({
            bus_name,
            bus_number,
            bus_type,
            total_seats,
            operator,
            availableDates,
            source,
            destination,
            arrival_time,
            departure_time,
            driver_name,
            driver_phone,
            transport_type: 'bus'
        });
        await bus.save();
        res.json({ message: 'Bus registered successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


export const getallbusdetails = async (req, res) => {
    try {
        const buses = await Bus.find();
        res.json({message:"Bus Details",buses});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const getbusbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const bus = await Bus.findById(id);
        if (!bus) {
            return res.status(404).json({ message: "Bus not found" });
        }
        res.json({ message: "Bus Details", bus });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


