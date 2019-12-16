let addToy = false
submitMe = document.querySelectorAll("submit")
submitMe.innerHTML = "hey"

document.addEventListener("DOMContentLoaded", ()=> {
mainLoad()
fetchToys()
createNewToyClick()
// likes()
})


function mainLoad() {
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
}


function fetchToys() {
  const url = "http://localhost:3000/toys"
  fetch(url)
  .then( (resp) => resp.json()  ) // Transform the data into json
  .then(json => {
  fetchToysLoop(json)
  })
  
  function fetchToysLoop(json) {
    const collection = document.getElementById("toy-collection")

    for (i = 0; i < json.length ; i++) {
      let eachToy = json[i].name
      let eachImage = json[i].image
      let eachLike = "Likes:" + " " + json[i].likes

      let eachP = document.createElement("p")
      eachP.innerHTML = eachLike
      
    
      let eachButton = document.createElement("button")
      eachButton.setAttribute("class", "like-btn");
      eachButton.innerHTML = "Like <3"

      let toyDiv = document.createElement("div")
      let h2 = document.createElement("h2")
      h2.innerHTML = eachToy
      h2.innerHTML = eachToy

      toyDiv.setAttribute("class", "card");
      toyDiv.setAttribute("id", `toy-${json[i].id}`);
      let toyImage = document.createElement("IMG")
      toyImage.setAttribute("class", "toy-avatar");
      
      toyImage.src = eachImage
    
      toyDiv.append(h2, toyImage, eachP, eachButton)
      collection.append(toyDiv)
    }
  }
}



function createNewToyClick(){
  createNewToy = document.querySelector("body > div.container > form > input.submit") 
  createNewToy.addEventListener("click", (event) => {
    event.preventDefault()
    window.alert("Thank you for adding toy!")
    postToy()
  })
}



function postToy() {
  firstInput = document.querySelector("input.input-text").value
  secondInput = document.querySelectorAll("input.input-text")[1].value

  fetch("http://localhost:3000/toys", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  
    //make sure to serialize your JSON body
    body: JSON.stringify({
      name: firstInput,
      image: secondInput,
      likes: Math.floor(Math.random() * Math.floor(5)) + 100,
    })

    

  })
  .then( (resp) => resp.json())
    .then(json => document.body.append(json))


}




// function likes(e) {
//   e.preventDefault()
//   let more = parseInt(e.target.previousElementSibling.innerText) + 1

//   fetch(`http://localhost:3000/toys/${e.target.id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         "Accept": "application/json"

//       },
//       body: JSON.stringify({
//         "likes": more
//       })
//     })
//     .then(res => res.json())
//     .then((like_obj => {
//       e.target.previousElementSibling.innerText = `${more} likes`;
//     }))
// }