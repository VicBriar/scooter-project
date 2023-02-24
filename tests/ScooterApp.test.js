const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const errorsObj = require('../src/errors')
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
        expect(() => ScooterApp.registerUser("BobbyScooterLover11","omgIloveSc00tersSoMuch",50)).toThrowError(errorsObj.dsntExstUsr)
        expect(() => ScooterApp.registerUser("BobbyScooterLover12","omgIloveSc00tersSoMuch",0)).toThrowError(errorsObj.tooYoung)
    })
    test('Errors from userObj constructor',() => {
        expect(()=> ScooterApp.registerUser(undefined,"omgIloveScootersSoMuch",25)).toThrowError(errorsObj.needUsr)
        expect(()=> ScooterApp.registerUser("BobbyScooterLover13",undefined,25)).toThrowError("you must have a password!")
        expect(()=> ScooterApp.registerUser("BobbyScooterLover13","omgIloveScootersSoMuch",undefined)).toThrowError(errorsObj.tooYoung)
    })
})

//// log in user
describe("login user tests",()=>{
    test("user login",()=>{
        ScooterApp.loginUser("BobbyScooterLover11","omgIloveSc00tersSoMuch")
        expect(ScooterApp.registeredUsers["BobbyScooterLover11"].loggedIn).toBe(true)
    })
    test("user login errors",() => {
        expect(()=> ScooterApp.loginUser("toristori","wowIhatesc00ters")).toThrowError(errorsObj.dsntExstUsr)
        expect(() => ScooterApp.loginUser("BobbyScooterLover11","wowIhatesc00ters")).toThrowError("password is incorrect")
        expect(()=> ScooterApp.loginUser(null,"wowIhatesc00ters")).toThrowError(errorsObj.needUsr)
        expect(() => ScooterApp.loginUser("BobbyScooterLover11",null)).toThrowError("password is incorrect")
    })
    
})

// log out

// rent scooter

// dock scooter
//// print test
describe('Print test',() => {
    test('print call',() => {
        ScooterApp.print()
    })
})
