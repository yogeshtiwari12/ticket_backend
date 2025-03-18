import Train from "../models/trainmodel.js";

export const register_train = async (req, res) => {
    const { train_name, train_number, train_type, total_seats, operator, availableDates, source, destination, ticket_price,arrival_time,departure_time } = req.body;
    try {
        if (!train_name || !train_number || !train_type || !total_seats || !operator || !availableDates || !source || !destination || !ticket_price || !arrival_time || !departure_time) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        const train = new Train({
            train_name,
            train_number,
            train_type,
            total_seats,
            operator,
            availableDates,
            source,
            destination,
            ticket_price,
            arrival_time,
            departure_time,
            transport_type: 'train'

        });
        await train.save();
        res.json({ message: 'Train registered successfully' });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const gettrainsdata = async (req, res) => {
    try {
        const trains = await Train.find();
        res.json({ message: "Train Details", trains });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const gettrainbyid = async (req, res) => {
    const id = req.params.id;
    try {
        const train = await Train.findById(id);
        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }
        res.json({ message: "Train Details", train });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}