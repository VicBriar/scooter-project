const User = require('../src/User')
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
    })
    //error tests
    describe('init & init errors',()=>{
        test('No Username',()=>{
            expect(() => new User("","bar",0)).toThrowError("you must have a username!")
            expect(() => new User(0)).toThrowError("you must have a username!")
        })
        test('No Password',()=>{
            expect(() => new User("foo","",0)).toThrowError("you must have a password!")
            expect(() => new User("bar",0)).toThrowError("you must have a password!")
        })
        test('No age',() => {
            expect(() => new User("foo","bar",0)).toThrowError("you must have an age!")
            expect(() => new User("foo","bar")).toThrowError("you must have an age!")
        })
        
    })

})

describe('User methods',() => {
    const user = new User("foo","bar",25)
   // test login error
   test('login',() => {
        expect(user.loggedIn).toBe(false)
    })
    // test login
    test('login',() => {
        user.login(user.getPassword())
        expect(user.loggedIn).toBe(true)
    })
    
})



// test logout
// test newpassword
