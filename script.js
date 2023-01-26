const APIURL  = "https://api.github.com/users/"
const formEl = document.querySelector('form')
const search = document.querySelector('.search')
const searchResult = document.querySelector('.search-result')
const main = document.querySelector('.main')

async function getUser(username){
   try {
        const { data } = await axios.get(APIURL + username)
        createUserCard(data);
        getRepos(username);
    
   } catch (error) {
        if(error.response.status ==  404){
            createErrorCard("No profile with this username")
        }
   }
}
async function getRepos(username){
   try {
        const { data } = await axios.get(APIURL + username+ "/repos?sort=created")
        addReposToCard(data);
    
   } catch (error) {
        
            createErrorCard("Problem fectching repos")

   }
}

formEl.addEventListener('submit', (e)=>{
    e.preventDefault()
    const user = search.value
    if(user){
        getUser(user)
        search.value= ''
    }
})

function createUserCard(user){
    const card = `
    <div class="search-result">
     <div class="search_img">
     <img src="${user.avatar_url}" alt="" >
</div>
<div class="search_details">
    <p class="name">${user.name}</p>
    <p class="exerpt">${user.bio?user.bio:''}</p>
    <div class="activity">
        <div class="followers">${user.followers} <span>Followers</span></div>
        <div class="following">${user.following} <span>Following</span></div>
        <div class="repos">${user.public_repos} <span>Repos</span> </div>
    </div>
    <div class="lastReps">
    </div>
    </div>
</div>`
main.innerHTML = card
}
function createErrorCard(message){
    const errorCard = `<div class="search-result" style="text-align: center"><h1>${message}</h1></div>`
    main.innerHTML = errorCard
}
function addReposToCard(repos){

    const reposWrapper = document.querySelector('.lastReps')
    repos
         .slice(0,7)
         .forEach((repo) => {
            const repoEl =  document.createElement('a')
            repoEl.classList.add('box')
            reposWrapper.appendChild(repoEl)
            repoEl.innerText = repo.name
            repoEl.href = repo.html_url
            repoEl.target = "_blank"
        
    });


}