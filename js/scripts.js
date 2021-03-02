let pokemonList = [
  {name:'Pidgeot', height:1.5 , types: 'Flying'},
  {name:'Arbok', height: 3.5, types: 'poison'},
  {name:'Poliwhirl', height:1, types:'water'},
  {name:'Sandshrew', height:0.6, types:'ground'}
];

let string = '<h3>';
let stringClose= '</h3>';
//Not sure if it's the smartest way to do this but allowys to add them to the document.write

for (let i = 0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 3) {
    document.write(string + pokemonList[i].name + pokemonList[i].height + 'Woa that\'s big!' + stringClose);
  }
  else {
  document.write(string + pokemonList[i].name + pokemonList[i].height + stringClose);
  }
}
