//PUOTEL = Practical Use Of the Event Loop

//Declare a global counter variable

let i = 0;

// Create a simple function that increments the variable, and then calls itself recursively.
function simpleFunction() {
  i++;
  simpleFunction();
}
// Surround the initial function call in a try/catch block.
try {
  simpleFunction();
} catch (err) {
  console.log(err);
  console.log(i);
}

// Within the catch, log the error and the value of the counter variable.
function flatten(arr) {
  if (!Array.isArray(arr)) {
    //base case: if it is not an array and therefore already flat
    return arr;
  } else {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      let flattened = flatten(arr[i]);
      result = result.concat(flattened);
    }
    return result;
  }
}
console.log(flatten([1, 2, [3, 4]]));

//Trampoline
function flatten2(arr) {
  //Check if it is already flat
  let isFlat = true;

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      isFlat = false;
    }
  }
  if (isFlat) {
    return arr;
  }
  //Loop through arr; if arr[i] is flat, append to result, otherwise concatenate to result
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(arr[i]);
    } else {
      //When arr[i] is flat
      result.push(arr[i]);
    }
  }
  //Return a function that calls flatten2 on result
  return () => flatten2(result);
}

const trampoline = (f, ...args) => {
  let result = f(...args);
  while (typeof result === "function") {
    result = result();
  }
  return result;
};

console.log(trampoline(flatten2, [2, 4, 6, [1, 5, 7, [2, 9]]]));

//Write a function that takes a parameter n and adds a list of all prime numbers between one and n to your HTML element.

const paragraph = document.querySelector("p");

function isPrime(n) {
  //Checking primality
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
function primesUpTo(n) {
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      paragraph.append(" " + i);
      console.log(paragraph.innerText);
    }
  }
  alert("You got PUOTEL'd");
}

setTimeout(function () {
  primesUpTo(10000);
}, 2000);
