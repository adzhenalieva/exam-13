const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    image: [{
        type: String, required: true
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    place: {
        type: Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    }
});

const Gallery = mongoose.model('Gallery', GallerySchema);


module.exports = Gallery;