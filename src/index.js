let addToy = false
const toyCollection = document.querySelector("#toy-collection");

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  // const toyInputForm = document.querySelector(".add-toy-form");
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // addNewToy(e.target)
    } else {
      toyForm.style.display = 'none'
    }
  })
  fetchToys()
  postToy()
})

// GET fetch
let fetchToys = () => {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(json => {
      allToys = json;
      // console.log(allToys)
      // allToys.forEach(toy => (toyCollection.innerHTML += renderText(toy)));
      toyCollection.innerHTML = allToys.map(toy => renderText(toy)).join("");
    });
  }

  // render a toy
  let renderText = (toy) => {
  return `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
  </div>`;
}

// create a toy
const postToy = () => {
  const toyInputForm = document.querySelector(".add-toy-form");
  const inputName = document.querySelectorAll(".input-text")[0];
  const inputUrl = document.querySelectorAll(".input-text")[1];
  toyInputForm.addEventListener("submit", e => {
    e.preventDefault();
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name: inputName.value,
        image: inputUrl.value,
        likes: 0
      })
    })
      .then(res => res.json())
      .then(json => {
        let newToy = renderText(json);
        toyCollection.innerHTML.append(newToy);
        // debugger
      });
  });
}
