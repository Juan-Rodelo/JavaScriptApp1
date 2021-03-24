

let pokemonRepository = (function(){

  //MODAL FOR BOOTSTRAP




let pokemonList = [];

let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

function add(poke){
  if (
    typeof poke === 'object' &&
    "detailsUrl" in poke
  ){
  pokemonList.push(poke);
} else {
  document.write('not an object');
}
}
//After the pokrmon gets pushed into pokemonList through the add function we make a function to get a return outside.
function getAll(){
  return pokemonList;
}

//MODAL
function showModal (item){
  let modalTitle = $("modal-title");
  let modalHeader = $("modal-header");
  let modalBody = $("modal-body");

  modalTitle.empty();
  modalBody.empty();

  let name = $("<h1> + name.item + </h1>");
  let imageFront = $('<img class = "modal-img" style="width:50%">');
  imageFront.attr("src", item.imageUrl);
  let height = $("<p>" + "height:" + item.height + "</p>");
  let weight = $("<p>" + "weight:" + item.weight + "</p>");
  let types =  $("<p>" + "type:" + item.types + "</p>");
  let url = $("<p>" + "Url:" + item.imageUrl + "</p>");

  modalTitle.append(name);
  modalBody.append(imageFront);
  modalBody.append(height);
  modalBody.append(weight);
  modalBody.append(types);
  modalBody.append(url);
}

//POKEMON LIST BUTTONS
function addListItem(poki){

  let pList = $(".list-group");
  let listPokemon = $("<li class='list-group-item'> </li>"); // creates the li element
  // listPokemon.addClass(".list-group-item");
  let pokeButton = $('<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal"></button>'); //Creates the Button element in the document
  pokeButton.append(document.createTextNode(poki.name));
  // button.innerText=poki.name; //Puts the text inside the button
  // button.addClass(".btn btn-outline-danger"); //adds the bootstrap list-group-item class
  listPokemon.append(pokeButton); //We put the element we just made into the <li> "listPokemon"
  pList.append(listPokemon); // We put the Li into the class ".pokemon-list of the parent <ul>"
  // button.addEventListener("click", function (event){
  //   showDetails(poki);
  // })
  pokeButton.on("click", function (event) {
   showDetails(poki);
 });

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
    // The json is the whole key, cointains the whole url.
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
   //You are asking to take the url as a promise with .then this runs a function, and turn it into a json,
   //you take this json and turn it also into a promise
   return fetch(url).then(function (response) {
     return response.json();
   }).then(function (details) {
     // Now we add the details to the item
     // those details come from the URL file
     item.imageUrl = details.sprites.front_default;
     item.height = details.height;
     item.types = [];
     details.types.forEach(function (itemTypes) {
       item.types.push(itemTypes.type.name);
     });

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
    // showDetails : showDetails,
    showModal: showModal
  };
})();

//Now we put the forEach list into the loading function.
//I forgot how this works
pokemonRepository.loadList().then(function() {
pokemonRepository.getAll().forEach(function(lulu) {
  pokemonRepository.addListItem(lulu);
  });
});
