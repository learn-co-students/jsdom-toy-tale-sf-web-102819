let addToy = [];
let addBtn
let toyForm
let toyCollection

document.addEventListener("DOMContentLoaded", ()=>{ 
  fetchToys()
  showForm()
  toyFormListener()
})

function showForm(){
  addBtn = document.querySelector('#new-toy-btn')
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })
}

function fetchToys(){
  toyCollection = document.querySelector('#toy-collection')
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json[0])
      toyCollection.innerHTML = json.map(toy => renderToy(toy))
      .join("")
      const likeButtons = document.getElementsByClassName('like-btn')
      for (var i = 0; i < likeButtons.length; i++){
        likeButtons[i].addEventListener('click', function(e){
          updateLikes(e)
        })
      }
    })
}

function renderToy(toy) {
  return `
  <div id=${toy.id} class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes}</p>
    <button class="like-btn">Like</button>
  </div>
  `

}

function likeButtonListener(){
  const likeButtons = document.getElementsByClassName("like-btn")
  for (var i = 0; i < likeButtons.length; i++){
    likeButtons[i].addEventListener('click', function(e){
      likeButtons[i].style.color = 'blue'
    })
  }
  // likeArray.forEach.addEventListener("click", function(e){
  //   console.log("hi")
  // })
}


function toyFormListener(){
  toyForm = document.querySelector('.container')
  toyForm.addEventListener('submit', function(event){
    postToy(event)
  })
}
  
function postToy(toy){
  event.preventDefault();
  const newToyForm = document.querySelector('.add-toy-form')
  const toyInput = newToyForm.elements
  const toyInput1 = toyInput[0].value
  const toyInput2 = toyInput[1].value
  
  // console.log(newToyName)
  // console.log(newToyImage)
  // `${toyInput2}`
  const data = {
    //id is made automatially? 
    "name": `${toyInput1}`,
    "image": `${toyInput2}`,
    "likes": Math.floor((Math.random() * 5) + 1)
  }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }}).then(response => response.json())
    .then(json =>{
      const newCard = document.createElement("div")
      newCard.innerHTML = renderToy(json)
      toyCollection.prepend(newCard)
    })
  }

  function updateLikes(like){
    like.preventDefault();
    const button = like.target
    const id = button.parentElement.id
    let likes = button.previousElementSibling.innerText
    let likesNumber = parseInt(likes, 10)
    let newLikesNumber = (likesNumber += 1)
    

      const data = {
        "likes": `${newLikesNumber}`
      }

    console.log(id)
    console.log(likes)
    console.log(newLikesNumber)

    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": `${newLikesNumber}`
      })
    })
    
    .then(response => response.json())
    .then(res =>console.log(res))
    

  }
  


  
