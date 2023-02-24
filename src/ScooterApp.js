const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  static stations = {
    "North": [],
    "South": [],
    "East": [],
    "West": []
  }
  static registeredUsers = {}
//methods

////registerUser
  static registerUser(username="", password="", age){
    if(Object.keys(ScooterApp.registeredUsers).includes(username)){
      throw new Error("user already exists, please login instead")
    } else if(age < 18) {
      throw new Error("You must be at least 18 years old to sign up")
    } else {
      ScooterApp.registeredUsers[username] = new User(username,password,age);
      console.log("user has been registered")
      return ScooterApp.registeredUsers[username]
    }
  }

  ////login

  ////log out
  ////rent scooter
  ////dock scooter

}



module.exports = ScooterApp
