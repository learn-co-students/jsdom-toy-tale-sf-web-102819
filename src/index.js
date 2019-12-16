let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  fetchToyData()
 listenForClick()
 
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })

})

function fetchToyData() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
   .then(json => renderToyData(json))
}

function renderToyData(json) {
  
  let toys = json;
  let toyCard = document.getElementById("toy-collection");
  
  for (let i = 0; i < toys.length; i++){
    let div = document.createElement("div");
    div.className = "card"
    let h2 = document.createElement("h2");
    let img = document.createElement("IMG");
    let likes = document.createElement("p")
    let button = document.createElement("button")
    button.className = "like-btn"
    button.innerText = "<3 Like"
    button.addEventListener("click", (event) => {
      event.preventDefault
      increaseLikes(event)
      })
    h2.innerText = toys[i].name
    img.src = toys[i].image
    img.className =  "toy-avatar"
    likes.innerText = `${toys[i].likes} Likes`

    div.append(h2, img, likes, button)
    toyCard.append(div)
  }
}
function listenForClick(){
let form = document.querySelector(".add-toy-form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  createNewToy(event)
})}

function createNewToy() {
  let name = document.querySelectorAll("input")[0].value
  let image = document.querySelectorAll("input")[1].value
  let formData = {
    name: name,
    image: image,
    likes: 0
  }
  let configObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(formData)
  }

  fetch("http://localhost:3000/toys", configObject)
    .then(res => res.json())
    .then(json => renderToyData(json))
    

}

function increaseLikes(event){
  
  let button = event.target
  let likes = button.previousSibling.innerText
  num = parseInt(likes) 
  newLikes = `${num +1} Likes`
  let patchObject = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({likes: newLikes})
  }
  fetch(`http://localhost:3000/toys/`, patchObject)
  .then(res => res.json())
  .then(json => renderToyData(json))
}

