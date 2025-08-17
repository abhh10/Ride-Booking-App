const mongoose = require('mongoose');

function connectToDb(){
    const dbUri = process.env.DB_CONNECT || 'mongodb://localhost:27017/mydatabase';
    
    mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => {
            console.error('Error connecting to MongoDB:', err);
        });
}

module.exports = connectToDb;