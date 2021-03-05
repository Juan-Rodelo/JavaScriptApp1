

let pokemonRepository = (function(){
  let pokemonList = [
    {name:'Pidgeot', height:1.5 , types: 'Flying'},
    {name:'Arbok', height: 3.5, types: 'poison'},
    {name:'Poliwhirl', height:1, types:'water'},
    {name:'Sandshrew', height:0.6, types:'ground'}
  ];
function add(pokemon){
  pokemonList.push(pokemon);
}
function getAll(){
  return pokemonList;
}
return {
    getAll: getAll,
    add: add
  };
})();

//To pass a new poki a need to make it into an object to push it into the array
let Pidgey = {
  name:'Pidgey',
  height:0.3 ,
  types: 'Flying'
};

pokemonRepository.add(Pidgey);
pokemonRepository.getAll().forEach(function(poki) {
  document.write('<h3>' + ' ' + poki.name + ' ' + poki.height + ' ' + poki.types + '</h3>');
});


// function getPoki (poki) {
// document.write(poki.name + poki.height + poki.types);
// }
// pokemonRepository.getAll().forEach(getPoki);
// Another way to do the forEach function
