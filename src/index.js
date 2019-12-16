let addToy = false
const toyURL = "http://localhost:3000/toys"

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", event => clickToSubmit(event))
  
  
 
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetchToys()
})

function fetchToys(){
  fetch(toyURL)
  .then(response => response.json())
  .then(json => renderToys(json))
}

function renderToys(json){
  json.forEach(object => renderToyData(object))
}

function renderToyData(object) {
  let toyContainer = document.getElementById("toy-collection")
  let toyCard = document.createElement("div")
  toyCard.setAttribute("class", "card") 
  toyCard.setAttribute("id", `toy-${object.id}`)
  toyCard.innerHTML = 
    `<h2>${object.name}</h2>
    <img src=${object.image} class="toy-avatar" />
    <p> ${object.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`
  let button = toyCard.lastElementChild;
  button.addEventListener("click", event => addLikes(event))
  toyContainer.append(toyCard)

  
}


function clickToSubmit(event) {
  event.preventDefault()
  let toyName = document.querySelectorAll("input")[0].value
  let toyImage = document.querySelectorAll("input")[1].value
  // console.log(toyName)
  // console.log(toyImage)
  
  
    
  
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
      },
      body: JSON.stringify({name: toyName, image: toyImage, likes: 0})})
  .then(response => response.json())
  .then(object => renderToyData(object))
    toyName.Text = ""
    toyImage.Text = ""
}

function addLikes(event){
  event.preventDefault()
  let button = event.target
  let toyId = event.target.parentElement.id.split("-")[1]
  

  let likes = button.previousElementSibling.innerText
  let num = parseInt(likes)
  let updatedLikes = `${num +1}`

  const newData = {
    id: toyId,
    likes: updatedLikes
  }
  fetch(toyURL + "/" + toyId, {
    method: "PATCH",
    body: JSON.stringify(newData),
    headers: {
    'Content-Type': 'application/json'
  }})
  .then(response => response.json())
  .then(json => {event.target.previousElementSibling.innerText = `${json.likes} Likes`})

  
}
