# Comprehensive Guide to Setting Up and Understanding the Fetch Data Submission Solution

## Overview

This README outlines the process for setting up a JavaScript-based solution for submitting user data (name and email) to a backend server using `fetch()`. The solution leverages a local `JSON Server` to mimic the behavior of a real backend. This guide will walk you through the necessary steps to set up your environment, interact with the provided code, and understand how everything works together.

### Key Features of the Solution:
- **Event Listener**: Listens for a form submission event, grabs user data (name and email), and sends it to the server using the `submitData` function.
- **Feedback Function**: After receiving a response from the server, displays user data on the screen, including a delete button for the user to remove the data.
- **Error Handling**: Catches and handles errors during the fetch request, appending error messages to the DOM.

---

## Table of Contents
1. [Environment Setup](#environment-setup)
2. [File Structure](#file-structure)
3. [Installing JSON Server](#installing-json-server)
4. [Starting JSON Server](#starting-json-server)
5. [Opening the Application](#opening-the-application)
6. [Understanding the Code](#understanding-the-code)
7. [Testing and Interacting with the Code](#testing-and-interacting-with-the-code)
8. [Conclusion](#conclusion)

---

## Environment Setup

Before you can use the provided solution, you need to install the necessary dependencies and set up the environment. This solution uses `JSON Server` to mimic a backend API for storing and retrieving user data.

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
  
### Installing Dependencies

1. **Install JSON Server Globally**:  
   To install `JSON Server`, run the following command in your terminal:
   ```bash
   npm install -g json-server
   ```

   This will install `json-server` globally, making it available anywhere on your system.

   With the command above, you should now be able to spin up a mock server from any directory on your computer. Alternatively, if you remove the -g option from this command but are in a folder with a package.json file, json-server will be added as a dependency in the file.

        Note: For users of the Live Server VSCode extensionLinks to an external site., you'll need to do a bit of extra configuration so that the json-server plays nicely with Live Server in future lessons. Follow the steps in this gistLinks to an external site. (you'll only need to do this once), then come back to this lesson.


2. **Create a Database File**:  
   Ensure you have a `db.json` file in your project directory. This file will hold the data that the JSON server will serve.
   To create `db.json`, the file that will act as our data storage, run:
   ```bash
   touch db.json
   ```
   
   Copy and paste the following to the `db.json` and save `Ctrl + s`:
   ```
   {
        "users": [
            {
            "id": "1",
            "name": "James",
            "email": "james@gmail.com"
            }
        ]
    }
    ```

3. **Run JSON Server**:  
   In the terminal, navigate to the folder containing your `db.json` file and start the JSON server:
   ```bash
   json-server --watch db.json
   ```

   The server will start running on `http://localhost:3000`, and you will be able to access your resources like `http://localhost:3000/users`.

---

## File Structure

Here's a basic overview of the file structure for the project:

```
/project-folder
  ├── index.html         # The HTML file that the user interacts with
  ├── index.js           # JavaScript file containing the logic for submitting data and handling feedback
  ├── db.json            # The file used by JSON Server to store data
  └── README.md          # This file
```

---

## Starting JSON Server

Once you have `JSON Server` installed globally, navigate to the directory containing the `db.json` file in your terminal and run the following command to start the server:

```bash
json-server --watch db.json
```

This will start the JSON Server on `http://localhost:3000`, and it will "watch" any changes made to `db.json` to simulate a real backend.

### Accessing the Server

You can view the available endpoints in the terminal once the server is running, such as:
- `http://localhost:3000/users` (this is where user data will be stored)

You can also open this URL directly in a browser to see the data in the database.

---

## Opening the Application

### Opening index.html in the Browser

- **On Mac**:  
  Open the terminal, navigate to the folder containing `index.html`, and run:
  ```bash
  open index.html
  ```

- **On Windows**:  
  Navigate to the folder containing `index.html` in File Explorer and double-click it. This will open it in your default browser.

Alternatively, you can drag the `index.html` file directly into your browser.

If using WSL(Windows Subsystem for Linux), You can most conveniently open `index.html` file in your browser by running the following command from your terminal:
  ```
  explorer.exe index.html
  ```

---

## Understanding the Code

The main functionality of this project revolves around submitting data via a form, sending that data to the server with `fetch()`, and displaying the server’s feedback. Below is an overview of how the code works.

### Event Listener and Form Submission

In `index.js`, an event listener is added to a form element:

```js
const formElement = document.querySelector('form');

formElement.addEventListener('submit', (event) => { // Pass event as an argument to the callback(event listener).
  event.preventDefault();
  const user_name = event.target.userName.value; // Use event's target property, to acces username(the input has the name atribute userName) and obtain its value.
  const user_email = event.target.userEmail.value;
  submitData(user_name, user_email); // Call submitData function.
});
```

We could also target the input field directly(by their id's) as so:
```js
const formElement = document.querySelector('form');

formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    const user_name = formElement.querySelector('input#userName');
    const user_email = formElement.querySelector('input#userEmail');

    let userName = user_name.value;
    let userEmail = user_email.value;

    submitData(userName, userEmail) // call submitData function
}) 
```

- **What Happens**: When the form is submitted, the event listener captures the event, prevents the default form submission behavior, and grabs the name and email input values. It then calls the `submitData()` function with these values as arguments. I.e. submitData(userName, userEmail).

### Sending Data with `submitData`

The `submitData` function sends the form data to the server:

```js
function submitData(usersName, usersemail) {
  const formData = {
    name: usersName, 
    email: usersEmail
  };

  const configurationObject = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(formData),
  };

  return fetch('http://localhost:3000/users', configurationObject)
    .then((response) => response.json())
    .then((returnedObject) => serverFeedback(returnedObject))
    .catch((error) => alert('Error: ' + error.message));
}
```
Observe that we are calling serverFeedback function from the second then(where we 'do something' with the data we retrieve from the 'database'- our JSON server particularly db.json).

- **Method**: The `fetch()` method is used to send a `POST` request to `http://localhost:3000/users`.
- **Headers**: The request headers specify that the body will contain JSON and that the server should return JSON.
- **Body**: The form data (`usersName` and `usersEmail, and their keys nsme and email`) is stringified and included in the body of the request.
- **Handling the Response**: After sending the data, `.then()` is used to process the response and extract the returned data.

### Feedback Function

Once the data is submitted successfully, the `serverFeedback()` function creates a `div` to display the user's data:

```js
function serverFeedback(returnedObjectData) { 
  const serverUserDetails = document.createElement('div'); 
  serverUserDetails.id = 'savedUserDetails'; 
  const userName = document.createElement('p');
  userName.id = 'savedUserName';
  userName.innerText = returnedObjectData.name;
  const userEmail = document.createElement('p');
  userEmail.id = 'savedUserEmail';
  userEmail.innerText = returnedObjectData.email;
  
  serverUserDetails.appendChild(userName); 
  serverUserDetails.appendChild(userEmail);

  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = () => deleteSavedDetails(returnedObjectData.id);
  serverUserDetails.appendChild(deleteButton);

  document.body.appendChild(serverUserDetails);
}
```

- **UI Update**: A `div` with the returned user data (`name` and `email`) is created and appended to the document body. A delete button is also created that, when clicked, triggers the `deleteDetails()` function.

### Deleting Data

The `deleteDetails()` function allows the user to remove their saved data:

```js
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
```
We could also include the configurationObject directly after our URL as so:
```js
function deleteSavedDetails(id) {
  fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
    .then(() => {
      document.getElementById('savedUserDetails').remove();
      alert("Records succesfully deleted from the database!");
    })
    .catch((error) => console.error('Error deleting data:', error));
}
```
Notice that unlike POST, we do not need to specify headers(Content-Type, and Accept) in our configurationObject.

- **What Happens**: A `DELETE` request is sent to `http://localhost:3000/users/{id}`, and if successful, the user's data is removed from the DOM.

---

## Testing and Interacting with the Code

### Accessing Functions via Web Dev Tools

You can interact with the `submitData()` function directly in your browser's developer tools (Console tab) after loading `index.html` in the browser.

1. Open the **Developer Tools** by pressing `F12` or `Cmd + Option + I` on Mac, or `Ctrl + Shift + I` on Windows.
2. Navigate to the **Console** tab.
3. Type `submitData("John Doe", "john.doe@example.com")` and hit Enter to test submitting data.

The browser will make the request to the JSON Server and you should see the returned data logged in the console and displayed on the page.

---

## Conclusion

This solution demonstrates how to send form data to a server using JavaScript's `fetch()` method, handle server responses, and update the DOM dynamically without refreshing the page. By utilizing `JSON Server`, we simulate a backend API for the purpose of development and testing.

### Key Takeaways:
- **Handling form submissions** with JavaScript event listeners.
- **Sending data via `fetch()`** using `POST` requests.
- **Processing server responses** and updating the DOM accordingly.
- **Error handling** for failed requests.
- **Deleting data via `fetch()`** using `DELETE` requests.
- **Setting up a local JSON server** to mimic a backend.

With this setup, you can further expand the solution to include more features, such as additional form fields or handling different types of requests (e.g., `PUT`, `PATCH`).