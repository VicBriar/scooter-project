class User {
  //password is protected
  #password;
  constructor(username,password,age){
    if(!username){
      throw new Error("you must have a username!")
    } else if(!password){
      throw new Error("you must have a password!")
    }else if(!age || age < 1){
      throw new Error("you must have an age!")
    }
    this.username = username;
    this.#password = password;
    this.age = age;
    this.loggedIn = false;
  }

  login(password){
    if(this.#password === password){
      this.loggedIn = true
    } else {
      throw new Error("Password is incorrect")
    }
  }
  logout() {
    this.loggedIn = false;
  }
  getPassword(){
    return this.#password;
  }
  setNewPassword(password){
    this.#password = password;
    return "Password Changed!"
  }
}

module.exports = User
