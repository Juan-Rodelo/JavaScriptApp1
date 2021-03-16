

let pokemonRepository = (function(){

  //MODAL

  //select modal div with css clase to display none
  let modalContainer = document.querySelector('#modal-container');
  //create a function to display the modalContainer
  function showModal (pokemon){
    //we create a div to add our css class modal that difines the div
    let modal = document.createElement("div");
    modal.classList.add("modal");
    //Add the visible css display
    modalContainer.classList.add("is-visible");
    //we erase any possible html (??don't understant why this is needed)
    modalContainer.innerHTML = '';


    //Create a close botton that we will add later to our modal div
    let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener('click', hideModal);

    let createname = document.createElement('h1');
        createname.classList.add('h1');
        createname.innerHTML = pokemon.name;

    let createimg = document.createElement('img');
        createimg.classList.add('pokemon-img');
        createimg.src = pokemon.imageUrl;
        //.alt returns the alternate text of an image
        createimg.alt = "Image of " + pokemon.name

    let createheight = document.createElement('p');
        createheight.classList.add('p');
        createheight.innerHTML = "Height: " + pokemon.height*10 + "cm";

    let createweight = document.createElement('p');
        createweight.classList.add('p');
        createweight.innerHTML = "Weight: " + pokemon.weight + "lbs";

    let createtype = document.createElement('p');
        createtype.classList.add('p');
        createtype.innerHTML = "Type: " + pokemon.types;

    modal.appendChild(closeButtonElement);
    modal.appendChild(createname);
    modal.appendChild(createheight);
    modal.appendChild(createweight);
    modal.appendChild(createtype);
    modalContainer.appendChild(modal);


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
  // document.querySelector('.pokemon-list').addEventListener('click', () => {
  //   showModal('name', 'height');
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
//After the pokrmon gets pushed into pokemonList through the add function we make a function to get a return outside.
function getAll(){
  return pokemonList;
}

//Create the button  for the list
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

//The LoadList() method will fetch data (name, url) from the API, then add each Pokémon in the fetched data to pokemonList
// with the add function implemented earlier. It gives the data to the variable pokemon
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
      //this goes to the function above
      add(pokemon);
      // console.log(pokemon);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

// use the detailsUrl property to load the detailed data for a given Pokémon. takes a Pokémon item as an argument:
// This one gives image height and types. We want this to access details with a click.
function loadDetails(item) {
  //detailsUrl is coming from the prevous function
   let url = item.detailsUrl;
   //You are asking to take the url as a promise with then this runs a function, and turn it into a json,
   //you take this json and turn it also into a promise
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // Now we add the details to the item
     // those details come from the URL file
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.types = details.types;
     item.weight = details.weight;
   }).catch(function (e) {
     console.error(e);
   });
 }

 // function is executed in addListItem when a user clicks on a Pokémon
 function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
  showModal(item);
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
// The load list as a promise gets put into the getall(the repository), forEach getAll we add the botton in the addListItem
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(poki) {
  pokemonRepository.addListItem(poki);

  });
});
