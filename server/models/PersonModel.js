const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    userName: String,
    password: String,
    profilePic: String,
    bio: String,
    likedShows: [{
        movieTitle: String,
        moviePic: String
    }],
    watchLater: [{
        movieTitle: String,
        moviePic: String
    }]
})

const Person = mongoose.model("PersonModel", PersonSchema)
module.exports = Person