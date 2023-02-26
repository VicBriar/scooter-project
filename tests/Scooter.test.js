const Scooter = require('../src/Scooter')
const User = require('../src/User')
const errorsObj = require('../src/errors')
const ScooterApp = require('../src/ScooterApp')
const { dummyUserName, dummyPassWord } = require('../src/errors')

//typeof scooter === object
describe('scooter object & props', () => {
  test('serial number init',()=>{
    let scooter = new Scooter("South")
    let scooter1 = new Scooter("South")
    expect(scooter1.serial).toBe(2);
  })
  test('typeof scooter', () => {
    let scooter = new Scooter("South")
    expect(typeof scooter).toEqual("object")
  })
  test('scooter Station init', ()=> {
    let scooter = new Scooter("South")
    expect(scooter.station).toBe("South")
  })
  test('user init', ()=>{
    let scooter = new Scooter("South")
    expect(scooter.user).toBe(null)
  })
  test('charge init',()=>{
    let scooter = new Scooter("South")
    expect(scooter.charge).toBe(100)
  })
  test('isBroken init',()=>{
    let scooter = new Scooter("South")
    expect(scooter.isBroken).toBe(false)
  })
  test("scooter no station init erorr",() => {
    expect(() => new Scooter("")).toThrowError(errorsObj.needStation)
  })
  
})

//Method tests
describe('scooter methods', () => {
  //rent method
  describe('rent method', () => {
  ////broken scooter    
  test('rent broken scooter error',()=> {
    let scooter = new Scooter("South")
    scooter.isBroken = true;
    expect(() => scooter.rent("bob")).toThrowError(errorsObj.scooterBroken)
  })
  ////low battery
  describe ('rent battery low',() => {
    //////20
    test('rent dying scooter error',()=> {
      let scooter = new Scooter("South")
      scooter.charge = 20;
      expect(()=> scooter.rent("bob")).toThrowError(errorsObj.scooterDying)
      expect(scooter.user).toBe(null)
      scooter.charge = 15;
    expect(()=> scooter.rent("bob")).toThrowError(errorsObj.scooterDying)
    expect(scooter.user).toBe(null)
  })

})

  //user added 
  test('did user get added & is station gone?',()=>{
    let scooter = new Scooter("South")
    let user = new User("BobbyScooterLover10","omgIloveSc00tersSoMuch",50)
    scooter.rent(user)
    expect(scooter.user).toBe(user)
    expect(scooter.station).toBe(null)
  })
})
  //dock method
  test('docked to station',()=>{
    let scooter = new Scooter("South")
    scooter.rent("bob")
    scooter.dock("North")
    expect(scooter.station).toBe("North")
    expect(scooter.user).toBe(null)
  })
  test('failed to dock; no input',() => {
    let scooter = new Scooter("South")
    expect(() => scooter.dock(undefined)).toThrowError(errorsObj.needStation)
  })

  //requestRepair method
  describe("requestrepair tests",() => {
    test("repair", async () => {
      const scooter = ScooterApp.createScooter("North")
      scooter.isBroken = true
      await scooter.repair()
      expect(scooter.charge).toBe(100)
    })
  })

  //charge method

})
