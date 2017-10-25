'use strict';
//collect and display all records

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in the parameters
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}
const askUrl = 'http://localhost:3000/questions/ask/';
const qUrl = 'http://localhost:3000/questions/';
const askForm = document.getElementById('ask-form');

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
  if (res.status(200)) {
  let div = createNode('div');
  div.innerHTML = "Thanks for submitting your question."
  append(askForm, div);
  }
});
}

const getAll = () => {
fetch(qUrl).then((response) => {
  return response.json();
})
  .then( (data) => { 
    console.log(data);
    const root = document.getElementById('root');
    let div = createNode('div');
    div.className = 'results';
    let label1 = createNode('label');
    let label2 = createNode('label');
    let from = createNode('label');
   for (var index = 0; index < data.length; index++) {
     let name = data[index].name,
      email = data[index].email,
      comment = data[index].comment, 
      title = data[index].title,
      advice = data[index].advice,
      br = '<br>',
      str = '';
        str += (br + 'Question: ' + comment 
                + br + 'From: ' + name 
                + br + 'TLDR: ' + title 
                + br + 'Answer: ' + advice + br);
        div.innerHTML += str;
      }
      append(root, div);
    })
.catch((error) => {
  console.log(error);
})
}