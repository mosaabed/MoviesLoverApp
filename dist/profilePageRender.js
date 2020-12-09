class profilePageRender{
    render() {
        $('#mainDiv').empty()
        const source = $('#profilePage-template').html()
        const template = Handlebars.compile(source) 
        const newHtml = template()
        $('#mainDiv').append(newHtml)
    }
}