const { mustLogin } = require("./errors");
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
    if(this.getPassword() === password){
      this.loggedIn = true
    } else {
      throw new Error(errorsObj.wrongPswd)
    }
  }
  logout() {
    if(!this.loggedIn){
      throw new Error(errorsObj.notLoggedIn)
    }
    this.loggedIn = false;
  }
  getPassword(){
    return this.#password;
  }
  setNewPassword(password="",newpassword=""){
    if(!password){
      throw new Error(errorsObj.needPswd)
    } else if(!newpassword || newpassword === password){
      throw new Error(errorsObj.notNewPsd)
    } else if (!(this.loggedIn)){
      throw new Error(errorsObj.mustLogin)
    } else if (password !== this.getPassword()){
      throw new Error(errorsObj.wrongPswd)
    } else {
    this.#password = newpassword;
    console.log("Password Changed!")
  }
}
}

module.exports = User
