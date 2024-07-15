/*
Check if username is valid. Must only contain letters and numbers, and first character must be letter.
param(s): name (String)
return: TRUE if valid, FALSE otherwise
*/
function isUsernameValid(name){
    return /^[A-Za-z]*$/.test(name[0]) && /^[A-Za-z0-9]*$/.test(name)
}

/*
Clears messages in textarea (below "Clear" button)
param(s): NONE
return: NONE
*/
function clearTextArea(){
    let errs = document.getElementById('textarea')
    while( errs.lastElementChild ) errs.removeChild(errs.lastElementChild)
}