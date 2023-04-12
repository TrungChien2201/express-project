const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://chienvu:Chien22-01@cluster0.jxnedg7.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db