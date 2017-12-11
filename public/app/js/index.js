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
 return response.json(response);
})
  .then( (data) => { 
    if (hasAppended == false){
      hasAppended = true;
    let questions = data;
    return questions.map((question) =>{
      let div = createNode('section');
      div.className = "results";
      const root = document.getElementById('root');
      let heading = createNode('div');
      heading.innerHTML = `${question.questionTitle}`;
      heading.className = "headline";
      let userQ = createNode('p');
      userQ.innerHTML = `${question.comment}`;
      userQ.className = "longQuestion";
      let name = createNode('p');
      name.innerHTML = "sent by " + `${question.name}`;
      name.className = "sender";
      let advice = createNode('div');
      advice.innerHTML =  `${question.advice}`;
      advice.className = "answer";
      let signature = createNode('p');
      signature.className = "sig";
      signature.innerHTML = "Matt";

      append(root, div);
      append(div, userQ);
      append(userQ, name);
      append(div, advice);
      append(advice, signature);
    })
    }})
.catch((error) => {
  console.log(error);
})
}
