const express = require('express')
const session = require('express-session')
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public'



//functions
function isUsersEqual(user1, user2){
    return user1.username == user2.username && user1.password == user2.password
}

function isUserValid(names, users){
  if( names.includes(",") ){
    let listOfNames = names.split(",")
    
    for(let name of listOfNames){
      if( !users.find( item => item.name === name.trim() ) ) return false
    }
  }
  else{
    if( !users.find( item => item.name === names ) ) return false
  }

  return true
}

function removeUser(socketID, listOfUsers){
  let newListOfUsers = []
  let indexOfUserBeingRemoved = listOfUsers.findIndex( item => item.socketID === socketID )
  let firstHalfOfList = []
  let lastHalfOfList = []
  
  firstHalfOfList = listOfUsers.slice(0, indexOfUserBeingRemoved)
  lastHalfOfList = listOfUsers.slice(indexOfUserBeingRemoved + 1)

  for( let f of firstHalfOfList ) newListOfUsers.push(f)
  for( let l of lastHalfOfList ) newListOfUsers.push(l)

  return newListOfUsers
}

function listOfInvalidUsers(names, users){
  let invalidUsernames = []
  let listOfNames = names.split(",")
  
  for( let name of listOfNames ){
    if( !users.find( item => item.name === name.trim() ) ) invalidUsernames.push(name.trim())
  }

  return invalidUsernames.join(", ")
}

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + ROOT_DIR)) //provide static server
app.use(express.json())

app.use(session({
    secret: 'my-secret',  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false  // don't create session until something stored
}))
//Reference: https://medium.com/@zakiazizi1841992/express-js-session-explained-super-easy-with-example-908d8bc4bef9

app.get(['/', '/homepage'], (req, res) => {
    req.session.user = false;
    // console.log("Homepage", req.session.user)
    res.sendFile(__dirname + (ROOT_DIR + '/homepage.html'))
})

app.get('/login', (req, res) => {
    console.log("Get Login")
    res.sendFile(__dirname + (ROOT_DIR + '/login.html'))
})

app.post('/login', (req, res) => {
    console.log("Post Login")
    let user = {}
    user.username = req.body.username
    user.password = req.body.password
    
    for( let x = 0 ; x < registeredUsers.length ; x++ ){
        // console.log(registeredUsers[x])
        if( isUsersEqual(user, registeredUsers[x]) && ( user.username != "" && user.password != "" ) ){
            req.session.user = true
            res.sendFile(__dirname + (ROOT_DIR + '/chatClient.html'))   //Required?
            res.redirect('/chat-server')
        }
    }
})

app.get('/sign-up', (req, res) => {
    console.log("Get Sign In")
    res.sendFile(__dirname + (ROOT_DIR + '/newAccount.html'))
})

app.post('/sign-up', (req, res) => {
    console.log("Post Sign In")
    console.log(req.body)
    let user = {}
    let username = req.body.username
    let password = req.body.password
    let confirm_password = req.body.confirm_password
    if( password == confirm_password && ( username != "" && password != "" && confirm_password != "" ) ){
        req.session.user = true
        user.username = username
        user.password = password
        registeredUsers.push(user)
        res.sendFile(__dirname + (ROOT_DIR + '/chatClient.html'))   //Required?
        res.redirect('/chat-server')
    }
})

app.get('/chat-server', (req, res) => {
    // console.log("Chat: ", req.session.user)
    if( req.session.user ){
        console.log("Chat Server")
        res.sendFile(__dirname + (ROOT_DIR + '/chatClient.html'))
    }
    else res.redirect('homepage')
})

app.use((req,res)=>{
    res.status(404).send('404: OOPS YOU BROKE THE INTERNET')
})

io.on('connection', function(socket) {
    console.log('client connected')

    socket.on('clientConnects', function(data){
        socket.join("chat room")
        socket.emit('serverSays', data + '! You are connected to CHAT SERVER')
        console.log('USERNAME SET TO: ' + data)
        listOfUsers.push({name: data, socketID: socket.id})
        console.log(listOfUsers)
    })

    socket.on('clientSays', function(data) {
        if( listOfUsers.find( item => item.socketID === socket.id ) ){
        let user = listOfUsers.find( item => item.socketID === socket.id )
        console.log('RECIEVED: ' + data)

        if( data.includes(":") ){   // PRIVATE MESSAGING
            let names = data.slice(0, data.indexOf(":"))
            let message = (data.slice(data.indexOf(":") + 1)).trim()
            
            if( isUserValid(names, listOfUsers) ){
            if( names.includes(",") ){    // GROUP MESSAGING
                let listOfNames = names.split(",")
                for(let name of listOfNames){
                io.to(listOfUsers.find( item => item.name === name.trim() ).socketID).emit('privateMessage', user.name + ": " + message)
                }
            }
            else io.to(listOfUsers.find( item => item.name === names ).socketID).emit('privateMessage', user.name + ": " + message)   // ONE-ON-ONE MESSAGING
            
            socket.emit('privateMessage', user.name + ": " + message)
            }
            else{
            let invalidUsernames = listOfInvalidUsers(names, listOfUsers)
            if( invalidUsernames.includes(",") ) socket.emit('errorMessage', "ERROR. '" + invalidUsernames + "' are invalid. Usernames not found. Try again.")
            else socket.emit('errorMessage', "ERROR. '" + invalidUsernames + "' is invalid. Username not found. Try again.")
            }
        }
        else{
            socket.emit('senderMessage', user.name + ": " + data)
            socket.to("chat room").emit('serverSays', user.name + ": " + data)
        }
        }
        else socket.emit('errorMessage', "ERROR. Must register first.")   // NOT REGISTERED ERROR
    })

    socket.on('disconnect', function(data) {
        console.log('client disconnected')
        
        if( listOfUsers.findIndex( item => item.socketID === socket.id ) > -1 ){
        let user = listOfUsers.find( item => item.socketID === socket.id ).name
        let indexOfUserBeingRemoved = listOfUsers.findIndex( item => item.socketID === socket.id )
        
        if( indexOfUserBeingRemoved > listOfUsers.length - 1 || listOfUsers.length == 1 ) listOfUsers.pop()
        else if( indexOfUserBeingRemoved < 1 ) listOfUsers.shift()
        else listOfUsers = removeUser(socket.id, listOfUsers)

        socket.to("chat room").emit('disconnectMessage', user + " disconnected.")
        console.log(listOfUsers)
        }
    })
})

//start server
server.listen(PORT, err => {
// app.listen(PORT, err => {
    if (err) console.log(err)
    else {
        console.log(`Server Running at port ${PORT}  CNTL-C to quit`)
        console.log(`To Test:`)
        console.log(`Open several browsers to: http://localhost:${PORT}/homepage.html`)
    }
})