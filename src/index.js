let addToy = false
const toyUrl = 'http://localhost:3000/toys';

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.getElementById("toy-collection")

  toyForm.addEventListener('submit', (event) =>{
    event.preventDefault()
    postToys(event)
  } )
  toyCollection.addEventListener('click', (event)=> {
    if (event.target.tagName === "BUTTON"){
      patchToys(event)
    }
  })
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

async function fetchToys() {
  const response = await fetch(toyUrl)
  const apiData = await response.json();
  const toyCollection = document.getElementById("toy-collection")
  console.log(toyCollection)
  // debugger; 
  apiData.forEach(toy => {
    const toyDiv = document.createElement('div')
    toyDiv.setAttribute("class", "card")
    toyDiv.innerHTML= `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn" data-id="${toy.id}">Like <3</button>`
    toyCollection.append(toyDiv);
  })
}

// let newToy = {
//   name: event.target.name.value,
//   image: event.target.image.value,
//   likes: 0}
//   JSON.stringify(newToy)

async function postToys(event){
  const response = await fetch(toyUrl, {
    method: 'POST',
    body: JSON.stringify({
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0}),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      } })
      const apiData = await response.json();
      // console.log(apiData)
      const toyCollection = document.getElementById("toy-collection")
      const toyDiv = document.createElement('div')
      toyDiv.setAttribute("class", "card")
      toyDiv.innerHTML= `
      <h2>${apiData.name}</h2>
      <img src=${apiData.image} class="toy-avatar" />
      <p>${apiData.likes} Likes </p>
      <button class="like-btn" data-id="${apiData.id}">Like <3</button>`
      toyCollection.append(toyDiv);
    }
    
    async function patchToys(event){
      // debugger;
      console.log(event.target)
      const likeAmount = event.target.previousElementSibling.innerText.split("")[0]
      const response = await fetch(toyUrl+"/"+event.target.dataset.id, {
        method: 'PATCH',
        body: JSON.stringify({
          likes: Number(likeAmount) + 1}),
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json'
          } })
          const apiData = await response.json();
          event.target.previousElementSibling.innerText = `${apiData.likes} Likes` 
}
    
