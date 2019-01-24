/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. Ivoked with 'new' keyword - 'new' keyword makes a function call a constructor call. When a function is invoked with constructor call
a new object is created (constructed) and set as 'this' binding for that function call.


* 2. Explicit binding - Most functions in JS have .call() and .apply() methods available to them. Both of these methods take an object
as their first parameter on which 'this' should be used. This is how you explicitly say that you want 'this' to be the object passed in the parameter.


* 3. Implicit binding - A function can be declared outside the scope of an object. 
If the object contains a reference to this function in its scope, and when calling the function 
it is preceded by the object reference (i.e.: obj.function()), than this object should be used for the functions 'this' binding (i.e.: this = obj).
The object in implicit binding have to contain a reference in itself to the function!


* 4. Default binding 'this' inside a function - default binding of 'this', when the function (containing 'this') is in global scope, 
is the Global (Window) object.


* write out a code example of each explanation above
*/

// Principle 1
// code example for New Binding
function Hero (name) {
    this.name = name;
}
const heroCharacter = new Hero ('Magus Grandus');
console.log(`Hi, I am ${heroCharacter.name}`);


// Principle 2
// code example for Explicit Binding
function hello() {
    console.log(`Hi ${this.name}`);
}
const people = {
    name: 'Ben',
};
hello.call(people);


// Principle 3
// code example for Implicit Binding
function greet() {
    console.log(`Hi ${this.name}`);
}
const person = {
    name: 'John',
    greet: greet,
};
person.greet();


// Principle 4
// code example for Default (Window) Binding
function ahoj() {
    console.log(`Ahoj ${this.dude}!`);
}
var dude = 'Terry';
ahoj();
