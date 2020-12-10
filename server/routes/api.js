const express = require('express')
const urllib = require('urllib')
const router = express.Router()
let trailerApiKey = 'AIzaSyCathDaakOlRSpN_0X-Zfpq8hvQrUqOwS8'
let searchByTitleKey = '1a80b7f'
let searchByGenreKey = '21fe47c6819dd55e836404d457aa5807'
let trailerLink = 'https://www.youtube.com/watch?v='

const Person = require('../models/PersonModel')
const Post = require('../models/PostModel')

router.get('/searchByTitle/:title', function (request, response) {
    let searchKey = request.params.title
    urllib.request('http://www.omdbapi.com/?t='+searchKey+'&plot=full&apikey='+searchByTitleKey,function(err,res){
        let data = JSON.parse(res.toString())
        let actorsArr = []
        if(data.Actors === undefined){
            actorsArr = []
        }
        else{
            actorsArr = data.Actors.split(",")
        }
        response.send({title: data.Title, rating: data.imdbRating, votesNum:data.imdbVotes, genre: data.Genre, director: data.Director, actors: actorsArr, plot: data.Plot, trailer:"", poster: data.Poster, year: data.Year})
    })
})

router.get('/getTrailer/:title', function(request, response){
    let trailerSearchKey = request.params.title + 'movie trailer'
    urllib.request('https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+trailerSearchKey+'&type=video&key='+trailerApiKey, function(err,res){
            let showID = JSON.parse(res.toString()).items[0].id.videoId
            response.send(trailerLink + showID)
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
        response.send(resArr)
    })
})

router.get('/homePage', function(request, response){
    Post.find({}).sort({date: -1}).limit(10).exec((err, docs) => { 
        response.send(docs)
     })
})

router.post('/addNewUser', function(request, response){
    let params = request.body
    let newUser = new Person({userName: params.userName, password: params.password, profilePic: params.profilePic, bio: params.bio, likedShows: [], watchLater: []})
    newUser.save()
    response.send("done")
})

router.post('/sharePost', function(request, response){
    let params = request.body
    let newPost = new Post({text: params.text, likes: 0, userName: params.userName, date: new Date(), comments: [], movieTitle: params.movieTitle, moviePoster: params.moviePoster})
    newPost.save()
    response.send("done")
})

router.post('/addLikeToPost', function(request, response){
    let params = request.body
    Post.find({id: params.id}, function(err, post){
        post[0].likes++
        post[0].save()
       response.send(post[0])
    })
})

router.get('/LogIn/:userName/:password', function(request, response){
    let user =request.params.userName
    let password = request.params.password
    Person.find({userName: user}, function(err, profile){
        if(profile.length === 0){
            response.send("This user does not exist, register now")
        }
        else{
            if(profile[0].password === password){
                response.send("login successed")
            }
            else{
                response.send("wrong password")
            }
        }
    })
})

router.get('/getProfile/:userName', function(request, response){
    let user = request.params.userName
    Person.find({userName: user},function(err, profile){
        response.send(profile[0])
    })
})

router.post('/addCommentToPost', function(request, response){
    let params = request.body
    Post.findById(params.id, function(err, post){
        post[0].comments.push({userName: params.userName, text: params.text})
        post[0].save()
        response.send("done")
    })
})

router.post('/addShowToFavorite', function(request, response){
    let params = request.body
    Person.find({userName: params.userName}, function (err, person) {
        person[0].likedShows.push({movieTitle: params.title, moviePic: params.poster})
        person[0].save()
        response.send("done")
    })
})

router.post('/addToWatchLater', function(request, response){
    let params = request.body
    Person.find({userName: params.userName}, function (err, person) {
        person[0].watchLater.push({movieTitle: params.title, moviePic: params.poster})
        person[0].save()
        response.send("done")
    })
})

router.get('/getFavoriteShows/:userName', function(request, response){
    let user = request.params.userName
    Person.find({userName: user}, function(err, user){
        response.send(user[0].likedShows)
    })
})

router.get('/getWatchLaterShows/:userName', function(request, response){
    let user = request.params.userName
    Person.find({userName: user}, function(err, user){
        response.send(user[0].watchLater)
    })
})

module.exports = router