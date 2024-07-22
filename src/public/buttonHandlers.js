// Key Codes
const ENTER = 13

// Variables
const DIR = "http://localhost:3000"

// Functions
function handleKeyUp(e) {
    if (e.which == ENTER) {
        console.log("KEYUP")
        if( document.documentURI == (DIR + "/login") ) handleLoginButton()
        if( document.documentURI == (DIR + "/sign-up") ) handleSignInButton()
    }
    e.stopPropagation()
    e.preventDefault()
}

// function handleLoginButton(){
//     let type = ""
//     let username = document.getElementById('username').value.trim()
//     let password = document.getElementById('password').value.trim()
//     let errorText = document.getElementById('error_text')
//     let errorMsg = document.createElement('div')

//     clearErrorText()

//     if( username == "" ){
//         errorText.textContent = "Username is missing."
//         errorText.appendChild(errorMsg)
//     }
//     if( password == "" ){
//         errorText.textContent = "Password is missing."
//         errorText.appendChild(errorMsg)
//     }

//     if( document.getElementById('member') ) type = "member"
//     else if( document.getElementById('trainer') ) type = "trainer"
//     else if( document.getElementById('administrator') ) type = "admin"

//     verify(type, username, password)
// }

async function handleLoginButton() {
    const response = await fetch('/login')
    let userName = document.getElementById('username').value.trim()
    let password = document.getElementById('password').value.trim()
    let errorText = document.getElementById('error_text')
    let errorMsg = document.createElement('div')

    if( userName == "" ){
        errorText.textContent = "Username is missing."
        errorText.appendChild(errorMsg)
    }
    if( password == "" ){
        errorText.textContent = "Password is missing."
        errorText.appendChild(errorMsg)
    }
    if( response.ok ){
        errorText.textContent = "Incorrect username or password. Please try again."
        errorText.appendChild(errorMsg)

        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
    }
}

async function handleSignInButton() {
    const response = await fetch('/sign-up')
    if( (document.getElementById("username").value == "" || document.getElementById("password").value == "" || document.getElementById("confirm-password").value == "")  ){
        document.getElementById("errMessage").innerText = "Form is incomplete. Please try again."
    }
    else if( response.ok ){
        document.getElementById("errMessage").innerText = "Password does not match re-entered password. Please try again."
    }
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("confirm-password").value = ""
}