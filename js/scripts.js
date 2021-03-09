

let pokemonRepository = (function(){
  let pokemonList = [
    {name:'Pidgeot', height:1.5 , types: 'Flying'},
    {name:'Arbok', height: 3.5, types: 'poison'},
    {name:'Poliwhirl', height:1, types:'water'},
    {name:'Sandshrew', height:0.6, types:'ground'}
  ];
function add(pokemon){
  if (typeof(pokemon)=== 'object'){
  pokemonList.push(pokemon);
}
else {
  document.write('not and object');
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
  button.classList.add("button-class") //adds the css "button-class" to the button var we just made
  listPokemon.appendChild(button); //We put the element we just made into the <li> "listPokemon"
  pList.appendChild(listPokemon); // We put the Li into the class ".pokemon-list of the parent <ul>"
  button.addEventListener("click", showDetails(poki));
}

function showDetails(poki){
  console.log(poki.name);
}

return {
    getAll : getAll,
    add : add,
    addListItem : addListItem,

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


pokemonRepository.getAll().forEach(function(poki) {
  pokemonRepository.addListItem(poki);

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
