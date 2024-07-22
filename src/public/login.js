// Sockets
const socket = io()

socket.on('serverToLogin', function(verified){
    let errorText = document.getElementById('error_text')
    let errorMsg = document.createElement('div')

    if( verified ){
        if( document.getElementById('error_text').lastElementChild ){
            clearErrorText()
        }

        fetch('/login', {
            method: 'POST', // Specify the request method as POST
            headers: {
                'Content-Type': 'application/json' // Set the request headers
            }
        })
        .then(response => response.json()) // Parse the JSON response
        .then(result => {
            console.log('Success:', result); // Handle the success response
        })
        .catch(error => {
            console.error('Error:', error); // Handle any errors
        })

    }
    else{
        errorMsg.textContent = "Incorrect username or password. Please try again."
        errorText.appendChild(errorMsg)

        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
    }
})

// Functions
function clearErrorText(){
    let errorText = document.getElementById('error_text')
    while( errorText.lastElementChild ) errorText.removeChild(errorText.lastElementChild)
}

function verify(type, username, password) {
    let user = {}
    user.type = type
    user.username = username
    user.password = password

    socket.emit('verify', user)
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login_button').addEventListener('click', verify)
})