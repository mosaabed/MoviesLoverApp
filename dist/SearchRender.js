class SearchRender
{
    constructor(){
        this.genreList = ['Drama', 'Action' , 'Romance' , 'War']
    }

    render(){
        const source = $("#search-template").html()
        const template = Handlebars.compile(source)
        let newHtml = template(this.genreList)
        $("#mainDiv").empty().append(newHtml)
        $("#mainDiv").append(`<input id = "movieName" type="text">
        <button id="searchButton" onclick="search()">search</button>`)
        $("#mainDiv").append(`<div id = 'resultOfSearch'></div>`)
    }

    resultRender(data)
    {
        console.log("search clicked , result page")
        const source = $("#searchResult-template").html()
        const template = Handlebars.compile(source)
        let newHtml = template(data)
        $('#resultOfSearch').empty().append(newHtml)
    }
}