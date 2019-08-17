const express = require('express');
const User = require('../models/User');
const config = require('../config');
const multer = require('multer');
const path = require('path');
const nanoid = require('nanoid');

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

router.post('/', upload.single('avatar'), async (req, res) => {
    let avatar;
    if(req.file){
        avatar = req.file.filename
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        displayName: req.body.displayName,
        avatar: avatar
    });

    user.generateToken();

    try {
        await user.save();
        return res.send({message: "success", user})
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username/password incorrect'})
    }

    const isMatch = user.checkPassword(req.body.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username/password incorrect'})
    }

    user.generateToken();

    await user.save();

    res.send({message: "Login success", user})
});


router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) {
        return res.send(success);
    }
    const user = await User.findOne({token});

    if (!user) {
        return res.send(success);
    }

    user.generateToken();
    user.save();

    return res.send(success);
});

module.exports = router;