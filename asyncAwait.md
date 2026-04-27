
*async/await is part of `ECMAScript 2017` and is `not` supported in `Internet Explorer` and `older browsers`.*    

***control Flow** refers to the order in which statements are executed in a program.  
By default, JS runs code from top to bottom and left to right.  
JS functions are executed in the sequence they are called. Not in the sequence they were defined.  
Some of the async methods are: 
- `setTimeout()`
- `callbacks`

# async/await
**async** makes a function `return a promise`.   
**await** makes a function `wait for a Promise`.  
Promise chaining can become long.  
async and await were created to reduce nesting and improve readability.   
```js
// Three functions to run in steps
function step1() {
  return Promise.resolve("A");
}
function step2(value) {
  return Promise.resolve(value + "B");
}
function step3(value) {
  return Promise.resolve(value + "C");
}

// Run the three functions in steps
step1()
.then(function(value) {
  return step2(value);
})
.then(function(value) {
  return step3(value);
})
.then(function(value) {
  myDisplayer(value);
});
```
With async and await, the same flow is easier to read.  
```js
async function run () {
    let v1 = await step1()
    let v2 = await step2(v1)
    let v3 = await step3(v2)

    myDisplayer(v3)
}
    run()
```
### async keyword
The async keyword before a function makes the function return a promise.  
The same is true even if you return a normal value.  
```js
async myFunction () {
    return "Hello"
}
```
Is the same as: 
```js
function myFunction () {
    return Promise.resolves("Hello")
}
```
The result is handled with `then()` because it is a promise.  
```js
myFunction.then(
    function (value) {/*code if success*/}
    function (value) {/*code if some error*/}
)
```
### await keyword
Makes a function pause the execution and wait for a resolved promise before it continues.  
```jsx
let response = await promise
```
The `await` keyword `can only be used inside an async function`.   
```js
function step1 () {
    return Promise.resolve("A")
}
async function run () {
    let value = await step1()
    myDisplayer(value)
}
```
#### Handling Errors with try...catch
Promises use `catch()`for errors.  
```js
function fail () {
    return Promise.reject("Failed.")
}
async function run () {
    try {
        let value = await fail()
        console.log(value)
    }catch (err) {
        console.error(err)
    }
}
```
#### Sequential vs Parallel
Awaiting one by one runs tasks in sequence.  
This is correct when one step depends on the previous step.   
```js
async function run() {
  let a = await step1();
  let b = await step2();
  console.log(a, b);
}
```
If task do not depend on each other, you can run them in parallel.   
Use `Promise.all()` to wait for both.     
Start the promise first, await them together.  
```js
async function run () {
    let p1 = step1()
    let p2 = step2()
    let values = await Promise.all([p1, p2])
    console.log(values)
}
```
#### Example using fetch
```js
async function loadData () {
    try{
        let response = await fetch("url/posts")
        let data = await response.json()
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}
loadData()
```
You can even omit the await on the final line because async is guaranteed to return a Promise, if you return `response.json()`, which is a promise, JS simply passes that promise along.  
```js
async function getUser () {
    const response = await fetch("api/posts")
    return response.json()
}
```
#### Promises
Many callbacks become hard to read and maintain.  
```js
step1(function(r1) {
  step2(r1, function(r2) {
    step3(r2, function(r3) {
      console.log(r3);
    });
  });
});
```
This results to `callback hell`.  
Promises lets one write the same logic in a cleaner way.  
A Promise acts as a placeholder for a value that will be available at some point in the future, allowing you to handle asynchronous code in a cleaner way than traditional callbacks.   
A promise can either be `pending`, `fulfilled` or `rejected`.  
#### Creating a Promise
```js
let myPromise  = new Promise(function (resolve, reject) {
    //code 
    resolve(value)
    reject(value)
})
``` 
# How To Use a Promise
```js
myPromise.then(
    function (value) {/*Code if it works out*/}
    function (value) {/*Code if an error*/}
)
```
`then()` takes in two args, one callback function for `success` and another for `failure`.  
Both are optional, so one can add a callback function for success or failure only.  
```js
let myPromise = new Promise((resolve, reject){

  ok = true
  if (ok) {
    resolve("OK")
  }else {
    reject("Error")
  }
})
myPromise.then(
  function (value) {myDisplayer(value)}
  function (value) {myDisplayer(value)}
)
```
A promise contain both the `producing code` and calls to the `consuming code`.    
```jsx
let myPromise = new Promise(function(resolve, reject) {
  //code
  resolve(value)
  reject(value)
})

myPromise.then (
  function(value) {/*Code*/}
)
```
*The superpower of a `.then() ` is that it always returns a new promise. If one returns a value inside a `.then()`, it gets wrapped in a promise automatically. This is what prevents Callback Hell.*
A promise can resolve or reject `only once`.  
*\(**The "Settled" State:**\) A promise is "settled" once it is no longer pending. It is either fulfilled or rejected. Once settled, it stays that way forever (**immutability**)*  
The Promise object supports two properties: `state` and `result`.   
- While a Promise object is "pending" (working), the result is undefined.
- When a Promise object is "fulfilled", the result is a value.
- When a Promise object is "rejected", the result is an error object.  

You cannot access the Promise properties state and result. You must use a Promise method to handle promises.   
#### Core Methods and Usage
- **.then(onFulfilled, onRejected):** This methods attaches handlers for both the fulfillment and rejection cases. It returns a new promise, which enables method chaining.  
- **.catch(onRejected):** A shorthand for `.then(null, onRejected)` and is typically used to handle errors at the end of a promise chain.  
- **finally(onFinally):** This handler is called when the promise is settled (either fulfilled or rejected), regardless of the outcome. It's useful for cleanup operations.  

You can chain the `.catch()` to run when a promise is rejected.  
```js 
let promise = Promise.resolve("OK") 
promise
      .then((value) => {
        console.log(value)
      })
      .catch(function (value) {
        myDisplayer(value)
      })
```
```js
let promise = Promise.reject("Error")
promise
    .then(function (value) {
        console.log(value)
    })
    .catch( err => {
        myDisplayer(value)
    })
```
#### Promise API Static Methods. 
JS also provides static methods on the Promise object for handling multiple promises at once.  
- **Promise.all(iterable):** Fulfills when all the promises in the iterable are fulfilled; rejects if any promise rejects.   
- **Promise.allSettled(iterable):** Waits for all promises to settle(either fulfill or reject) and returns an array of their results.   
- **Promise.any(iterable):** Fulfills as soon as any promise in the iterable fulfills; rejects if all promises reject.  

#### Microtask Queue
Promises use `Microtask Queue`, which has higher priority than the `Task Queue` (used by `setTimeout`). This means that a resolved promise will usually run before a `setTimeout(..., 0)`.  

#### Examples
`fetch` is a great example of how Promise works.  
*When using fetch(), a common gotcha is that it won't trigger the .catch() block even if the server returns a 404 or 500 error. It only rejects if there is a network failure (like being offline).*  
Before fetch existed, we had to wrap older tools in a Promise manually.  
```jsx
function makeRequest(url) {
  // We return a NEW Promise object
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    // When the network task finishes successfully:
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response); // The box is filled with data!
      } else {
        reject(Error("Data didn't load successfully")); // The box is filled with an error
      }
    };

    // When the network task fails (e.g., no wifi):
    xhr.onerror = () => reject(Error("Network Error"));

    xhr.send();
  });
}

// Usage:
makeRequest('https://api.example.com/items')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```