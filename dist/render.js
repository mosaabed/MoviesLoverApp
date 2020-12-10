const signUpRender = function(){
    $("#mainDiv").empty()
    const source = $("#signup-template").html()
    const template = Handlebars.compile(source) 
    const newHtml = template()
    $("#mainDiv").append(newHtml)
}

const homeRender = function(homePosts){
    $('#mainDiv').empty()
    const source = $("#navbar-template").html()
    const template = Handlebars.compile(source) 
    const newHtml = template()
    $("#mainDiv").append(newHtml)
    $('#containerDiv').append("<h1>what's new about movies?</h1>")
    const source1 = $('#post-template').html()
    const template1 = Handlebars.compile(source1)
    for(let i=0;i<homePosts.length;i++){
      const newHTML = template1({userName: homePosts[i].userName, movieTitle: homePosts[i].movieTitle, text: homePosts[i].text, moviePoster: homePosts[i].moviePoster,comments: homePosts[i].comments})
       $('#containerDiv').append(newHTML)
    }
}

const profileRender = function(profile){
    $('#mySavedMovies').empty()
    $('#containerDiv').empty()
    const source = $("#profilePage-template").html()
    const template = Handlebars.compile(source) 
    const newHtml = template({userName: profile.userName, bio: profile.bio})
    $('#containerDiv').append(newHtml)
}

const searchPage = function(){
    $('#mySavedMovies').empty()
    $('#containerDiv').empty()
    const source = $("#search-template").html()
    const template = Handlebars.compile(source) 
    const newHtml = template()
    $('#containerDiv').append(newHtml)
}

const moviesRender = function(movies){
    $('.movies-container').empty()
    let len = movies.length
    const source = $('#movie-template').html()
    const template = Handlebars.compile(source)
    for(let i=0;i<len;i++){
       const newHTML = template({title: movies[i].title, poster: movies[i].poster})
       $('.movies-container').append(newHTML)
    }
}

const movieInfoRender = function(movie){
    $('#containerDiv').empty()
    const source = $("#movieinfo-template").html()
    const template = Handlebars.compile(source) 
    const newHtml = template({title: movie.title, poster: movie.poster, rating: movie.rating, plot: movie.plot,votesNum: movie.votesNum, genre: movie.genre, year: movie.year, director: movie.director, actors: movie.actors, trailer: movie.trailer})
    $('#containerDiv').append(newHtml)
}

const myShowsRender = function(movies){
    console.log(movies)
    $('#containerDiv').empty()
    const source = $("#movie-template").html()
    const template = Handlebars.compile(source) 
    let len = movies.length
    for(let i=0;i<len;i++){
        const newHTML = template({title: movies[i].movieTitle, poster: movies[i].moviePic})
        $('#mySavedMovies').append(newHTML)
     }
}