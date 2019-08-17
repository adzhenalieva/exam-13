const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const Gallery = require('../models/Gallery');

const auth = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/:id', async (req, res) => {
    Gallery.find({place: req.params.id})
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(() => res.sendStatus(500));
});


router.post('/', auth, upload.array('image', 5), async (req, res) => {
    let data = req.files.map(file =>
        file.filename);
    const gallery = await new Gallery({
        user: req.user._id,
        image: data,
        place: req.body.place
    });
    gallery.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));


});


module.exports = router;