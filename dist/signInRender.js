class signInRender{
    render() {
        $('#mainDiv').empty()
        const source = $('#signIn-template').html()
        const template = Handlebars.compile(source) 
        const newHtml = template()
        $('#mainDiv').append(newHtml)
    }
}