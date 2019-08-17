const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const Place = require('../models/Place');
const User = require('../models/User');

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');


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


router.get('/', async (req, res) => {
    Place.find()
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(error => res.status(500).send(error));

});


router.get('/:id', async (req, res) => {
    Place.findById(req.params.id)
        .then(result => {
            if (result) {
                result.feedback.sort((a, b) => {
                    return new Date(b.datetime) - new Date(a.datetime)
                });
                return res.send(result);
            } else {
                res.sendStatus(404)
            }
        })
        .catch(() => res.sendStatus(500));
});


router.post('/', auth, upload.single('mainImage'), async (req, res) => {
    let mainImage;
    if (req.file) {
        mainImage = req.file.filename
    } else {
        mainImage = null;
    }
    const place = await new Place({
        user: req.user._id,
        mainImage,
        description: req.body.description,
        title: req.body.title
    });
    if (req.body.agreement) {
        place.save()
            .then(result => res.send(result))
            .catch(error => res.status(400).send(error));
    } else {
        res.status(400).send(error)
    }

});

router.put('/:id', auth, async (req, res) => {
    let place = await Place.findById(req.params.id);
    let index = place.feedback.findIndex(feedback => {
        return feedback.user.equals(req.user._id)
    });
    let author = place.user.equals(req.user._id);
    if (place && index === -1 && !author) {
        place.feedback.push({
            comment: req.body.comment,
            rating: {
                food: req.body.food,
                service: req.body.service,
                interior: req.body.interior,
                average: req.body.average
            },
            user: req.user._id,
            displayName: req.user.displayName,
            datetime: new Date().toISOString()
        });
        await place.save()
            .then(result => res.send({result, message: "Place estimated"}))
            .catch(error => res.status(400).send(error))
    } else {
        res.status(400).send("You can leave your feedback only once");
    }

});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    Place.findByIdAndDelete(req.params.id)
        .then(result => res.send({message: "Place deleted"}))
        .catch(error => res.status(400).send(error));

});

router.delete('/feedback/:id', [auth, permit('admin')], async (req, res) => {
    try {
        let place = await Place.findById(req.params.id);
        await place.feedback.id(req.query.id).remove();
        await place.save()
            .then(result => res.send({result, message: "Feedback deleted"}))
            .catch(error => res.status(400).send(error))
    } catch (e) {
        res.status(400).send(e)
    }
});


module.exports = router;