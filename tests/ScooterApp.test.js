const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
describe('is jest working?',() => {
    test("1 = 1",()=>{
        expect(1).toBe(1)
    })
})
describe('is stations an object?', () => {
    test('stations obj',() => {
        expect(typeof ScooterApp.stations).toBe("object")
        expect(ScooterApp.stations["North"]).toStrictEqual([]);
    })
    test('registeredUsers obj',() => {
        expect(typeof ScooterApp.registeredUsers).toBe("object")
    })
})
// ScooterApp tests here
//// register user
describe('Register User tests',()=>{
    test('User object made',() => {
        expect(typeof ScooterApp.registerUser("BobbyScooterLover11","omgIloveSc00tersSoMuch",50)).toBe("object")
        //this proves the user was registered and stored, and that it's password was stored correctly
        expect(ScooterApp.registeredUsers["BobbyScooterLover11"].getPassword()).toBe("omgIloveSc00tersSoMuch")
        //this proves above, except age instead of password
        expect(ScooterApp.registeredUsers["BobbyScooterLover11"].age).toBe(50)
    })
    test('Errors',() => {
        expect(() => ScooterApp.registerUser("BobbyScooterLover11","omgIloveSc00tersSoMuch",50)).toThrowError("user already exists, please login instead")
        expect(() => ScooterApp.registerUser("BobbyScooterLover12","omgIloveSc00tersSoMuch",0)).toThrowError("You must be at least 18 years old to sign up")
    })
    test('Errors from userObj constructor',() => {
        expect(()=> ScooterApp.registerUser("","omgIloveScootersSoMuch",25)).toThrowError("you must have a username!")
        expect(()=> ScooterApp.registerUser("BobbyScooterLover13","",25)).toThrowError("you must have a password!")  
    })
})

//// log in


// log out

// rent scooter

// dock scooter
