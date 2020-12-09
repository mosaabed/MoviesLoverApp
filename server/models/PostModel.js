const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    text: String,
    likes: Number,
    userName: String,
    date: Date,
    movieTitle : String,
    moviePoster: String,
    comments: [{
        userName: String,
        text: String
    }]
})

const Post = mongoose.model("PostModel", PostSchema)
module.exports = Post 
