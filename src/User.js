const errorsObj = require("./errors");

class User {
  //password is protected
  #password;
  constructor(username,password,age){
    if(!username){
      throw new Error(errorsObj.needUsr)
    } else if(!password){
      throw new Error(errorsObj.needPswd)
    }else if(!age || age < 1){
      throw new Error(errorsObj.needAge)
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
      throw new Error(errorsObj.wrongPswd)
    }
  }
  logout() {
    this.loggedIn = false;
  }
  getPassword(){
    return this.#password;
  }
  setNewPassword(password){
    if(!password || password === this.#password){
      throw new Error(errorsObj.notNewPsd)
    }
    this.#password = password;
    return "Password Changed!"
  }
}

module.exports = User
