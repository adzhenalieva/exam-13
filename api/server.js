const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const users = require('./app/users');
const places = require('./app/places');
const galleries = require('./app/galleries');


const app = express();

const port = process.env.NODE_ENV === 'test' ? 8010 : 8000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());




mongoose.connect(config.dbURL, config.mongoOptions).then(() => {
    app.use('/users', users);
    app.use('/places', places);
    app.use('/galleries', galleries);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    })

});