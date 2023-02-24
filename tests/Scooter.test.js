const Scooter = require('../src/Scooter')
const User = require('../src/User')

//typeof scooter === object
describe('scooter object & props', () => {
  test('scooter init with station error',()=>{
    expect(()=> scooter = new Scooter()).toThrowError("Station name required")
  })
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
  
})

//Method tests
describe('scooter methods', () => {
  //rent method
  describe('rent method', () => {
  ////broken scooter    
  test('rent broken scooter error',()=> {
    let scooter = new Scooter("South")
    scooter.isBroken = true;
    expect(() => scooter.rent("bob")).toThrowError("scooter is broken and cannot be checked out, please try again in 5 seconds :)")
  })
  ////low battery
  describe ('rent battery low',() => {
    //////20
    test('rent dying scooter error',()=> {
      let scooter = new Scooter("South")
      scooter.charge = 20;
      expect(()=> scooter.rent("bob")).toThrowError("scooter needs to charge first. Please try again later")
      expect(scooter.user).toBe(null)
  })
  ////////15
  test('rent dying scooter error',()=> {
    let scooter = new Scooter("South")
    scooter.charge = 15;
    expect(()=> scooter.rent("bob")).toThrowError("scooter needs to charge first. Please try again later")
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

  //requestRepair method

  //charge method

})
