

let pokemonRepository = (function(){

  //MODAL
  //Steps : 1. Create a modal-contianer div that is invisible in css. Here you are going to put the modal.
    //2. Define all that you want in the modal in a function to show the modal.
    //3.Craete a modal div, Create a close button. Make sure you can also close the model with escape or clicking out side the scree
    //4. Create an event listener event to execute the show modeal function when you click on a pokemon button.
    //
  //select modal div with css clase to display none
  let modalContainer = document.querySelector('#modal-container');
  //create a function to display the modalContainer
  function showModal (name,height){
    //we erase any possible html (??don't understant why this is needed)
    modalContainer.innerHTML = '';
    //we create a div to add our css class modal that difines the div
    let modal = createElement("div");
    modal.classList.add("modal");

    //Create a close botton that we will add later to our modal div
    let closeBottonElement = document.createElement("button");
    closeBottonElement.classList.add("modal-close");
    closeBottonElement.classList.innerText = "Close";
    closeButtonElement.addEventListener('click', hideModal);

    let pokemonName = (function(){
      document.createElement('h1');
      pokemonName.innerText = name;
    })

    let poekemonHeight = document.createElement('p1');
    pokemonHeight.innerText = height;
    // let pokemonImage = //put imageUrl

    modal.appendChild(closeBottonElement);
    modal.appendChild(pokemonName);
    // modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    //Add the visible css display
    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  //Enable escape keyboard. The window object represents the browser's window
  window.addEventListener("keydown",(e) => {
    //keyboard lets you get keyboard imput
    //The contains() method returns a Boolean value indicating whether a node is a descendant of a specified node.
    if (e.key === 'Escape' && modalContainer.classList.contains("is-visible")){
      hideModal();
    }
  });

  //Add click outside the modalContainer
  modalContainer.addEventListener("click",(e)=> {
    //we want to specify that it opens only on modalContainer,
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //Here we select the button we want to open with a click and show the model we created
  document.querySelector('.pokemon-list').addEventListener('click', () => {
    showModal('name', 'height');
  });
//MODAL ENDS



  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(pokemon){
  if (
    typeof pokemon === 'object' &&
    "detailsUrl" in pokemon
  ){
  pokemonList.push(pokemon);
} else {
  document.write('not an object');
}
}

function getAll(){
  return pokemonList;
}

function addListItem(poki){
  let pList = document.querySelector(".pokemon-list");
  let listPokemon = document.createElement("li"); // creates the li element
  let button = document.createElement("button"); //Creates the Button element in the document
  button.innerText=poki.name; //Puts the text inside the button
  button.classList.add("button-class") //adds the css "button-class" to the button var we just made. ClassList represents the class of and element.
  listPokemon.appendChild(button); //We put the element we just made into the <li> "listPokemon"
  pList.appendChild(listPokemon); // We put the Li into the class ".pokemon-list of the parent <ul>"
  button.addEventListener("click", function (event){
    showDetails(poki);
  })
}


function loadList() {
  //fetch the apiUrl variable and then we convert it into a promise. The result is ging to be a response
  //we use .then to return a promise. This is the funtion for a promise
  return fetch(apiUrl).then(function (response) {
  //we convert the response into a json. So basiccally turning the url into JSON language to talk to Javascript
      return response.json();
  }).then(function (json) {
    //the results comes from te URL page.
    json.results.forEach(function (item) {
      let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      //this goes to the function in the top
      add(pokemon);
      console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

function loadDetails(item) {
  //details url is coming from the prevous function
   let url = item.detailsUrl;
   //You are asking to take the url and turn it into a json
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // Now we add the details to the item
     // those details come from the URL file
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.types = details.types;
   }).catch(function (e) {
     console.error(e);
   });
 }

 function showDetails(load) {
  loadDetails(load).then(function () {
    showModal();
  });
}



return {
    getAll : getAll,
    add : add,
    addListItem : addListItem,
    loadList: loadList,
    loadDetails : loadDetails,
    showDetails : showDetails
  };
})();



//Now we put the forEach list into the loading function.
//I forgot how this works
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(poki) {
  pokemonRepository.addListItem(poki);

  });
});

// pokemonRepository.getAll().forEach(function(poki) {
//   document.write('<h3>' + ' ' + poki.name + ' ' + poki.height + ' ' + poki.types + '</h3>');
// });


//This is the example done inside the main pokemonRepository function
//make a pokemon botton with all the pokemons
// pokemonRepository.getAll().forEach(function(poki) {
//   let pList = document.querySelector(".pokemon-list");
//   let listPokemon = document.createElement("li"); // creates the li element
//   let button = document.createElement("button"); //Creates the Button element in the document
//   button.innerText=poki.name; //Puts the text inside the button
//   button.classList.add("button-class") //adds the css "button-class" to the button var we just made
//   listPokemon.appendChild(button); //We put the element we just made into the <li> "listPokemon"
//   pList.appendChild(listPokemon); // We put the Li into the class ".pokemon-list of the parent <ul>"
// });



// function getPoki (poki) {
// document.write(poki.name + poki.height + poki.types);
// }
// pokemonRepository.getAll().forEach(getPoki);
// Another way to do the forEach function

//https://pokedex.org/#/pokemon/3

// To pass a new poki I need to make it into an object to push it into the array
// let Pidgey = {
//   name:'Pidgey',
//   height:0.3 ,
//   types: 'Flying'
// };
//
// let Venusaur = 'Venusaur';
//
// pokemonRepository.add(Venusaur);
// pokemonRepository.add(Pidgey);
