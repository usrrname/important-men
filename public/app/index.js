'use strict';
//collect and display all records

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}
const url = 'http://localhost:3000/questions/';

fetch(url).then((response) => {
  return response.json();
})
  .then( (data) => { 
    const ul = document.getElementById('root');
    let div = createNode('div');

   for (var index = 0; index < data.length; index++) {
     let name = data[index].name,
        email = data[index].email,
        comment = data[index].comments, 
        nextLine = '<br>',
        str = '';
        str += (nextLine + name + nextLine + email + nextLine + comment + nextLine);
        div.innerHTML += str;
   }
   append(ul, div);
  })
.catch((error) => {
  console.log(error);
})