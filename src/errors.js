
const errorsObj = {
needUsr: "You must have a username",
needPswd: "You must have a password",
needAge: "You must have an age",
wrongPswd: "Password is incorrect",
exsistUsr: "User already exists, please login instead",
dsntExstUsr: "User doesn't exsist",
notNewPsd: "You must enter a new password",
mustLogin: "You must be logged in to change your password",
tooYoung: "You must be at least 18 years old to sign up",
dummyUserName: "BobbyScooterLover",
dummyPassWord: "omgIloveSc00tersSoMuch",
needStation: "Station name required",
dsntExstStation: "Station doesn't exsist",
scooterIsDockedHere: "This scooter is already docked here",
scooterIsRented: "this scooeter is already rented",
needScooter: "You must provide a scooter",
dsntExstScooter: "The Scooter with that Serial number doesn't exist",
needSerial: "you must provide a serial number!",
scooterBroken: "Scooter is broken and cannot be checked out, please try again in 5 seconds :)",
scooterDying: "Selected scooter needs to charge first. Please try again later"
}

module.exports = errorsObj;