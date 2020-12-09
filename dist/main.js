
const homeRender = new HomeRender()
const profileRender = new ProfileRender()
const searchRender = new SearchRender()
const loginPage = new LoginPage()



let UserProfile = null
UserProfile = loginPage.render()
let User

let UserProfile = 1
//UserProfile = loginPage.render()



function logIn(userName, password){


function HomeClicked()
{
    if(UserProfile != null){
        console.log("home page opend")
        $.get('/home' , function(data){
            homeRender.render(data);
        })
    }else
    {
        alert("you need to login first")
    }
    
}

function ProfileClicked()
{
    if(UserProfile){
        console.log("profile page opend")
        $.get('/profile' , function(data)
        {
            profileRender.render(data)
        })
    }else{
        alert("you need to login first")
    }
    
}

function searchClicked()
{

    if(UserProfile != null ){
        console.log("search page opend")
        searchRender.render()
    }else
    {
        alert("you need to login first")
    }
} 

function search()
{
    let movieName =  $('#movieName').val()
}



function goSignIn(){
    const signInRenderer = new signInRender()
    signInRenderer.render()
}
function goSignUp(){
    const signUpRenderer = new signUpRender()
    signUpRenderer.render()
}
function signUp(){
    let userName = $("#userName").val()
    let password = $("#password").val()
    let profilePic = $("#profilePic").val()
    let bio = $("#bio").val()
    //check if userName unique
    //save to data base
    const profilePageRenderer = new profilePageRender()
    profilePageRenderer.render()
}
function signIn(){
    let userName = $("#userNameSignIn").val()
    let password = $("#passwordSignIn").val()
    //check if userName exists 
    //check if password correct
    //get user 

}
function search()
{
    let movieName =  $('#movieName').val()
    console.log( movieName)
    // $.get(`` , function(data)
    // {
    //     searchRender.resultRender(data)
    // })
    $('#movieName').val("")
    $('#movieYear').val("")
}
$("#mainDiv").on("click" , ".search-li-a" ,function()
{
    // $.get(`` , function(data)
    // {
    //     searchRender.resultRender(data)
    // })
    console.log(this.innerHTML)
}) 


