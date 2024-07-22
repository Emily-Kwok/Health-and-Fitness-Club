// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    //add listener to buttons
    document.getElementById('send_button').addEventListener('click', sendMessage)
    document.getElementById('connection_button').addEventListener('click', connectUser)
    document.getElementById('clear_button').addEventListener('click', clear)

})