const moogose = require('mongoose');

const BookinSchema = new moogose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: moogose.Schema.Types.ObjectId,
        ref: 'User'
    },
    spot : {
        type: moogose.Schema.Types.ObjectId,
        ref: 'Spot'
    }
});

module.exports = moogose.model('Booking', BookinSchema);