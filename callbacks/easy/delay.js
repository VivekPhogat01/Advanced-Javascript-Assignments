// Problem Description – delay(ms, value, callback)
//
// You are required to write a function named delay that takes a time duration
// in milliseconds, a value, and a callback function.
// The function should wait for the given time and then invoke the callback
// with `null` as the first argument and the provided value as the second argument.

function delay(ms, value, callback) {
   setTimeout(() => {
    callback(null, value);
   }, ms);
}
function printValue(err, value) {
   if (err) {
      console.error(err);
   } else {
      console.log(value);
   }
}

// Example usage:
delay(2000, 'Hello, World!', printValue);
  
module.exports = delay;