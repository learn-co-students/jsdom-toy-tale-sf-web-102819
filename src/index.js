let addToy = false
getToys()

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
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

let form = document.querySelector(".add-toy-form")
form.addEventListener("submit", (event) => {
  event.preventDefault()
  let name = document.querySelector("#toy-name").value
  let image = document.querySelector("#toy-image").value

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
    .then(json => renderToy(json))
    .then(() => {

    });
})

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => {
      json.forEach(ele => renderToy(ele))
    })
}

function renderToy(json) {
  let newToy = document.createElement('div')
  newToy.setAttribute("class", "card")
  newToy.innerHTML = `
    <h2 >${json.name}</h2>
    <img src=${json.image} class="toy-avatar" />
    <p id=${json.name.split(" ").join("-")}> ${json.likes} likes</p>
    <button id ="${json.id}" class="like-btn">Like <3</button>
  `
  document.querySelector("#toy-collection").appendChild(newToy)
  let button = newToy.children[3]
    console.log(button)

    button.addEventListener("click", () => {
      let newLikes = parseInt(newToy.children[2].innerText.split(" ")[0]) + 1
      
      let patchObject = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({likes: newLikes})
      }
      fetch(`http://localhost:3000/toys/${button.id}`, patchObject)
      .then(res => res.json())
      .then(json => reRenderToy(json))
})
}

function reRenderToy(json) {
  toyLikes = document.querySelector(`#${json.name.split(" ").join("-")}`)
  toyLikes.innerText = `${json.likes} likes` 
}


  
    
    
   







