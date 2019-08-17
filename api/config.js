const path = require('path');

const rootPath = __dirname;

const dbURL = process.env.NODE_ENV === 'test' ? 'mongodb://localhost/places_test': 'mongodb://localhost/places';

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    dbURL,
    mongoOptions: {
        useNewUrlParser: true,
        useCreateIndex: true
    }
};

