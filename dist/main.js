const profileRender = new ProfileRender()
const searchRender = new SearchRender()
const loginPage = new LoginPage()

let UserProfile = null
UserProfile = loginPage.render()
let UserProfile = 1
//UserProfile = loginPage.render()


function HomeClicked()
function ProfileClicked()
function logIn(userName, password){
    
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