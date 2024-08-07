// Packages
const express = require('express')
const session = require('express-session')
const mySQL = require('mysql')
const cookieParser = require('cookie-parser')

// App Setup
const app = express()
const bodyParser = require('body-parser')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(cookieParser());

const {Client} = require('pg')
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: "5432",
    password: "password",
    database: "project"
})
client.connect()

// const config = {
//     "host": "localhost",
//     "user": "postgres",
//     "port": "5432",
//     "password": "password",
//     "database": "project"
// };
// const db = mySQL.createConnection({
//     host: config.host,
//     user: config.user,
//     password: config.password,
//     database: config.base
// });
// db.connect(function (error) {
//     if (!!error)
//     throw error;
//     console.log('mysql connected to ' + config.host + ", user " + config.user + ", database " + config.base);
// });

// Variables
const PORT = process.env.PORT || 3000
const ROOT_DIR = '/public'

const SECURITY_CODE = "0413";

const MAX_MEMBERS_PER_GROUP = "6";

const DROP_IN_FEE = "10";
const MONTHLY_FEE = "30";
const ANNUAL_FEE = "300";
const PERSONAL_TRAINING_FEE = "50";
const GROUP_FITNESS_FEE = "15";

// let currEmergencyContactID = currentID("emergency_contact_ID", "Emergency_Contacts")
// let currAuthenticationID = currentID("authentication_ID", "Authentication")
// let currMemberID = currentID("member_ID", "Members")
// let currTrainerID = currentID("trainer_ID", "Trainers")
// let currAdminID = currentID("admin_ID", "Administrators")

var signedInUsers = []

// Functions
// function employeeIDGenerator(){
//     while(1){
//         let id = Math.floor(1000 + Math.random() * 9000)
//         if(isEmployeeIDValid(id)) return id
//     }

// }

// function isEmployeeIDValid(id){
//     client.query("SELECT concat(Trainers.employee_ID, Administrators.employee_ID) AS employee_ID FROM Trainers FULL JOIN Administrators ON Trainers.employee_ID=Administrators.employee_ID;", (err, res)=>{
//         if(!err){
//             for( let x = 0 ; x < res.rows.length ; x ++ ){
//                 if( id == res.rows[x] ) return false
//             }
//             return true
//         }
//         else console.log(err.message)
//     })
// }

// function currentID(id_name, table_name){
//     client.query("SELECT MAX(" + id_name + ") FROM " + table_name, (err, res)=>{
//         if(!err){
//             return res.rows[0].max
//         }
//         else console.log(err.message)
//     })
// }

// function listOfInvalidUsers(names, users){
//   let invalidUsernames = []
//   let listOfNames = names.split(",")
  
//   for( let name of listOfNames ){
//     if( !users.find( item => item.name === name.trim() ) ) invalidUsernames.push(name.trim())
//   }

//   return invalidUsernames.join(", ")
// }

async function loginAuthentication(user) {
    try{
        const res = await client.query('SELECT username, password, personnel FROM Authentication')
        for( let x = 0 ; x < res.rows.length ; x++ ){
            if( user.type === res.rows[x].personnel && user.username === res.rows[x].username && user.password === res.rows[x].password ){
                return true
            }
        }
        return false
    }
    catch( err ){
        console.log(err.message)
        return false
    }
}

// function removeUser(username, listOfUsers){
//     let newListOfUsers = []
//     let indexOfUserBeingRemoved = listOfUsers.findIndex( item => item.username === username )
//     let firstHalfOfList = []
//     let lastHalfOfList = []
    
//     firstHalfOfList = listOfUsers.slice(0, indexOfUserBeingRemoved)
//     lastHalfOfList = listOfUsers.slice(indexOfUserBeingRemoved + 1)
  
//     for( let f of firstHalfOfList ) newListOfUsers.push(f)
//     for( let l of lastHalfOfList ) newListOfUsers.push(l)
  
//     return newListOfUsers
// }

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
    console.log("Get Homepage")
    req.session.user = false;
    res.sendFile(__dirname + (ROOT_DIR + '/homepage.html'))
})

app.get('/login', (req, res) => {
    console.log("Get Login")
    res.sendFile(__dirname + (ROOT_DIR + '/login.html'))
})

app.post('/login', async (req, res) => {
    console.log("Post Login")
    let user = {}
    user.type = req.body.personnel
    user.username = req.body.username
    user.password = req.body.password

    const isAuthenticated = await loginAuthentication(user)

    if( isAuthenticated ){
        req.session.user = true
        signedInUsers.push(user)

        if( user.type == "member" ){
            res.sendFile(__dirname + (ROOT_DIR + '/membersPage.html'))
            res.redirect('/members')
        }
        else if( user.type == "trainer" ){
            res.sendFile(__dirname + (ROOT_DIR + '/trainersPage.html'))
            res.redirect('/trainers')
        }
        else if( user.type == "administrator" ){
            res.sendFile(__dirname + (ROOT_DIR + '/adminsPage.html'))
            res.redirect('/admin')
        }
    }
})

// app.get('/sign-up', (req, res) => {
//     console.log("Get Sign In")
//     res.sendFile(__dirname + (ROOT_DIR + '/newAccount.html'))
// })

// app.post('/sign-up', (req, res) => {
//     console.log("Post Sign In")
//     console.log(req.body)
//     let user = {}
//     user.type = req.body.personnel
//     user.fname = req.body.first_name
//     user.lname = req.body.last_name
//     user.bday = req.body.birthday
//     user.gender = req.body.gender
//     user.email = req.body.email
//     user.address = req.body.address
//     user.phone = req.body.phone_number
//     user.emergency_name = req.body.emergency_name
//     user.emergency_relationship = req.body.emergency_relationship
//     user.emergency_number = req.body.emergency_number
//     user.medical = req.body.medical_history
//     user.password = req.body.password
//     user.confirm = req.body.confirm_password

//     if( user.password == user.confirm ){
//         req.session.user = true

//         if( user.type == "member" ){
//             let q = "INSERT INTO Members VALUES(" + user.fname + ", " + user.lname + ", " + user.email + ", " + user.bday + ", " + user.gender + ", " + user.phone + ", " + user.address + ", " + user.medical + ", " + (currEmergencyContactID+1) + ", " + (currAuthenticationID+1) + ")"
//             client.query(q, (err, res)=>{
//                 if(err) console.log(err.message)
//             })

//             q = "INSERT INTO Emergency_Contacts VALUES (" + user.emergency_name + ", " + user.emergency_relationship + ", " + user.emergency_number + ", " + currMemberID + ", NULL, NULL)"
//             client.query(q, (err, res)=>{
//                 if(err) console.log(err.message)
//                 else{
//                     req.session.user = true
//                     res.sendFile(__dirname + (ROOT_DIR + '/membersPage.html'))
//                     res.redirect('/members')
//                 }
//             })
//         }
//         if( user.type == "trainer" ){
//             let q = "INSERT INTO Members VALUES(" + user.fname + ", " + user.lname + ", " + employeeIDGenerator() + ", " + user.email + ", " + user.bday + ", " + user.gender + ", " + user.phone + ", " + user.address + ", " + user.medical + ", " + (currEmergencyContactID+1) + ", " + (currAuthenticationID+1) + ")"
//             client.query(q, (err, res)=>{
//                 if(err) console.log(err.message)
//             })

//             q = "INSERT INTO Emergency_Contacts VALUES (" + user.emergency_name + ", " + user.emergency_relationship + ", " + user.emergency_number + ", " + currMemberID + ", NULL, NULL)"
//             client.query(q, (err, res)=>{
//                 if(err) console.log(err.message)
//                 else{
//                     req.session.user = true
//                     res.sendFile(__dirname + (ROOT_DIR + '/trainersPage.html'))
//                     res.redirect('/trainer')
//                 }
//             })   
//         }
//         if( user.type == "administrator" ){
//             let q = "INSERT INTO Members VALUES(" + user.fname + ", " + user.lname + ", " + employeeIDGenerator() + ", " + user.email + ", " + user.bday + ", " + user.gender + ", " + user.phone + ", " + user.address + ", " + user.medical + ", " + (currEmergencyContactID+1) + ", " + (currAuthenticationID+1) + ")"
//             client.query(q, (err, res)=>{
//                 if(err) console.log(err.message)
//             })

//             q = "INSERT INTO Emergency_Contacts VALUES (" + user.emergency_name + ", " + user.emergency_relationship + ", " + user.emergency_number + ", " + currMemberID + ", NULL, NULL)"
//             client.query(q, (err, res)=>{
//                 if(err) console.log(err.message)
//                 else{
//                     req.session.user = true
//                     res.sendFile(__dirname + (ROOT_DIR + '/adminsPage.html'))
//                     res.redirect('/admin')
//                 }
//             })
//         }
//     }
// })

app.get('/members', (req, res) => {
    if( req.session.user ){
        console.log("Get Members Page")
        res.sendFile(__dirname + (ROOT_DIR + '/membersPage.html'))
        
        console.log(signedInUsers)
    }
    else res.redirect('homepage')
})

// app.get('/trainers', (req, res) => {
//     // console.log("Chat: ", req.session.user)
//     if( req.session.user ){
//         console.log("Trainers Page")
//         res.sendFile(__dirname + (ROOT_DIR + '/trainersPage.html'))
//     }
//     else res.redirect('homepage')
// })

// app.get('/admin', (req, res) => {
//     // console.log("Chat: ", req.session.user)
//     if( req.session.user ){
//         console.log("Admin Page")
//         res.sendFile(__dirname + (ROOT_DIR + '/adminsPage.html'))
//     }
//     else res.redirect('homepage')
// })

app.use((req,res)=>{
    res.status(404).send('404: OOPS YOU BROKE THE INTERNET')
})

io.on('connection', function(socket) {
    console.log('client connected')

    socket.on('verify', function(user){
        socket.emit('serverToLogin', loginAuthentication(user))
    })

    // socket.on('clientConnects', function(data){
    //     socket.join("chat room")
    //     socket.emit('serverSays', data + '! You are connected to CHAT SERVER')
    //     console.log('USERNAME SET TO: ' + data)
    //     listOfUsers.push({name: data, socketID: socket.id})
    //     console.log(listOfUsers)
    // })

    // socket.on('clientSays', function(data) {
    //     if( listOfUsers.find( item => item.socketID === socket.id ) ){
    //     let user = listOfUsers.find( item => item.socketID === socket.id )
    //     console.log('RECIEVED: ' + data)

    //     if( data.includes(":") ){   // PRIVATE MESSAGING
    //         let names = data.slice(0, data.indexOf(":"))
    //         let message = (data.slice(data.indexOf(":") + 1)).trim()
            
    //         if( isUserValid(names, listOfUsers) ){
    //         if( names.includes(",") ){    // GROUP MESSAGING
    //             let listOfNames = names.split(",")
    //             for(let name of listOfNames){
    //             io.to(listOfUsers.find( item => item.name === name.trim() ).socketID).emit('privateMessage', user.name + ": " + message)
    //             }
    //         }
    //         else io.to(listOfUsers.find( item => item.name === names ).socketID).emit('privateMessage', user.name + ": " + message)   // ONE-ON-ONE MESSAGING
            
    //         socket.emit('privateMessage', user.name + ": " + message)
    //         }
    //         else{
    //         let invalidUsernames = listOfInvalidUsers(names, listOfUsers)
    //         if( invalidUsernames.includes(",") ) socket.emit('errorMessage', "ERROR. '" + invalidUsernames + "' are invalid. Usernames not found. Try again.")
    //         else socket.emit('errorMessage', "ERROR. '" + invalidUsernames + "' is invalid. Username not found. Try again.")
    //         }
    //     }
    //     else{
    //         socket.emit('senderMessage', user.name + ": " + data)
    //         socket.to("chat room").emit('serverSays', user.name + ": " + data)
    //     }
    //     }
    //     else socket.emit('errorMessage', "ERROR. Must register first.")   // NOT REGISTERED ERROR
    // })

    // socket.on('disconnect', function(username) {
    //     console.log('client disconnected')
        
    //     if( signedInUsers.findIndex( item => item.username === username ) > -1 ){
    //         let user = signedInUsers.find( item => item.username === username ).name
    //         let indexOfUserBeingRemoved = signedInUsers.findIndex( item => item.username === username )
            
    //         if( indexOfUserBeingRemoved > signedInUsers.length - 1 || signedInUsers.length == 1 ) signedInUsers.pop()
    //         else if( indexOfUserBeingRemoved < 1 ) signedInUsers.shift()
    //         else signedInUsers = removeUser(username, signedInUsers)

    //         console.log(signedInUsers)
    //     }
    // })
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