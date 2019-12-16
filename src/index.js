let addToy = false

document.addEventListener("DOMContentLoaded", ()=>{
  
  listenForSubmit();
  // listenForLikes();

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
  });

});

fetch('http://localhost:3000/toys')
    .then(
      function(response) {
        response.json().then(function(data) {
          let toys = document.getElementById('toy-collection');
          for(let i=0; i<data.length; i++) {
            let newToyCard = makeCard(data[i]);
            toys.append(newToyCard);
          }
        })
      }
    );


function listenForSubmit(event) {
  document.querySelector('form').addEventListener('submit', event => addNewToy(event));
}

function addNewToy(event) {
  event.preventDefault();

  const name = document.getElementsByName('name')[0].value;
  const image = document.getElementsByName('image')[0].value;
  document.getElementsByName('name')[0].innerText = null;
  document.getElementsByName('image')[0].innerText = null;

  let toyInfo = {
    name: name,
    image: image
  }

  let submitObj = {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
    },
    body: JSON.stringify(toyInfo)
  }

  let toys = document.getElementById('toy-collection');

  fetch('http://localhost:3000/toys', submitObj)
  .then(function(response) {
    response.json().then(function(result){
    console.log(result)
    let newCard = makeCard(result);
    toys.append(newCard);
  })
  .catch(function(error){
    console.log("Request Failed", error);
  })
})
};

// function listenForLikes(event) {
//   let allToys = document.getElementById('toy-collection');
//   for(let i = 0; i < allToys.length; i++){
//     allCards[i].addEventListener('click', event => increaseLikes(event));
//   };
// };

function increaseLikes(event) {
  let toyLikes = parseInt(event.target.previousElementSibling.innerText) + 1;
  let toyId = parseInt(event.target.parentElement.id.split("-")[1])
  console.log(toyLikes);

  const toyData = {
    "id": toyId,
    "likes": toyLikes
  }

  let updateObj = {
    method: "PATCH",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
    },
    body: JSON.stringify(toyData)
  }

  fetch('http://localhost:3000/toys/' + `${toyId}`, updateObj)
    .then (function(response){
      response.json().then(data => {
        let toyDiv = document.querySelector(`#toy-${data.id}`)
        toyDiv.lastElementChild.previousSibling.innerHTML = `${data.likes} likes`;
      });
    })
};

function makeCard(data) {
  let newToy = document.createElement('div');
    newToy.className = "card";
    newToy.id = `toy-${data.id}`;
  let newToyHeading = document.createElement('h2');
    newToyHeading.innerText = `${data.name}`;
    newToy.appendChild(newToyHeading)
  let newToyImg = document.createElement('img');
    newToyImg.src = `${data.image}`;
    newToyImg.className = "toy-avatar";
    newToy.appendChild(newToyImg);
  let newToyParagraph = document.createElement('p');
    newToyParagraph.innerHTML = `${data.likes} Likes`;
    newToy.appendChild(newToyParagraph);
  let newToyButton = document.createElement('button');
    newToyButton.innerText = "Like <3";
    newToyButton.className = "like-btn";
    newToyButton.addEventListener('click', event => increaseLikes(event));
    newToy.appendChild(newToyButton);
  return newToy;
}