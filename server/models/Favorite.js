const mongoose = require('mongoose');
const Schema = mongoose.Schema


const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type:String, 
    },
    movieTitle: {
        type: String,
    },
    movieImage: {
        type:String,
    },
    movieRunTime : {
        type: String
    }
})




const Favorite = mongoose.model('Favourite', favoriteSchema);

module.exports = { Favorite }