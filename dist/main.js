let currentProfile 
let movieByTitle 
let moviesArr = []

function getHomePage(){
    $.ajax({
        method: "GET",
        url: `/homePage`,
        success: function (data){
            homeRender(data)
           
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}

function HomeClicked(){
    getHomePage()
}

function signIn(){
    let userName = $("#userNameSignIn").val()
    let password = $("#passwordSignIn").val()
    $.ajax({
        method: "GET",
        url: `LogIn/${userName}/${password}`,
        success: function (data){
            if(data === "login successed"){
                $.ajax({
                    method: "GET",
                    url: `getProfile/${userName}`,
                    success: function (user){
                        currentProfile = new Profile(user.userName, user.password, user.profilePic, user.bio)
                        getHomePage()
                    },
                    error: function (xhr, text, error) {
                        console.log(text)
                    }
                })
            }
            else{
                if(data === "wrong password"){
                    alert("WRONG PASSWORD, TRY AGAIN")
                }
                else{
                    if(data === "This user does not exist, register now"){
                        signUpRender()
                    }
                }
            }
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}

function goSignUp(){
    signUpRender()
}

function signUp(){
    let userName = $("#userName").val()
    let password = $("#password").val()
    let pic = $("#profilePic").val()
    let bio = $("#bio").val()
    let newUser = new Profile(userName, password, pic, bio,"")
    $.post('/addNewUser', newUser, function (response) {
        currentProfile = newUser
        getHomePage()
    })
}

function myProfile(){
  profileRender(currentProfile)
}

function startSearch(){
  searchPage()
}

function sharePost(){
    let text = $('#post-text').val()
    let movieTitle = $('.movie').children(".movie-title").html()
    let moviePoster = $('img').attr('src');
    let newPost = new Post(text, currentProfile.userName, movieTitle, moviePoster, "")
    $.post('/sharePost', newPost, function (response){
        console.log(text +" " + movieTitle +" "+moviePoster)
    })
    getHomePage()
}

function searchByTitle(){
    let title = $("#search-title").val()
    $.ajax({
        method: "GET",
        url: `/searchByTitle/${title}`,
        success: function (data){
            movieByTitle = new Movie(data.title, data.rating, data.votesNum, data.genre, data.director, data.actors, data.plot, data.trailer, data.poster, data.year)
            moviesRender([data])
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}

function searchByGenre(){
    let genre = $("#search-genre").val()
    let genreID = findGenreId(genre)
    $.ajax({
        method: "GET",
        url: `/searchByGenre/${genreID}`,
        success: function (data){
            for(let ele of data){
                let movie = new Movie(ele, "", "","","","","","","","")
                moviesArr.push(movie)
            }
            moviesRender(moviesArr)
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}

function displayMovieInfo(){
    let title = $(this).closest('.movie-div').find('.movie-title').text()
    $.ajax({
        method: "GET",
        url: `/searchByTitle/${title}`,
        success: function (data){
            let newMovie= new Movie(data.title, data.rating, data.votesNum, data.genre, data.director, data.actors, data.plot, data.trailer, data.poster, data.year)
            $.ajax({
                method: "GET",
                url: `/getTrailer/${newMovie.title}`,
                success: function (link){
                    newMovie.trailer = link
                    movieInfoRender(newMovie)
                },
                error: function (xhr, text, error) {
                    console.log(text)
                }
            })
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}

function likeMovie(){
    let title = $('.movie').children(".movie-title").html()
    let poster = $('img').attr('src');
    let parameter ={
        userName: currentProfile.userName,
        title: title,
        poster: poster
    }
    $.post('/addShowToFavorite', parameter, function(response){
        console.log("added to favorite shows")
    })
}

function watchLater(){
    let title = $('.movie').children(".movie-title").html()
    let poster = $('img').attr('src');
    let parameter ={
        userName: currentProfile.userName,
        title: title,
        poster: poster
    }
    $.post('/addToWatchLater', parameter, function(response){
        console.log("added to watch later shows")
    })
}

function commentOnPost(){
    let postID
    let text
    let parameter ={
        id: postID,
        userName: currentProfile.userName,
        text: text
    }
    $.post('/addCommentToPost', parameter, function(response){
        console.log("added comment")
        getHomePage()
    })
}

function likePost(){
    let postID
    $.post('/addCommentToPost', postID, function(response){
        console.log("added like")
        getHomePage
    })
}

function favoriteShows(){
    $.ajax({
        method: "GET",
        url: `/getFavoriteShows/${currentProfile.userName}`,
        success: function (data){
            myShowsRender(data)
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}


function watchLaterShows(){
    $.ajax({
        method: "GET",
        url: `/getWatchLaterShows/${currentProfile.userName}`,
        success: function (data){
            myShowsRender(data)
        },
        error: function (xhr, text, error) {
            console.log(text)
        }
    })
}

$('#mainDiv').on('click','.movie-title',displayMovieInfo)