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

postQ() = 
fetch(askUrl, {
	method: 'post',
	body: JSON.stringify({
    name: document.getElementById('firstname').value,
		email: document.getElementById('email').value,
		answer: document.getElementById('comment').value
}).then((err, res) => {
  if (err){
    throw err;
  }
  if (res.status(200)) {
  let div = createNode('div');
  div.innerHTML = "Thanks for submitting your question."
  append(askForm, div);
  }
})
});


getAll() =
fetch(qUrl).then((response) => {
  return response.json();
})
  .then( (data) => { 
    const ul = document.getElementById('root');
    let div = createNode('div');
   for (var index = 0; index < data.length; index++) {
     let name = data[index].name,
        email = data[index].email,
        comment = data[index].comment, 
        nextLine = '<br>',
        str = '';
        str += (nextLine + name + nextLine + email + nextLine + comment + nextLine);
        div.innerHTML += str;
   }
   append(ul, div);
  })
.catch((error) => {
  console.log(error);
});