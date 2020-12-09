const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    id: Number,
    text: String,
    likes: Number,
    userName: String,
    date: Date,
    comments: [{
        userName: String,
        text: String
    }],
    movie:{
        title: String,
        poster: String
    }
})

const Post = mongoose.model("PostModel", PostSchema)
module.exports = Post 