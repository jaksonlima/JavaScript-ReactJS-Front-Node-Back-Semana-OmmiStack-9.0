const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        const owerSocket = req.connectedUsers[booking.spot.user];

        if(owerSocket){
            req.io.to(owerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
};
