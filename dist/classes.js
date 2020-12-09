class Profile{
    constructor(userName, password, profilePic, bio){
        this.userName = userName
        this.password = password
        this.profilePic = profilePic
        this.bio = bio
    }
}

class Post{
    constructor (text, userName, movieTitle, moviePoster, id){
        this.text = text
        this.userName = userName
        this.movieTitle = movieTitle
        this.moviePoster = moviePoster
        this.likes = 0
        this.comments = []
        this.id = id
    }
}

class Movie{
    constructor(title, rating, votesNum, genre, director, actors, plot, trailer, poster, year){
        this.title = title
        this.rating = rating
        this.votesNum = votesNum
        this.genre = genre
        this.director = director
        this.actors = actors
        this.plot = plot
        this.trailer = trailer
        this.poster = poster
        this.year = year
    }
}