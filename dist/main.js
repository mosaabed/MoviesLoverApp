const homeRender = new HomeRender()
const profileRender = new ProfileRender()
const searchRender = new SearchRender()
const loginPage = new LoginPage()

let UserProfile = null
UserProfile = loginPage.render()


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