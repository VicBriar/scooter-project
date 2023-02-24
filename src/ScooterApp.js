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
}

module.exports = ScooterApp
