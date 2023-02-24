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

// register user

// log in

// log out

// rent scooter

// dock scooter
