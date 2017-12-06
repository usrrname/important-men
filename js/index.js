'use strict';
//collect and display all records

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}
const askUrl = 'https://important-men.herokuapp.com/questions/ask/';
const qUrl = 'https://important-men.herokuapp.com/questions/';
const askForm = document.getElementById('ask-form');
const root = document.getElementById('root');

const postQ = () => {
fetch(askUrl, {
	method: 'post',
	body: JSON.stringify({
    name: document.getElementById('firstname').value,
		email: document.getElementById('email').value,
    message: document.getElementById('comment').value,
})
}).then((err, res) => {
  if (err){
    throw err;
  }
});
}

//let hasAppended = false;

const getAll = () => {
fetch(qUrl).then((response) => {
 return response.json();
})
  .then( (data) => { 
    // if (hasAppended = false){
    //   hasAppended = true;
    let div = createNode('div');
    let heading = createNode('div');
    let userQ = createNode('p');
    let name = createNode('p');
    let advice = createNode('p');
    let str = '';
    const root = document.getElementById('root');

     for (var index = 0; index < data.length; index++) {
      heading.innerHTML = data[index].questionTitle;
      userQ.innerHTML = data[index].comment;
      name.innerHTML = data[index].name;
      advice.innerHTML = data[index].advice;
      let br = "<br>";

      br += heading.innerHTML + br + userQ.innerHTML + br
                + 'from ' + name.innerHTML + br
                + 'Matthew says: ' + advice.innerHTML + br;
      div.innerHTML += br;
      }
    append(root, div)
    }
    )
.catch((error) => {
  console.log(error);
})
}