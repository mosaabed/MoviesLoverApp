class signUpRender{
    render() {
        $('#mainDiv').empty()
        const source = $('#signUp-template').html()
        const template = Handlebars.compile(source) 
        const newHtml = template()
        $('#mainDiv').append(newHtml)
    }
}