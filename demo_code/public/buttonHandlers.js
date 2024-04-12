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
        // console.log(document.documentURI)
        if( document.documentURI == (DIR + "/login") ) handleLoginButton()
        if( document.documentURI == (DIR + "/sign-up") ) handleSignInButton()
    }
    e.stopPropagation()
    e.preventDefault()
}

// function handleLoginButton() {
//     let user = {}
//     user.username = document.querySelector("#username").value
//     user.password = document.querySelector("#password").value

//     if( user && Object.keys(user).length != 0 ){
//         const data = {text: user}
//         fetch('http://localhost:3000/login',{
//             method: 'POST',
//             headers: {'Content-Type': 'application/json',},
//             body: JSON.stringify(data),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             // console.log("User: ", user)
//             console.log("Data: ", data)
//             // let list = data.list
//             // let userFound = false
//             // console.log("List: ", data.list)
//             // console.log("User Found: ", data.userFound)

//             // console.log("WINDOW")

//             // for( let x = 0 ; x < list.length ; x++ ){
//             //     console.log(list[x])
//             //     if( isUsersEqual(user, list[x]) ){
//             //         userFound = true
//             //         window.location.replace('/chatClient.html')     //Cannot find a way to get rid of '.html'
//             //     }
//             // }

//             document.getElementById("errMessage").innerText = "Incorrect username or password. Please try again"
//             document.getElementById("username").value = ""
//             document.getElementById("password").value = ""

//             // if( response.ok ){
//             //     document.getElementById("errMessage").innerText = "Incorrect username or password. Please try again"
//             //     document.getElementById("username").value = ""
//             //     document.getElementById("password").value = ""
//             // }
//         })
//         .catch((error) => {
//             console.log('Error:', error)
//         })
//     }
// }

async function handleLoginButton() {
    // while(true){
        const response = await fetch('/login')
        if( (document.getElementById("username").value == "" || document.getElementById("password").value == "" || document.getElementById("confirm-password").value == "")  ){
            document.getElementById("errMessage").innerText = "Form is incomplete. Please try again."
        }
        if( response.ok ){
            document.getElementById("errMessage").innerText = "Incorrect username or password. Please try again."
        }
        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
    // }
}
// handleLoginButton()

// function handleSignInButton() {
//     let user = {}
//     user.username = document.querySelector("#username").value
//     user.password = document.querySelector("#password").value
  
//     //
// }

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