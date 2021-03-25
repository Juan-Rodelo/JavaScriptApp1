

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
  let modalTitle = $(".modal-title");
  let modalHeader = $(".modal-header");
  let modalBody = $(".modal-body");

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $("<h1>" + item.name + "</h1>");
  let imageFront = $('<img class = "modal-img" style="width:50%">');
  imageFront.attr("src", item.imageUrl);
  let heightElement = $("<p>" + "height:" + item.height + "</p>");
  let weightElement = $("<p>" + "weight:" + item.weight + "</p>");
  let typesElement =  $("<p>" + "type:" + item.types + "</p>");


  modalTitle.append(nameElement);
  modalBody.append(imageFront);
  modalBody.append(heightElement);
  modalBody.append(weightElement);
  modalBody.append(typesElement);

}

//POKEMON LIST BUTTONS
function addListItem(poki){
  let pList = $(".row");
  let card = $('<div class="card" style="width: 18rem; margin:13px;"></div>'); // creates the li element
  let imageCard = $('<img class="card-img-top mx-auto" style="width:30%;" alt="...">');
  imageCard.attr("src", poki.imageUrl);
  let body = $('<div class="card-body" style="text-align: center;"></div>');

  let pokeButton = $('<button type="button " class="btn btn-warning " data-toggle="modal" data-target="#exampleModal"></button>'); //Creates the Button element in the document
  pokeButton.append(document.createTextNode(poki.name));

// // bg-primary
// let bodyColor = $(".card-body").css("color", "red");
// body.css("color", "green");
// pokeButton.addClass("<style='background-color: #d88780;'>")

  pList.append(card);
  card.append(imageCard);
  card.append(body);
  body.append(pokeButton);


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
     // if (item.types.includes("grass")) {
     //   let green = css("color", "green");
     //        pokeButton.append(green);
     //      }
     // if (item.types.includes("grass")) {
     //        $(".card-body").css("color", "green");
     //      }
          // $listItem.css("color", "lightgreen");
          // $(this).css('color', 'red');
        // } else if (item.types.includes("fire")) {
        //   pokeButton.css("color", "red");
        // } else if (item.types.includes("psychic")) {
        //   pokeButton.css("color", "#FF69B4");
        // } else if (item.types.includes("poison")) {
        //   pokeButton.css("color", "purple");
        // } else if (item.types.includes("water")) {
        //   pokeButton.css("color", "blue");
        // } else if (item.types.includes("bug")) {
        //   pokeButton.css("color", "#3f000f");
        // } else if (item.types.includes("rock")) {
        //   pokeButton.css("color", "#BC8F8F");
        // } else if (item.types.includes("flying")) {
        //   pokeButton.css("color", "#2F4F4F");
        // } else if (item.types.includes("electric")) {
        //   pokeButton.css("color", "gold");
        // } else if (item.types.includes("ice")) {
        //   pokeButton.css("color", "#4169E1");
        // } else if (item.types.includes("ghost")) {
        //   pokeButton.css("color", "#8B008B");
        // } else if (item.types.includes("ground")) {
        //   pokeButton.css("color", "#D2B48C");
        // } else if (item.types.includes("fairy")) {
        //   pokeButton.css("color", "#EE82EE");
        // } else if (item.types.includes("steel")) {
        //   pokeButton.css("color", "#708090");
        // }
     if (item.types.includes("grass")) {
               $(".modal-header").css("color", "green");
               // $listItem.css("color", "lightgreen");
               // $(this).css('color', 'red');
             } else if (item.types.includes("fire")) {
               $(".modal-header").css("color", "red");
             } else if (item.types.includes("psychic")) {
               $(".modal-header").css("color", "#FF69B4");
             } else if (item.types.includes("poison")) {
               $(".modal-header").css("color", "purple");
             } else if (item.types.includes("water")) {
               $(".modal-header").css("color", "blue");
             } else if (item.types.includes("bug")) {
               $(".modal-header").css("color", "#3f000f");
             } else if (item.types.includes("rock")) {
               $(".modal-header").css("color", "#BC8F8F");
             } else if (item.types.includes("flying")) {
               $(".modal-header").css("color", "#2F4F4F");
             } else if (item.types.includes("electric")) {
               $(".modal-header").css("color", "gold");
             } else if (item.types.includes("ice")) {
               $(".modal-header").css("color", "#4169E1");
             } else if (item.types.includes("ghost")) {
               $(".modal-header").css("color", "#8B008B");
             } else if (item.types.includes("ground")) {
               $(".modal-header").css("color", "#D2B48C");
             } else if (item.types.includes("fairy")) {
               $(".modal-header").css("color", "#EE82EE");
             } else if (item.types.includes("steel")) {
               $(".modal-header").css("color", "#708090");
             }
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
    showDetails : showDetails,
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
