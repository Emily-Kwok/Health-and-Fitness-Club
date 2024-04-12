//Event handlers

/* function: reads username & password from Login page & makes post req to server
to check if user is register
- if user is registered, server routes to chatClient.html
-            not,               does nothing & login page displays error message
*/
// function login(ev) {
//   ev.preventDefault()
//   let user = {username: "", password: ""}
//   user.username = document.querySelector("#username").value
//   user.password = document.querySelector("#password").value
//   console.log(`Checking if user ${JSON.stringify(user)} is registered`)

//   xr = new XMLHttpRequest()
//   xr.open("POST", "/login")
//   xr.setRequestHeader("Content-Type", "application/json")
//   xr.send(JSON.stringify(user))

//   xr.onreadystatechange = () => {
//     if (xr.readyState == 4 && xr.status == 200) {
//       document.getElementById("errMessage").innerText = "Incorrect username or password. Please try again"
//       document.getElementById("username").value = ""
//       document.getElementById("password").value = ""
//     }
//   }
// }

// function handleKeyDown(ev) {
//   const ENTER_KEY = 13 //keycode for enter key
//   if (ev.keyCode === ENTER_KEY) {
//     login(ev)
//     return false //don't propogate event
//   }
// }


// document.addEventListener("DOMContentLoaded", ()=> {
//   document.querySelector("#login-button").addEventListener("click", (event)=> {
//     login(event)
//   })
//   document.addEventListener('keydown', handleKeyDown)

// })




document.addEventListener('DOMContentLoaded', function() {
  // document.getElementById('login-button').addEventListener('click', handleLoginButton)
  // document.getElementById('signup-button').addEventListener('click', handleSignInButton)
  document.addEventListener('keyup', handleKeyUp)
})