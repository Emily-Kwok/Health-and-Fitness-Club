//KEY CODES
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40

const DIR = "http://localhost:3000"

function handleKeyUp(e) {
    if (e.which == ENTER) {
        console.log("KEYUP")
        if( document.documentURI == (DIR + "/login") ) handleLoginButton()
        if( document.documentURI == (DIR + "/sign-up") ) handleSignInButton()
    }
    e.stopPropagation()
    e.preventDefault()
}

async function handleLoginButton() {
        const response = await fetch('/login')
        if( (document.getElementById("username").value == "" || document.getElementById("password").value == "" || document.getElementById("confirm-password").value == "")  ){
            document.getElementById("errMessage").innerText = "Form is incomplete. Please try again."
        }
        if( response.ok ){
            document.getElementById("errMessage").innerText = "Incorrect username or password. Please try again."
        }
        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
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