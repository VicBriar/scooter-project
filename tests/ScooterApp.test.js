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
        expect(()=> ScooterApp.registerUser("BobbyScooterLover13",undefined,25)).toThrowError(errorsObj.needPswd)
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
        //username
        ////wrong username
        expect(()=> ScooterApp.loginUser("toristori","wowIhatesc00ters")).toThrowError(errorsObj.dsntExstUsr)
        ////username undefined
        expect(()=> ScooterApp.loginUser(undefined,"wowIhatesc00ters")).toThrowError(errorsObj.needUsr)
        
        //password
        ////pswd wrong
        expect(() => ScooterApp.loginUser("BobbyScooterLover11","wowIhatesc00ters")).toThrowError(errorsObj.wrongPswd)
        ////pswd undefined
        expect(() => ScooterApp.loginUser("BobbyScooterLover11",undefined)).toThrowError(errorsObj.needPswd)
    })
    
})
//// password Reset
describe('password reset',() => {
    ScooterApp.registerUser(errorsObj.dummyUserName,errorsObj.dummyPassWord,30)
    test("errors, username",() => {
        expect(() => ScooterApp.resetPassword("wrong-user-name",errorsObj.dummyPassWord,"newPassword")).toThrowError(errorsObj.dsntExstUsr)

        expect(() => ScooterApp.resetPassword(undefined,errorsObj.dummyPassWord,"newpasswird")).toThrowError(errorsObj.needUsr)
    })
    test("errors, password",() => {
        expect(() => ScooterApp.resetPassword(errorsObj.dummyUserName,undefined,"newpasswird")).toThrowError(errorsObj.needPswd)

        expect(() => ScooterApp.resetPassword(errorsObj.dummyUserName,errorsObj.dummyPassWord,errorsObj.dummyPassWord)).toThrowError(errorsObj.notNewPsd)
    })
    
    test("errors, new password",() => {
        //no new password
        expect(() => ScooterApp.resetPassword(errorsObj.dummyUserName,errorsObj.dummyPassWord,undefined)).toThrowError(errorsObj.needPswd)
        //not logged in
        expect(() => ScooterApp.resetPassword(errorsObj.dummyUserName,errorsObj.dummyPassWord,"new password")).toThrowError(errorsObj.loggedIn)

        //log in user to do final test; wrong password
        ScooterApp.loginUser(errorsObj.dummyUserName,errorsObj.dummyPassWord)
        expect(() => ScooterApp.resetPassword(errorsObj.dummyUserName,"wrongpasswrord","new password")).toThrowError(errorsObj.wrongPswd)
    })
    test("sucessful reset",() => {
        ScooterApp.resetPassword(errorsObj.dummyUserName,errorsObj.dummyPassWord,"Newpassword!")
        expect(ScooterApp.registeredUsers[errorsObj.dummyUserName].getPassword()).toBe("Newpassword!")
    })
})
// log out
describe("log out tests",() => {
    test('errors',() => {
        expect(()=> ScooterApp.logoutUser("steveTheFakeUser")).toThrow(errorsObj.dsntExstUsr)
        expect(() => ScooterApp.logoutUser(undefined)).toThrow(errorsObj.dsntExstUsr)
    })
    test('success',()=>{
        ScooterApp.logoutUser(errorsObj.dummyUserName)
        expect(ScooterApp.registeredUsers[errorsObj.dummyUserName].loggedIn).toBe(false)
    })
})

// rent scooter

// dock scooter
//// print test
describe('Print test',() => {
    test('print call',() => {
        ScooterApp.print()
    })
})
