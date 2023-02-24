const User = require('../src/User')
const errorsObj = require('../src/errors')
describe('is jest working?',() => {
    test("1 = 1",()=>{
        expect(1).toBe(1)
    })
})
describe('User object & props',()=>{
    //base obj for tests
    const user = new User('foo','bar',25)
    test('is object',() => {
        expect(typeof user).toBe("object")
    })
    // test sucessful init
    test('good init',() => {
        expect(user.username).toBe("foo")
        expect(user.getPassword()).toBe("bar")
        expect(user.age).toBe(25)
        expect(user.loggedIn).toBe(false)

    })
    //error tests
    describe('init & init errors',()=>{
        test('No Username',()=>{
            expect(() => new User("","bar",0)).toThrowError(errorsObj.needUsr)
            expect(() => new User(0)).toThrowError(errorsObj.needUsr)
        })
        test('No Password',()=>{
            expect(() => new User("foo","",0)).toThrowError(errorsObj.needPswd)
            expect(() => new User("bar",0)).toThrowError(errorsObj.needPswd)
        })
        test('No age',() => {
            expect(() => new User("foo","bar",0)).toThrowError(errorsObj.needAge)
            expect(() => new User("foo","bar")).toThrowError(errorsObj.needAge)
        })
        
    })

})

describe('User methods',() => {
    const user = new User("foo","bar",25)
    // test login
    test('login wrong password error',() => {
        expect(() => user.login("I'm the wrong password!")).toThrowError(errorsObj.wrongPswd)
    })
    test('login',() => {
        user.login(user.getPassword())
        expect(user.loggedIn).toBe(true)
    })
    //test logout
    test('logout',() => {
        user.logout()
        expect(user.loggedIn).toBe(false)
    })
    //test setNewPassword
    test('setNewPassword error',() => {
        expect(() => user.setNewPassword("")).toThrowError(errorsObj.notNewPsd)
    })
    test('set new Password', () => {
        user.setNewPassword("baz")
        expect(user.getPassword()).toBe("baz")
    })
    
})



// test logout
// test newpassword
