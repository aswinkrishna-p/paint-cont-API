// Validation function for email using regex
function isValidEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Validation function for password minimum length
function isValidPassword(password: string) {
    return password.length >= 6; // minimum length of password
}

function isValiduserName(username: string){
    const nameRegex =  /^[a-zA-Z]{3,}$/;
    return nameRegex.test(username);
}

export {
    isValidEmail,
    isValidPassword,
    isValiduserName,

    
}