//connect to server and retain the socket
//connect to same host that served the document

//const socket = io('http://' + window.document.location.host)
const socket = io() //by default connects to same server that served the page

/*
Sends messages to chat server. 
  Will print if user is connected to user only.
  Will send messages from user to other users if registered. Text will be in black.
param(s): message (String)
return: NONE
*/
socket.on('serverSays', function(message) {
  let msgDiv = document.createElement('div')
  
  msgDiv.textContent = message      // message = "You are connected to CHAT SERVER"

  document.getElementById('messages').appendChild(msgDiv)
  if( document.getElementById('textarea').lastElementChild ) clearTextArea()
})

/*
Sends (prints) message to sender. Text will be in blue.
param(s): message (String)
return: NONE
*/
socket.on('senderMessage', function(message) {
  let msgDiv = document.createElement('div')
  
  msgDiv.textContent = message
  // msgDiv.style.color = "blue"
  msgDiv.className = "sender-msg"

  document.getElementById('messages').appendChild(msgDiv)
  if( document.getElementById('textarea').lastElementChild ) clearTextArea()
})

/*
Sends private messages to user(s). Text will be in red.
param(s): message (String)
return: NONE
*/
socket.on('privateMessage', function(message) {
  let msgDiv = document.createElement('div')
  
  msgDiv.textContent = message
  // msgDiv.style.color = "red"
  msgDiv.className = "private-msg"

  document.getElementById('messages').appendChild(msgDiv)
  if( document.getElementById('textarea').lastElementChild ) clearTextArea()
})

/*
Disconnects user when user closes browser.
param(s): message (String)
return: NONE
*/
socket.on('disconnectMessage', function(message) {
  let msgDiv = document.createElement('div')
  
  msgDiv.textContent = message
  msgDiv.className = "disconnect-msg"

  document.getElementById('messages').appendChild(msgDiv)
  // if( document.getElementById('textarea').lastElementChild ) clearTextArea()
})

/*
Prints error messages to user only in textarea (below "Clear" button).
  If username not found.
  If registration has not been made.
param(s): message (String)
return: NONE
*/
socket.on('errorMessage', function(message){
  let errorMsg = document.createElement('div')
  
  // document.getElementById('username').value = ''
  errorMsg.textContent = message
  document.getElementById('textarea').appendChild(errorMsg)
})

/*
Sends messages to chat server when "Send" button is clicked.
param(s): NONE
return: NONE
*/
function sendMessage() {
  let message = document.getElementById('msgBox').value.trim()
  if(message === '') return //do nothing
  socket.emit('clientSays', message)
  document.getElementById('msgBox').value = ''
}

/*
Registers and connects user to chat server when "Connect as" is clicked.
param(s): NONE
return: NONE
*/
function connectUser() {
  let userName = document.getElementById('username').value.trim()
  let textArea = document.getElementById('textarea')

  if(userName === '') return //do nothing

  if( isUsernameValid(userName) ){
    // textArea.remove()
    if( document.getElementById('textarea').lastElementChild ) clearTextArea()
    socket.emit('clientConnects', userName)
    document.getElementById("username").disabled = true
    document.getElementById("connection_button").disabled = true
  }
  else{
    let errorMsg = document.createElement('div')
    document.getElementById('username').value = ''
    errorMsg.textContent = "ERROR. Invalid Username. Try again."
    textArea.appendChild(errorMsg)
    // socket.emit('errorMessage', "ERROR. Invalid Username. Try again.")
  }
}

/*
Clear all messages in chat and textarea (below "Clear" button).
param(s): NONE
return: NONE
*/
function clear() {
  let msgs = document.getElementById('messages')
  let firstChild_msg = msgs.firstElementChild

  while( msgs.lastElementChild != firstChild_msg ) msgs.removeChild(msgs.lastElementChild)
  clearTextArea()
}

function handleKeyDown(event) {
  const ENTER_KEY = 13 //keycode for enter key
  const CTRL = 17 // keycode for ctrl key
  const ESC = 27 // keycode for esc key

  if (event.keyCode === ENTER_KEY) {
    sendMessage()
    return false //don't propogate event
  }

  // if( event.keyCode === CTRL ){   // EXTRA
  //   connectUser()
  //   return false
  // }

  if( event.keyCode === ESC ){   // EXTRA
    clearChat()
    return false
  }
}

//Add event listeners
document.addEventListener('DOMContentLoaded', function() {
  //This function is called after the browser has loaded the web page

  //add listener to buttons
  document.getElementById('send_button').addEventListener('click', sendMessage)
  document.getElementById('connection_button').addEventListener('click', connectUser)
  document.getElementById('clear_button').addEventListener('click', clear)

  //add keyboard handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  //document.addEventListener('keyup', handleKeyUp)
})
