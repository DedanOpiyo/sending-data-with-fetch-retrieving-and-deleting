// an event listener to the submit event that occurs wheb submit button is clicked.
const formElement = document.querySelector('form');

formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    const user_name = formElement.querySelector('input#userName');
    const user_email = formElement.querySelector('input#userEmail');

    let userName = user_name.value;
    let userEmail = user_email.value;

    submitData(userName, userEmail) // call submitData function
})

// submitData, a function that accepts user's name and email, and includes them in the body of POST request through the fetch() function.
function submitData(usersName, usersEmail) {
  const formData = { // formData
      name: usersName, 
      email: usersEmail
  };
  console.log("formData:", formData)

  // configurationObject
  const configurationObject = {
      method: "POST", // HTTP verb.
      headers: { // headers.
          "Content-Type": "application/json",
          "Accepts": "application/json"
      },
      body: JSON.stringify(formData) // body. Strigify formdata before submission.
  }

  // return fetch().
  return fetch('http://localhost:3000/users', configurationObject).then(res => res.json()).then(data => serverFeedback(data))
  .catch(error => console.log(error.message)); 
}

// Provide feedback to the user.

function serverFeedback(returnedObjectData) { // userFeedback is called from submitData's second .then method with data from the server.
  const serverUserDetails = document.createElement('div'); // create div element to show saved data.
  serverUserDetails.id = 'savedUserDetails'; // assign it an id.
  const userName = document.createElement('p');
  userName.id = 'savedUserName';
  userName.innerText = returnedObjectData.name; // set the innerText/Add the saved name to the relevant paragrapg we created. 
  const userEmail = document.createElement('p');
  userEmail.id = 'savedUserEmail';
  userEmail.innerText = returnedObjectData.email;
  
  serverUserDetails.appendChild(userName); // add our paragrapg with id of savedUserName to the div we created.
  serverUserDetails.appendChild(userEmail);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = () => deleteSavedDetails(returnedObjectData.id);// call deleteSavedDetails to Delete the saved user details.
  serverUserDetails.appendChild(deleteButton);

  document.body.appendChild(serverUserDetails);  // Append the div we created to the document's body.
}

// Delete user data from the server.
function deleteSavedDetails(id) {
  const configurationObject = {
     method: "DELETE"
  };
  fetch(`http://localhost:3000/users/${id}`, configurationObject)
    .then(() => {
      document.getElementById('savedUserDetails').remove();
      alert("Records succesfully deleted from the database!");
    })
    .catch((error) => {
      alert('Error deleting data:', error);
      console.error('Error deleting data:', error)
  });
}
