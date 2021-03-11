

let pokemonRepository = (function(){
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

function showDetails(poki){
  console.log(poki.name);
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

 function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
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

// To pass a new poki I need to make it into an object to push it into the array
let Pidgey = {
  name:'Pidgey',
  height:0.3 ,
  types: 'Flying'
};

let Venusaur = 'Venusaur';

pokemonRepository.add(Venusaur);
pokemonRepository.add(Pidgey);

//Now we put the forEach list into the loading function.
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
