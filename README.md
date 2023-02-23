![logo](https://user-images.githubusercontent.com/44912347/202296600-c5f247d6-9616-49db-88f0-38433429d781.jpg)

# Scooter Project
You are a Software Engineer for the city of Baltimore, and you have been asked to design, test, and code the backend for an Electric Scooter Hire app system. Since the city already has front-end developers, you won’t need to design the UI, just the back-end!

In this challenge, you will be required to 
1. Create the UML Diagrams for the app
2. Write tests for your Classes, including their properties and methods
3. Build the system using JavaScript Classes

## Getting Started
```bash
npm install
```

## Running Tests
To run tests in "watch" mode
```bash
npm test
```

To get a coverage report
```bash
npm run coverage
```

## Projects Specifications
The company has provided you with some specs that the front end developers want for their Scooter App. **You should refer back to this page as you build your UML design and code.**

### Class: Scooter
This class represents the individual scooters that users will rent from stations. A Scooter is either docked at a station or checked out to a User. Scooters can also be broken or need charging.

Each Scooter should have the following properties
- `station`: string; the station the scooter is located at or `null` if checked out
- `user`: the User who checked out the Scooter, or null if docked
- `serial`: a number assigned sequentially from nextSerial
- `nextSerial`: a static number which starts at 1 and increments each time a new serial number is assigned
- `charge`: a number from 0 (no charge at all) to 100 (fully charged)
- `isBroken`: boolean

All Scooters are docked, charged, and in good repair initially. The Scooter constructor has one parameter: 
- the Station the scooter is docked at. 

Your constructor must initialize all of the other properties, too.

Each `Scooter` should have the following methods
- `rent(user)`
    - If the `Scooter` is charged above 20% and not broken, remove it from its station, check it out to user. 
    - Otherwise, throw an error scooter needs to charge or scooter needs repair.

- `dock(station)`
    - Return the scooter to the station. Be sure to clear out the user, so they don’t get charged unfairly!

-`recharge()`
    - **BONUS**: Set a timer to incrementally update the Scooter’s charge to 100. 
    - Every so often, log the new percentage of charge.

- `requestRepair()`
    - **BONUS**: Use a `setInterval` timer to schedule a repair in 5 seconds.
    - When time elapses, set `isBroken` to false and log repair completed to the console.

**NOTE**: The `recharge()` and `requaestRepair()` methods require that you deliver a message after a certain interval of time. In JavaScript, to simulate waiting for a scooter to charge you can make use of the `setTimeout` call for example in `src/Scooter.js`:
```js
async charge() {
    console.log('Starting charge');
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this.charge = 100

    console.log('Charge complete');   
}
```

The associated Jest test in `tests/Scooter.test.js` will look as follows:
```javascript
test("charge", async () => {
    const scooter = new Scooter();
    await scooter.charge(); // we need to wait for the charge!
    expect(newScooter.charge).toBe(100);
});
```

### Class: User
When a new person downloads the app and registers, a new `User` object is created to store user information in the system.

In a real world scenario, this object would also store credit card information, rental history, etc.

Each `User` has the following properties:
- `username`: String
- `password`: String
- `age`: In years
- `loggedIn`: boolean

`username`, `password`, and `age` are provided to the constructor as arguments. `loggedIn` represents whether the user is currently logged in. A user is NOT logged in when they first register.

Each User has the following methods (each called by ScooterApp):
- `login(password)`
    - If password is correct, logs the `User` in. If not, throws incorrect password error.
- `logout()`
    - Logs the `User` out.

### Class: ScooterApp
The `ScooterApp` keeps track of all registered users, plus all the scooters and their status. Many `ScooterApp` methods represent user actions such as logging in or returning a scooter. The `ScooterApp` uses properties and methods of Scooter and User objects.

Each `ScooterApp` should include the following properties 
- `stations`: An object whose keys are the names of station locations, and whose values are arrays of Scooters. You can hard-code these stations in the constructor. There should be at least three. Initially, there are no scooters at any stations.
- `registeredUsers`: An object whose keys are usernames to store all users 

Each `ScooterApp` should include the following methods 
- `registerUser(username, password, age)`
    - If the user is not already registered AND is 18 or older, then add them as a new registered user. Log to the console that the `user has been registered` and return the user.
    - If the user cannot be registered, throw an error: `already registered` or `too young to register`.
- `loginUser(username, password)`
    - Locate the registered user by name and call its login method. Log to the console that the `user has been logged in`.
    - If the user cannot be located or if the password is incorrect, then throw an error: `Username or password is incorrect`.
- `logoutUser(username)`
    - Locate the registered user and call its logout method. Log `user is logged out` to the console.
    - If the user cannot be located, throw `no such user is logged in` error
- `createScooter(station)`
    - This method is called by the Scooter company’s home office when new scooters are deployed. 
    - Create a new scooter, add it to the station’s scooter list, and set its station property. Log `created new scooter` to the console. Return the scooter. 
    - Throws `no such station` error if the station does not exist. 
- `dockScooter(scooter, station)`
    - Add the scooter to the station’s scooter list, and dock it. 
    - Log `scooter is docked` to the console.  
    - Throws `no such station` error if the station does not exist. 
    - Throws `scooter already at station` error if the scooter is already there.
- `rentScooter(scooter, user)`
    - Locate the given scooter at one of the stations, and remove it from that station. Rent it to the user. Log `scooter is rented` to the console. 
    - If the scooter is already rented, throw the error `scooter already rented`.
- `print()`
    - You will use this handy method when testing your `ScooterApp`.
    - Log the list of registered users to the console.
    - Log the list of stations and how many scooters are at each station to the console.
    - Take a moment to format it nicely so you can read it.
