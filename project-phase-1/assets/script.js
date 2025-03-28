document.addEventListener("DOMContentLoaded", () => {


/*   function getUser(u) {
    return fetch('http://localhost:3000/users')
      .then(respo => respo.json())
      .then(users => {
        console.log('Fetched users:', users); // Log the users to verify what you're getting
  
        const user = users.find(addNewUser => addNewUser.email === u.email && addNewUser.password === u.password);
        if (user) {
          return user;  // Return the found user object
        } else {
          throw new Error('User not found or incorrect credentials');
        }
      })
      .catch(error => {
        console.log('Error:', error);  // Log the error to help debug
        return null;  // Return null if an error occurs or no user found
      });
  }

  async function main() {
    const userCredentials = { email: 'alice@example.com', password: 'password123' };
    let useruser;
  
    try {
      useruser = await getUser(userCredentials);
      console.log('useruser (inside async):', useruser);
    } catch (error) {
      console.log('Error:', error);
    }
  
    console.log('outside useruser (after await):', useruser); // Now it works!
  }
  
  main(); // Run the async function */





  const mainDiv = document.getElementById('mainDiv');

  const apiUrl = 'http://localhost:3000';
  let receiversId; // Message recipient.
  let chosen_receicer_Id; // Receiver id
  let LogedInuserObjectVar;
  const signUpForm = document.getElementById('signUpForm');
  const showSignUp = document.getElementById('signUp');
  const showSignIn = document.getElementById('signIn');

  const loginForm = document.getElementById('loginForm');

  const toggleSignUp = document.getElementById('toggleSignUp');
  const toggleSignIn = document.getElementById('toggleSignIn');

  const usersList = document.getElementById('usersList');
  const messagesHolder = document.getElementById('messagesHolder');
  const messageDiv = document.getElementById('messageDiv');
  const holdImages = document.getElementById('holdImages');
  const holdUserlist = document.getElementById('holdUserlist');

  const galleryHolder = document.getElementById('galleryHolder');
  const galleryDiv = document.getElementById('galleryDiv');
  

  // Create element to navigate user to signin.
  let navigateForward = document.createElement('div');
  navigateForward.id = 'navigateForward'
  let signInLink = document.createElement('span');
  signInLink.id = 'signInLink'
  signInLink.innerText = ' signin'
  navigateForward.innerText = `Don't have an account?`
  
  navigateForward.appendChild(signInLink);
  toggleSignIn.appendChild(navigateForward);

  signInLink.addEventListener('click', () => {
      showSignUp.style.display = 'none'
      showSignIn.style.display = 'flex'
  })

  // Create element to navigate user back to signup.
  let navigateBack = document.createElement('div');
  navigateBack.id = 'navigateBack'
  let signUpLink = document.createElement('span');
  signUpLink.id = 'signUpLink'
  signUpLink.innerText = ' signup'
  navigateBack.innerText = `Don't have an account?`
  navigateBack.appendChild(signUpLink);
  toggleSignUp.appendChild(navigateBack);
  
  signUpLink.addEventListener('click', () => {
      showSignIn.style.display = 'none'
      showSignUp.style.display = 'flex'
  })
  
  // If User is redirected to Sign Up From loginForm event.
  function signUp(redirectFromLogin) {
    showSignIn.style.display = 'none'
    showSignUp.style.display = 'flex'
    
    if (redirectFromLogin === 'redirectFromLogin') {
      console.log('REDIRECTED FROM LOGIN')
    }
  }

  // 1. Sign Up
  signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const addNewUser = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      gallery: [],
    };
    
    // Using async, and await, make user accessible from doesTheUserExist function.
    async function awaitCredentialCheck(addNewUser) {;
      let doesTheUser_Exist;
    
      try {
        doesTheUser_Exist = await doesTheUserExist(addNewUser);
        console.log('USER (inside async):', doesTheUser_Exist);
      } catch (error) {
        console.log('Error:', error);
      }
    
      console.log('outside USER (after await):', doesTheUser_Exist); // log object outside
      if (doesTheUser_Exist) { // If user has an accout, let them Login/Signin.
        alert(`You already Have an Account, Signin!`);
        signIn(doesTheUser_Exist) // Call signin with user details.
        return;
      } else {
        // Sign Up the user.
        fetch(`${apiUrl}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(addNewUser),
        })
          .then(response => response.json())
          .then(user => {
            //signIn(user) // Redirect the user to signIn once they are registered. signIn will direct them elsewhere, else return them back to signup if details don't match. Checks is conducted in both functions.
            alert(`Sign Up Successful, ${user.username}!`);
            signIn(user) 
          })
          .catch(error => console.log('Error:', error));
      }
    }
    
    awaitCredentialCheck(addNewUser); // Run the async function

  });

  // CEntral point for signUp and SigIn chech. Returns USERS object.
  // GET users and find User attempting to sign up.
  function doesTheUserExist(addNewUser) { 
    return fetch(`${apiUrl}/users`).then(res => res.json()).then(existingUsers => {
      console.log(existingUsers)
      console.log(typeof existingUsers)
      console.log('EMAIL', addNewUser.email)
      console.log('PASWORD', addNewUser.password)
      const checkUserExistance = existingUsers.find((user) => { // Use find Array Method, to check if user exist.
        return user.email === addNewUser.email && user.password === addNewUser.password 
      })
      
      if (checkUserExistance) {
        console.log('found', checkUserExistance)
        return checkUserExistance // Return found user.
      } else {
        console.log('User not found(Signup)') // Otherwise,log outcome.
        return null;
      }
    }).catch(error => console.log('Error:', error));
  } 

  // If User is redirected to Sign In/login From signUpForm event.
  function signIn(userDetails) {
    showSignUp.style.display = 'none';
    showSignIn.style.display = 'flex';
    
    if (userDetails) {
      document.getElementById('loginEmail').textContent = userDetails.email; // Set login UI with email if provided. 
      document.getElementById('loginPassword').textContent = userDetails.password;
    } else {
        console.log('REDIRECTED FROM SIGN UP.')
    }
  }

  // 2. Log In
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const inputedEmail = document.getElementById('loginEmail').value; // When the form is submitted, get input values.
    const inputedPassword = document.getElementById('loginPassword').value;

    const checkUser = {
      email: inputedEmail, // If user navigated to sign in, verify their details and sign them in.
      password: inputedPassword,
    };
    
    

    async function awaitCredentialCheck(checkUser) {// This will log the user object if found, or null if not found
      let doesTheUser_Exist;
    
      try {
        doesTheUser_Exist = await doesTheUserExist(checkUser); // Call doesTheUserExist to verify user details.
        console.log('USER OBJ SIGN IN (inside async):', doesTheUser_Exist);
      } catch (error) {
        console.log('Error:', error);
      }
    
      console.log('outsideUSER OBJ SIGN IN (after await):', doesTheUser_Exist); 
      if (doesTheUser_Exist) { 
        alert(`Welcome back, ${doesTheUser_Exist.username}!`);
        console.log(`PROCEDE!`); // Go Ahead with everything else.
          // Closure for our signedIn_User_Object.
        LogedInuserObjectVar = (function () {
          let userObject = null; // userObject is private.
          function setUser(object) { // Closure to  set the user object.
            userObject = object;
            console.log('User object set:', userObject);
          }
          function getUser() { // Closure to get the user object
            return userObject;
          }
          return { // Our closure returns an object containing setUser and getUser methods.
            setUser: setUser,
            getUser: getUser
          };
          })(); // Invoke
          console.log('LOGGED IN USER FUNCTION', LogedInuserObjectVar.setUser(doesTheUser_Exist))
          console.log("LOGGED IN USER FUNCTION ''", LogedInuserObjectVar)
          console.log('LOGGED IN USER FUNCTION GETUSER', LogedInuserObjectVar.getUser())
        goAhead(doesTheUser_Exist) // Call go agead function.
        return; // And the back and forth after succesful sign in.
      } else {
        alert(`User not found. Sign up if you haven't done so before.`)
        signUp('redirectFromLogin')
      }
    }
    
    awaitCredentialCheck(checkUser); // Run the async function with checkUser object.


    /* fetch(`${apiUrl}/users?email=${email}&password=${password}`) 
      .then(response => response.json())
      .then(users => {
        if (users.length) {
          alert(`Welcome back, ${users[0].username}!`);
          toggleVisibility('messageDiv');
          toggleVisibility('galleryDiv');
          toggleVisibility('groupDiv');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => console.log('Error:', error));
    }); */
  }) 
    /* function toggleVisibility(formId) {
        console.log(formId)
      } */

  // goAgead provide/distribute logged in user details across the app.

/*   // Closure for our signedIn_User_Object.
  const LogedInuserObjectVar = (function () {
  let userObject = null; // userObject is private.
  function setUser(object) { // Closure to  set the user object.
    userObject = object;
    console.log('User object set:', userObject);
  }
  function getUser() { // Closure to get the user object
    return userObject;
  }
  return { // Our closure returns an object containing setUser and getUser methods.
    setUser: setUser,
    getUser: getUser
  };
  })(); // Invoke
  console.log('LOGGED IN USER FUNCTION', LogedInuserObjectVar.setUser({ name: 'John', age: 30 }))
  console.log('LOGGED IN USER FUNCTION', LogedInuserObjectVar)
  console.log('LOGGED IN USER FUNCTION GETUSER', LogedInuserObjectVar.getUser()) */

  usersList.style.display = 'none'
  messagesHolder.style.display = 'none'
  galleryHolder.style.display = 'none'
  galleryDiv.style.display = 'none'
  document.getElementById('groups').style.display = 'none'
  mainDiv.style.display = 'none'
  messageDiv.style.display = 'none'

  function goAhead(doesTheUser_Exist) { // goAgead is called from signIn with logged in user details.
    LogedInuserObjectVar.setUser(doesTheUser_Exist); // Set the user object when the user logs in.

    console.log('logged in User-OBJECT:', doesTheUser_Exist.id)
    showSignUp.style.display = 'none';
    showSignIn.style.display = 'none';
    //mainDiv.style.display = 'flex'
    //document.getElementById('messageDiv').style.display = 'none'
    document.getElementById('galleryDiv').style.display = 'flex'
    document.getElementById('groupDiv').style.display = 'flex'  
    console.log('AT GO-AHEAD', doesTheUser_Exist)

    usersList.style.display = 'flex'
    messagesHolder.style.display = 'flex'
    galleryHolder.style.display = 'flex'
    /* galleryDiv.style.display = 'none'
    groups.style.display = 'none' */
    mainDiv.style.display = 'none'
    messageDiv.style.display = 'none' // sendFirstMessage FUNCTION sets it to flex.
    
    getGalleryImages(doesTheUser_Exist.id) // Calling getGalleryImages
    
    return doesTheUser_Exist;
  }
  //goAhead('goAhead Called For display')

  // GET Messages for a particular user.
  async function messagesPerUser(user) {
    const userId = Number(user.id.trim());
    const user_Id = user.id;
    const username = user.username
    // Loop through the object, hetting its keys
    //let userId = user.id;
    console.log('USERLIST CLICKED -AT MESSAGEPERUSER', userId)
    fetch(`${apiUrl}/messages`).then(res => res.json()).then(messages => { // FIX messages.id `${doesTheUser_Exist.id`}
      console.log('messages', messages)
      /* messages.forEach(message => {
        const messages = document.getElementById('messageDiv')
        const parentMessages = document.createElement('div')
        parentMessages.id = 'parentMessages'
        parentMessages.innerHTML = message;
        const childMloggedInUserdetailsessages = document.createElement('div')
        childMessages.id = 'childMessages'
    
        parentMessages.appendChild(childMessages)
        messages.appendChild(parentMessages)
      }); */
      //userId = Number(userId.trim()); // Ensure userId is number before comparison
      const filtered_UserMessages = messages.filter(msge => msge.senderId === userId || msge.receiverId === userId || msge.senderId === user_Id || msge.receiverId === user_Id); // Filter messages array for the userId.
      console.log('MESSAGES FILTERED FOR PASSED USER-ID:', typeof userId)
      let  awaitMessageObjectOnFirstChat; 

        setTimeout(async () => { // WAIT for sometime before logging the filtering result.
          console.log('FILTERED USERMESSAGES:', filtered_UserMessages)
          if (filtered_UserMessages.length === 0) { // If there are no messages found, then recommend beggining a conversation.
            console.log('INVOKING FIRST MESSAGE CALLED ----', user)
            alert(`No prior conversations with ${user.username}! Send them first message.`)
            awaitMessageObjectOnFirstChat = await sendFirstMessage(user) // Invoke sendFirstMessage. We expect a message object.
          /* // create a div to inform the user that no conversation exist yet.
          const guidingHeader_a = document.createElement('div');
          guidingHeader_a.id = 'guidingHeader_a'
          guidingHeader_a.textContent = `You have no conversation with ${username} yet! Send first message`

          messagesHolder.appendChild(guidingHeader_a) // Append guiding header to the ui(messagesHolder) */
          } 
        }, 200);

      const filteredUserMessages = filtered_UserMessages || [awaitMessageObjectOnFirstChat] // All should be arrays.

      //userMessages.sort((early, late) => new Date(early.timestamp) - new Date(late.timestamp)); // Sort the messages by date.
      filteredUserMessages.sort((a, b) => a.timestamp - b.timestamp); // Sort the messages by date.
      messagesHolder.innerHTML = ''; // Clear messages holding div With each click of the relevant users
      filteredUserMessages.forEach(mssage => {
        const guidingHeader = document.createElement('div');
        guidingHeader.id = 'guidingHeader'
        guidingHeader.textContent = `Your Chats with ${username}`
        const messageThread = document.createElement('div'); // messageThread
        messageThread.id = 'messageThread'
        //CREATE messageDiv FOR every messageThread so users can 
        const messageDiv = document.createElement('messageDiv');
        messageDiv.id = 'messageDiv'; 
        const messageDivLabel = document.createElement('messageDivLabel'); 
        messageDivLabel.innerText = 'Send Message'; // innerText
        const messageDivForm = document.createElement('form');
        messageDivForm.id = 'messageDivForm'; 
        const messageDivFormInput = document.createElement('input');
        messageDivFormInput.id = 'receiverId'; 
        messageDivFormInput.placeholder = 'Receiver ID'; 
        messageDivFormInput.style.display = 'none'
        const messageDivFormTextarea = document.createElement('textarea');
        messageDivFormTextarea.id = 'messageContent'; 
        messageDivFormTextarea.placeholder = `Message ${username}`;
        const messageDivFormButton= document.createElement('button');
        messageDivFormButton.type = 'submit';
        messageDivFormButton.textContent = "Click Me";  
        // Join up the form
        messageDivForm.appendChild(messageDivFormInput)
        messageDivForm.appendChild(messageDivFormTextarea)
        messageDivForm.appendChild(messageDivFormButton)
        messageDiv.appendChild(messageDivForm) // append form and label to messageDiv
        messageDiv.appendChild(messageDivLabel)

        // Append MessageDiv to messageThread // messageThread.appendChild(messageDiv)

    
        // CREATE me_ssages to display Messages
        const me_ssages = document.createElement('div'); // Create element dynamically, that hold messages. 
        me_ssages.classList.add('message'); // Add a classlist of message to each.
        const me_ssagesSendReceiver = document.createElement('div'); 
        me_ssagesSendReceiver.innerText = `${mssage.senderId === userId ? 'You' : username}`
        const me_ssagesMessage = document.createElement('div'); 
        me_ssagesMessage.innerText = `${mssage.message}`
       const me_ssagesSmallDate = document.createElement('div'); 
       me_ssagesSmallDate.innerText = `${new Date(mssage.timestamp).toLocaleString()}`
       me_ssagesMessage.appendChild(me_ssagesSmallDate) // Message date inside Message div
       me_ssagesSendReceiver.appendChild(me_ssagesMessage) // Message div(holds actual message) inside Sender/Receiver header
       me_ssages.appendChild(me_ssagesSendReceiver) // Sender/Receiver header inside the Message holding content
      
       // Append MessageDiv to messageThread
       messageThread.appendChild(me_ssages);

      // Append MessageDiv to messageThread
      messageThread.appendChild(messageDiv)


/* 
      messageDivFormTextarea.addEventListener('input', function() {
        // Show the options when the user starts typing
        if (messageInput.value.trim() !== '') {
          optionsContainer.style.display = 'flex';  // Show options if there is any text
        } else {
          optionsContainer.style.display = 'none';  // Hide options if input is empty
        }
      }); */
    
      const editOptions = document.createElement('div'); 
    editOptions.id = 'editOptions'; 
    editOptions.innerHTML = `     
    <div class="editOtions" id="editOtions">
      <div id="editOption">Edit</div>
      <div id="deleteOption">Delete</div>
    </div>`;

    messageDivFormTextarea.addEventListener('input', function() {
      // Show the options when the user starts typing
      if (messageInput.value.trim() !== '') {
        setTimeout(() => {
          // PATCH
          optionsContainer.style.display = 'flex';  // Show options if there is any text
          document.getElementById('editOption').addEventListener('click', () => {
            fetch(`${apiUrl}/messages/${mssage.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                message: `${messageDivFormTextarea.value}` // access text from textarea input value.
              })
            })
            .then((res) => res.json())
            .then((data) => {
              alert(`Message Edited Succesfully`)
              console.log('message updated', data)
            })
          })
            // DELETE
            document.getElementById('deleteOption').addEventListener('click', () => {
              fetch(`${apiUrl}/messages/${mssage.id}`, {
                  method: 'DELETE',
              })
              .then(response => response.json())
              .then(data => {
                  //document.getElementById('message1').remove();
                  console.log("Message deleted successfully:", data);
              })
              .catch(error => {
                  console.error("Error deleting message:", error);
              });
            })
          }, 10);  // Delay to allow DOM update first. 
      } else {
        optionsContainer.style.display = 'none';  // Hide options if input is empty
      }
    });





      messagesHolder.appendChild(guidingHeader) // Append guiding header to show the user who they are chatting with.
      messagesHolder.appendChild(messageThread) // Append messageThread to existing element(messagesHolder)
      messagesHolder.appendChild(editOptions) // Append messageThread
      
         //messageDiv.style.display = 'flex' 
      })

  
    }).catch(error => console.log('Error:', error));
  }
  //messagesPerUser(2) // TEST with random user id

  // called from messagesPerUser function above, if no conversations exist.
  async function sendFirstMessage(user) {
    console.log('SENDINDING FIRST MESSAGE CALLED ----', user)
    messagesHolder.innerHTML = ''; // Clear messages holding div With each click of the relevant users
    signedIn_User_Object = LogedInuserObjectVar.getUser(); // Acess User Object.
    messageDiv.style.display = 'flex' // ENSURE IT WAS NONE BEFORE
    messageDiv.style.display = 'flex'
    const message_TextArea = document.getElementById('messageContent') // Acess textarea of message input.
    message_TextArea.placeholder = `Message ${user.username}` // Change its placeholder to reflect person being messaged/chated.
    
    // POST message
    messageDiv.addEventListener('click', (event) => { // There is only one such form.
      //event.preventDefault() // PREVENTDEFAULT
      console.log('event target', event.target.parentElement.parentElement)
      // event.target // Optionally Use event target
      if(signedIn_User_Object.id) {console.log('Sender Noted')
      } else {'No sender identity'}

      if(user.id) {console.log('Receiver Noted')
      } else {'No valid recipient'}

      if(message_TextArea.value.length > 0) {console.log('Message Not Empty')
      } else { console.log('Cannot Send Empty Message')
        return // End for empty input.
      }

      fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: `${parseInt(signedIn_User_Object.id, 10)}`, // get logged in user id. ENSURE IS NOT UNDEFINED
          receiverId: `${parseInt(user.id, 10)}`,
          message: `${message_TextArea.value}`, // access text from textarea input value.
          timestamp: new Date().toISOString(),
        })
      })
      .then((res) => res.json())
      .then((data) => {
        alert(`Congrats, You send your fist message to ${user.username}`)
        console.log('CREATED MESSAGE:', data)
        console.log('CREATED MESSAGE:', typeof data)
        messageDiv.style.display = 'none' // ENSURE IT 'DISSAPEARS AS BEFORE AND APPEND CURRENTLY CREATED STRUCTURE TO PLACEHOLDER'

        if(data) { // If message created succesfully
          messageDiv.style.display = 'none'
          event.target.parentElement.parentElement.display = 'none'
          //messagesPerUser(user) // Recycle messaging UI by calling messagesPerUser back with user. 
          return data; // Will return message object.
        } 

        // DELETE these if above function works.
        /* // As we did with found chats, create the ui to reflect continuous chat.
        const guidingHeader = document.createElement('div');
        guidingHeader.id = 'guidingHeader'
        guidingHeader.textContent = `Your Chats with ${username}`
        const messageThread = document.createElement('div'); // messageThread
        messageThread.id = 'messageThread'
        //CREATE messageDiv FOR every messageThread so users can 
        const messageDiv = document.createElement('messageDiv');
        messageDiv.id = 'messageDiv'; 
        const messageDivLabel = document.createElement('messageDivLabel'); 
        messageDivLabel.innerText = 'Send Message'; // innerText
        const messageDivForm = document.createElement('form');
        messageDivForm.id = 'messageDivForm'; 
        const messageDivFormInput = document.createElement('input');
        messageDivFormInput.id = 'receiverId'; 
        messageDivFormInput.placeholder = 'Receiver ID'; 
        const messageDivFormTextarea = document.createElement('textarea');
        messageDivFormTextarea.id = 'messageContent'; 
        messageDivFormTextarea.placeholder = `Message ${username}`;
        const messageDivFormButton= document.createElement('button');
        messageDivFormButton.type = 'submit'; 
        // Join up the form
        messageDivForm.appendChild(messageDivFormButton)
        messageDivForm.appendChild(messageDivFormTextarea)
        messageDivForm.appendChild(messageDivFormInput)
        messageDiv.appendChild(messageDivForm) // append form and label to messageDiv
        messageDiv.appendChild(messageDivLabel)
    
        // Append MessageDiv to messageThread
        messageThread.appendChild(messageDiv)
    
    
        // CREATE me_ssages to display Messages
        const me_ssages = document.createElement('div'); // Create element dynamically, that hold messages. 
        me_ssages.classList.add('message'); // Add a classlist of message to each.
        const me_ssagesSendReceiver = document.createElement('div'); 
        me_ssagesSendReceiver.innerText = `${mssage.senderId === userId ? 'You' : username}`
        const me_ssagesMessage = document.createElement('div'); 
        me_ssagesMessage.innerText = `${mssage.message}`
       const me_ssagesSmallDate = document.createElement('div'); 
       me_ssagesSmallDate.innerText = `${new Date(mssage.timestamp).toLocaleString()}`
       me_ssagesMessage.appendChild(me_ssagesSmallDate) // Message date inside Message div
       me_ssagesSendReceiver.appendChild(me_ssagesMessage) // Message div(holds actual message) inside Sender/Receiver header
       me_ssages.appendChild(me_ssagesSendReceiver) // Sender/Receiver header inside the Message holding content
      
       // Append MessageDiv to messageThread
       messageThread.appendChild(me_ssages);
       // add a button for editing the message or deleting in messageThread.
    
         messagesHolder.appendChild(guidingHeader) // Append guiding header to show the user who they are chatting with.
         messagesHolder.appendChild(messageThread) // Append messageThread to existing element(messagesHolder)
         
         //messageDiv.style.display = 'flex' 
           //}) */
      })
      .catch(error => console.log('Error:', error))
    })
  }


  // Select User You want to send a message:

  // Central point for messageForm(sends message to a user) and messagesPerUser(shows messages for a user)
  // get relevant users
  async function getRelevantUsers(image, userId) { 
    return fetch(`${apiUrl}/users`).then(res => res.json()).then(existingUsers => { // Return Fetch.
      console.log('AT GETRELEVANTUSERS:', existingUsers)
      existingUsers.forEach(user => {
        console.log(user)
        const userList = document.createElement('div')
        userList.id = user.id
        userList.innerText = user.username;
        userList.className = 'userList'

        //messageDiv.style.display = 'none'

        if (String(userId).length < 5) { // Check if the length of the string is less than 5
          console.log('getRelevantUsers() called for image sharing:', image)
          // Aid sending image to selected receipient.
          userList.addEventListener('click', (e) => {
            e.preventDefault;
            console.log('USERLIST CLICKED FOR SHARE IMAGE', userId)
            chosen_receicer_Id = user.id// Avail the user to messageForm event habdler that sends message.
            signedIn_User_Object = LogedInuserObjectVar.getUser(); // Acess User Object.


            const timeStamp = new Date().toISOString();
            fetch(`${apiUrl}/sharedGallery`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                senderUsername: `${signedIn_User_Object.username || null}`,
                senderId: `${userId}`,
                receiverId: `${user.id}`,
                imagelink: `${imageURL}`,
                timestamp: `${timeStamp}`
              })
            })
            .then(response => response.json())
            .then(data => {alert('Image sent!')
              console.log(data)
            })
            .catch(error => console.log('Error:', error))
          })
          
          /* let hold_Images = e.target.parentElement
          hold_Images.addEventListener('mouseout', () => { // 
            imagesGallery.style.backgroundColor = 'blue';  // Change background color on hover
            //userList.remove()
          }); */
          holdUserlist.appendChild(userList) // append userList to galleryHolder
          return holdUserlist;
        } else {
          // Aid messaging.
          console.log('getRelevantUsers() called for Messaging', userList)
          userList.addEventListener('click', () => {
            console.log('USERLIST CLICKED', user.id)
            userList.style.display = 'flex'
            messagesPerUser(user) // Messahes will fetch Messages for a given/selected user.
            chosen_receicer_Id = user.id// Avail the user to messageForm event habdler that sends message.
          })

          userList.style.display = 'none'
          usersList.style.height = '4em'

          usersList.addEventListener('mouseover', () => {
            userList.style.display = 'flex'
            usersList.style.height = 'auto'
          })

          usersList.addEventListener('mouseout', () => {
            userList.style.display = 'none'
          })
          //usersList.appendChild(userList)
          messageDiv.appendChild(userList)
          document.getElementById('lists').appendChild(userList)
          //return  usersList;
        } 
      });
    }).catch(error => console.log('Error:', error));
  } 
  getRelevantUsers('Default Starter', 'default userId') // Invoke getRelevantUsers -pROVIDES Relevant users, friends etc.

  
    // 3. Send Message
    document.getElementById('messageForm').addEventListener('submit', (event) => {
      event.preventDefault();

      signedIn_User_Object = LogedInuserObjectVar.getUser(); // Acess User Object.
      const sendersId = signedIn_User_Object.id;
      console.log('AT MESSAGE sendersId:', sendersId)

      receiversId = chosen_receicer_Id // Acesses Receiver
      console.log('From global chosen_receicer_Id variable ', receiversId)

      const message = {
        senderId: sendersId,  // current user's ID
        receiverId: receiversId ,//document.getElementById('receiverId').value,
        message: document.getElementById('messageContent').value,
        timestamp: new Date().toISOString(),
      };

      fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })
        .then(response => response.json())
        .then(data => {alert('Message sent!')
          console.log(data)
        })
        .catch(error => console.log('Error:', error));
    });


    // PATCH
    // 4. Add Image to Gallery
      document.getElementById('galleryForm').addEventListener('submit', (event) => {
        event.preventDefault();
  
        const imageUrl = document.getElementById('imageUrl').value; // get value of imageUrl
        signedIn_User_Object = LogedInuserObjectVar.getUser(); // Acess User Object.
        const userId = signedIn_User_Object.id; // get signed in user id
  
        fetch(`${apiUrl}/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gallery: [imageUrl],  // Add one image to the gallery
          })
        })
          .then(response => response.json())
          .then(data => {alert('Image added to gallery!')
            console.log('IMAGE', data)
          })
          .catch(error => console.log('Error:', error));
      });

      // signedIn_User_Object = LogedInuserObjectVar.getUser(); // Acess User Object
      // console.log('AT GALLERYIMAGES', signedIn_User_Object)
      // get ImagesGET /users/:id/gallery: Get a specific user’s gallery.
    async function getGalleryImages(userId) { 
      signedIn_User_Object = LogedInuserObjectVar.getUser(); // Acess User Object.
      console.log('AT GALLERYIMAGES', signedIn_User_Object)
      //Gconst userId = signedIn_User_Object.id; // get signed in user id
      return fetch(`${apiUrl}/users/${userId}`) // Return Fetch.return fetch(`${apiUrl}/${userId}`) 
        .then(res => res.json())
        .then(user => {
          // Iterate over user's gallery.
          user.gallery.forEach(image => {
            console.log(image)
            const imagesGallery = document.createElement('div')
            imagesGallery.id = 'imagesGallery'
            const imageChild = document.createElement('img');
            imageChild.src = image; // image URL
            imageChild.alt = 'Gallery Img'; 
            imageChild.style.maxWidth = '100%'; // Make sure the image fits inside the container
            imageChild.style.maxHeight = '100%'; // Make sure the image fits inside the container
            imageChild.style.position = 'relative';
            const imgMsge = document.createElement('div');
            imgMsge.id = 'imageSpan';
  
            //galleryHolder.style.innerText = 'flex'
            imageChild.addEventListener('mouseover', () => { // 
              console.log('USERLIST CLICKED', image)
              imagesGallery.style.backgroundColor = 'lightgreen';  // Change background color on hover
              imgMsge.innerHTML = 'Select Friend to share Image!'
              //imagesGallery.style.position = 'relative'         
              //'Select Friend to share Image.'
              //holdUserlist.style.
              
              //return  imagesGallery;
              getRelevantUsers(image, userId) // Call getRelevantUsers with imageUrl parameter. This will trigger Function that sends the message(image url) to the selecter receiver.
            });

            imageChild.addEventListener('mouseout', () => { // 
              imagesGallery.style.backgroundColor = 'blue';  // Change background color on hover
              imgMsge.innerHTML = '';
              holdUserlist.innerHTML = '';
            });
            imageChild.appendChild(imgMsge)
            imagesGallery.appendChild(imageChild)
            holdImages.appendChild(imagesGallery)

        })
        //.catch(error => console.log('Error:', error));
      
        })
    }

























    /* //MESSAGES PP
    // Function to fetch messages and responses
async function fetchMessagesAndResponses(userId) {
  try {
    // Fetch messages and responses in parallel
    const [messagesResponse, responsesResponse] = await Promise.all([
      fetch(`https://api.example.com/messages?userId=${userId}`),  // Fetch user messages
      fetch(`https://api.example.com/responses?userId=${userId}`) // Fetch user responses
    ]);

    // Parse JSON responses
    const messages = await messagesResponse.json();
    const responses = await responsesResponse.json();

    // Now, combine messages with their corresponding responses
    const messagesWithResponses = messages.map(message => {
      // Find responses for the current message
      const messageResponses = responses.filter(response => response.messageId === message.id);
      return { ...message, responses: messageResponses };  // Combine message and its responses
    });

    // Call a function to render messages and their responses
    renderMessages(messagesWithResponses);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to dynamically render messages and responses
function renderMessages(messagesWithResponses) {
  const messageContainer = document.getElementById('messages-container');  // Assume this is your container div

  messagesWithResponses.forEach(message => {
    // Create a div for each message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    // Add the message content
    const messageContent = document.createElement('p');
    messageContent.textContent = `Message: ${message.text}`;
    messageDiv.appendChild(messageContent);

    // If there are any responses, display them
    if (message.responses.length > 0) {
      const responsesList = document.createElement('ul');
      message.responses.forEach(response => {
        const responseItem = document.createElement('li');
        responseItem.textContent = `Response: ${response.text}`;
        responsesList.appendChild(responseItem);
      });
      messageDiv.appendChild(responsesList);
    }

    // Append the message div to the container
    messageContainer.appendChild(messageDiv);
  });
}

// Example usage (call this after the page is loaded)
const userId = 123;  // Example user ID
fetchMessagesAndResponses(userId);
 */












  /* // Function to fetch messages and responses for a specific user
async function fetchMessagesAndResponses(userId) {
  try {
    // Fetch messages for the user
    const messagesResponse = await fetch(`https://api.example.com/messages?receiverId=${userId}`);
    const messages = await messagesResponse.json();

    // Fetch responses for the user
    const responsesResponse = await fetch(`https://api.example.com/responses?receiverId=${userId}`);
    const responses = await responsesResponse.json();

    // Combine messages with their responses
    const messagesWithResponses = messages.map(message => {
      // Find responses for this specific message by matching message.id with response.messageId
      const messageResponses = responses.filter(response => response.messageId === message.id);
      return { ...message, responses: messageResponses }; // Add responses to message
    });

    // Call function to render messages and responses
    renderMessages(messagesWithResponses);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to dynamically render messages and their responses
function renderMessages(messagesWithResponses) {
  const messageContainer = document.getElementById('messages-container'); // The container to append messages

  messagesWithResponses.forEach(message => {
    // Create a div for each message
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    // Add the message content (e.g., sender, timestamp, and message text)
    const messageContent = document.createElement('p');
    messageContent.innerHTML = `<strong>${message.senderId}</strong>: ${message.message} <small>(${message.timestamp})</small>`;
    messageDiv.appendChild(messageContent);

    // If the message has responses, display them
    if (message.responses.length > 0) {
      const responsesList = document.createElement('ul');
      message.responses.forEach(response => {
        const responseItem = document.createElement('li');
        responseItem.innerHTML = `<strong>${response.senderId}</strong>: ${response.responseText} <small>(${response.timestamp})</small>`;
        responsesList.appendChild(responseItem);
      });
      messageDiv.appendChild(responsesList);
    }

    // Append the message div to the container
    messageContainer.appendChild(messageDiv);
  });
}

// Example usage (call this after the page is loaded)
const userId = 2;  // Example user ID
fetchMessagesAndResponses(userId);
 */







/* // Function to fetch groups, messages, and responses for a specific user
async function fetchGroupsMessagesAndResponses(userId) {
  try {
    // Fetch groups the user is a member of
    const groupsResponse = await fetch(`https://api.example.com/groups?userId=${userId}`);
    const groups = await groupsResponse.json();

    // Fetch all responses for the user
    const responsesResponse = await fetch(`https://api.example.com/responses?userId=${userId}`);
    const responses = await responsesResponse.json();

    // For each group, fetch its messages and combine with responses
    const groupsWithMessages = await Promise.all(groups.map(async group => {
      // Fetch messages for this group (you could combine with the group data depending on how it's structured)
      const groupMessagesResponse = await fetch(`https://api.example.com/messages?groupId=${group.id}`);
      const groupMessages = await groupMessagesResponse.json();

      // Combine group messages with responses
      const groupMessagesWithResponses = groupMessages.map(message => {
        // Find responses for this specific message
        const messageResponses = responses.filter(response => response.messageId === message.id);
        return { ...message, responses: messageResponses }; // Add responses to the message
      });

      return { ...group, messages: groupMessagesWithResponses };  // Combine group data with messages and responses
    }));

    // Call function to render groups with their messages and responses
    renderGroups(groupsWithMessages);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to dynamically render groups, their messages, and responses
function renderGroups(groups) {
  const groupsContainer = document.getElementById('groups-container'); // Container for groups

  groups.forEach(group => {
    // Create a div for each group
    const groupDiv = document.createElement('div');
    groupDiv.classList.add('group');
    
    // Add the group name
    const groupName = document.createElement('h3');
    groupName.textContent = group.name;
    groupDiv.appendChild(groupName);

    // Add group members (for simplicity, just display member IDs here)
    const membersList = document.createElement('p');
    membersList.textContent = `Members: ${group.members.join(', ')}`;
    groupDiv.appendChild(membersList);

    // If the group has messages, render them
    if (group.messages.length > 0) {
      const messagesList = document.createElement('ul');
      group.messages.forEach(message => {
        const messageItem = document.createElement('li');
        messageItem.classList.add('message-item');
        
        // Add message content
        messageItem.innerHTML = `<strong>${message.senderId}</strong>: ${message.message} <small>(${message.timestamp})</small>`;
        
        // If the message has responses, display them
        if (message.responses.length > 0) {
          const responsesList = document.createElement('ul');
          message.responses.forEach(response => {
            const responseItem = document.createElement('li');
            responseItem.innerHTML = `<strong>${response.senderId}</strong>: ${response.responseText} <small>(${response.timestamp})</small>`;
            responsesList.appendChild(responseItem);
          });
          messageItem.appendChild(responsesList);
        }

        messagesList.appendChild(messageItem);
      });
      groupDiv.appendChild(messagesList);
    }

    // Append the group div to the container
    groupsContainer.appendChild(groupDiv);
  });
}

// Example usage (call this after the page is loaded)
const userId = 2;  // Example user ID
fetchGroupsMessagesAndResponses(userId); */




})














 /*    



    // 4. Add Image to Gallery
    document.getElementById('galleryForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const imageUrl = document.getElementById('imageUrl').value;

      fetch(`${apiUrl}/users/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gallery: [imageUrl],  // Adds one image to the gallery
        }),
      })
        .then(response => response.json())
        .then(data => alert('Image added to gallery!'))
        .catch(error => console.log('Error:', error));
    });

    // 5. Create Group
    document.getElementById('groupForm').addEventListener('submit', (event) => {
      event.preventDefault();

      const group = {
        name: document.getElementById('groupName').value,
        members: [1],  // Placeholder for the user ID
        messages: [],
      };

      fetch(`${apiUrl}/groups`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(group),
      })
        .then(response => response.json())
        .then(data => alert('Group created!'))
        .catch(error => console.log('Error:', error));
    });

    function toggleVisibility(formId) {
      document.querySelectorAll('div').forEach(div => div.classList.add('hidden'));
      document.getElementById(formId).classList.remove('hidden');
    } */