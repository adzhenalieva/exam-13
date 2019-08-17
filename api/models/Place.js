const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    rating: {food: Number, service: Number, interior: Number, average: Number},
    comment: {
        type: String, required: true
    },
    datetime: {
        type: String, required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    displayName: {
        type: String, required: true
    }
});

const PlaceSchema = new Schema({
    title: {
        type: String, required: true
    },
    mainImage: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    feedback: [
        FeedbackSchema
    ]
});

const Place = mongoose.model('Place', PlaceSchema);


module.exports = Place;