const mongoose = require('mongoose');
const nanoid  = require('nanoid');
const config = require('./config');


const User = require('./models/User');
const Place = require('./models/Place');


const run = async () => {
    await mongoose.connect(config.dbURL, config.mongoOptions);

    const connection = mongoose.connection;

    const collections = await connection.db.collections();

    for (let collection of collections) {
        await collection.drop();
    }
    const users = await User.create(
        {username: 'admin', password: '123', token: nanoid(), displayName: 'admin', avatar: 'leo.jpeg', role: "admin"},
        {username: 'visitor', password: '123', token: nanoid(), displayName: 'Visitor', avatar: 'leo.jpeg'},
        {username: 'leo', password: '123', token: nanoid(), displayName: 'Leo', avatar: 'leo.jpeg'},
        {username: 'test', password: '123', token: nanoid(), displayName: 'Test', avatar: 'leo.jpeg'},

    );

    const places = await Place.create(
        {user: users[0], description: "Oriental cuisine, bright interior and polite staff! we work for you", mainImage: 'barashek.jpeg', title: "Barashek", feedback: [
                { comment: "nice place! delicios food!", user: users[1], rating: {food: 5, service: 5, interior: 5, average: 5}, displayName: "Visitor", datetime: new Date().toISOString()},
                { comment: "good food, but awful service!", user: users[2], rating: {food: 5, service: 2, interior: 5, average: 4}, displayName: "Leo", datetime: new Date().toISOString()}
            ]},
        {user: users[1], description: "European food, design and staff! Best chef from Italy! Ready to meet you 24/7", mainImage: 'adriano.png', title: "Adriano", feedback: [
                { comment: "delicios and fast!", user: users[2], rating: {food: 5, service: 5, interior: 5, average: 5}, displayName: "Leo", datetime: new Date().toISOString()}
            ]},
        {user: users[2], description: "Coffee and pastry! Always fresh and tasty!", mainImage: 'bublick.png', title: "Bublick", feedback: [
                { comment: "delicios and fast!", user: users[1], rating: {food: 5, service: 5, interior: 5, average: 5}, displayName: "Visitor", datetime: new Date().toISOString()}
            ]}
    );



    await connection.close();
};


run().catch(error => {
    console.log('Something went wrong', error);
});