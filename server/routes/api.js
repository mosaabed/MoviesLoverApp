const express = require('express')
const urllib = require('urllib')
const router = express.Router()
let trailerApiKey = 'AIzaSyCathDaakOlRSpN_0X-Zfpq8hvQrUqOwS8'
let searchByTitleKey = '1a80b7f'
let searchByGenreKey = '21fe47c6819dd55e836404d457aa5807'
let trailerLink = 'https://www.youtube.com/watch?v='

const Person = require('../models/PersonModel')
const Post = require('../models/PostModel')

router.get('/ShowMovieInfo/:title', function (request, response) {
    let searchKey = request.params.title
    urllib.request('http://www.omdbapi.com/?t='+searchKey+'&plot=full&apikey='+searchByTitleKey,function(err,res){
        let data = JSON.parse(res.toString())
        console.log({title: data.Title, rating: data.imdbRating, votesNum:data.imdbVotes, genre: data.Genre, director: data.Director, actors: data.Actors.split(","), plot: data.Plot, trailer: 'https://www.youtube.com/watch?v=', poster: data.Poster, year: data.Year})
    })
})

router.get('/getTrailer/:title', function(request, response){
    let trailerSearchKey = request.params.title + 'movie trailer'
    urllib.request('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+trailerSearchKey+'&type=video&key='+trailerApiKey, function(err,res){
            let showID = JSON.parse(res.toString()).items[0].id.videoId
            console.log(trailerLink + showID)
        })
})

//limited to 10 shows - 
router.get('/searchByGenre/:genreID', function(request, response){
    let genreID = request.params.genreID
    urllib.request('https://api.themoviedb.org/3/discover/movie?api_key='+searchByGenreKey+'&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=' + genreID, function(err, res){
        let data = JSON.parse(res.toString())
        data.results.splice(10,data.results.length)
        let resArr = []
        data.results.forEach(element => {
            resArr.push(element.title)
        });
        console.log(resArr)
    })
})

router.get('/homePage', function(request, response){
    Post.find({}).sort({date: -1}).limit(10).exec((err, docs) => { 
        console.log(docs)
     })
})

router.post('/addNewUser', function(request, response){
    let params = request.body
    let newUser = new Person({userName: params.userName, password: params.password, profilePic: params.pic, bio:"", likedShows: [], watchLater: []})
    newUser.save()
})

router.post('/sharePost', function(request, response){
    let params = request.body
    let newPost = new Post({id: params.id, text: params.text, likes: 0, userName: params.userName, date: new Date(), comments: [], movie: {title: params.title, poster: params.poster}})
    newPost.save()
})

router.post('/addLikeToPost', function(request, response){
    let params = request.body
    Post.find({id: params.id}, function(err, post){
        post[0].likes++
        post[0].save()
       console.log(post[0])
    })
})

router.get('/LogIn/:userName/:password', function(request, response){
    let user =request.params.userName
    let password = request.params.password
    Person.find({userName: user}, function(err, profile){
        if(profile.length === 0){
            console.log("This user does not exist, register now")
        }
        else{
            if(profile[0].password === password){
                console.log("log in successed")
            }
            else{
                console.log("wrong password")
            }
        }
    })
})

router.get('/getProfile/:userName', function(request, response){
    let user = request.params.userName
    Person.find({userName: user},function(err, profile){
        console.log(profile[0])
    })
})

router.post('/addCommentToPost', function(request, response){
    let params = request.body
    Post.find({_id: params._id}, function(err, post){
        post[0].comments.push({userName: params.userName, text: params.text})
        post[0].save()
    })
})
router.post('/addShowToFavorite', function(request, response){
    let params = request.body
    Person.find({userName: params.userName}, function (err, person) {
        person[0].likedShows.push({movieTitle: params.showTitle, moviePic: params.showPic})
        person[0].save()
        console.log(person[0])
    })
})



module.exports = router
