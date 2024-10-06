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

    for (let i=0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            isFlat = false;
        }
    }
    if (isFlat) {
        return arr;
    }
    //Loop through arr; if arr[i] is flat, append to result, otherwise concatenate to result

  }


  const trampoline = (f, ...args) => {
    let result = f(...args);
    while (typeof result === "function") {
      result = result();
    }
    return result;
  }