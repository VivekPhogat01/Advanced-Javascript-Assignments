// Problem Description – once(fn)
//
// You are required to implement a wrapper function named once that accepts a
// callback-based asynchronous function `fn`.
// The wrapper should ensure that `fn` is executed only on the first call.
// Any subsequent calls should not re-execute `fn` and should instead invoke
// the callback with the same result (or error) from the first invocation.
function once(fn) {
    let isCalled = false;
    let savedError = null;
    let savedResult = null;

    return function (...args) {

        // Original callback passed by the user
        const callback = args[args.length - 1];

        // If the function has already executed,
        // return the saved result immediately.
        if (isCalled) {
            callback(savedError, savedResult);
            return;
        }

        // Replace the original callback with our own.
        args[args.length - 1] = function (err, result) {
            isCalled = true;
            savedError = err;
            savedResult = result;

            // Call the user's original callback
            callback(err, result);
        };

        // Execute the original function
        fn(...args);
    };
}
// Example usage of the once function
function fetchUser(id, callback) {
    console.log("Fetching User...");

    setTimeout(() => {
        callback(null, {
            id: id,
            name: "Vivek"
        });
    }, 2000);
}
// Wrap the fetchUser function with once
const fetchUserOnce = once(fetchUser);

function printResult(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
}
// Call the wrapped function multiple times
fetchUserOnce(1, printResult);

setTimeout(() => {
    fetchUserOnce(1, printResult);
}, 3000);

setTimeout(() => {
    fetchUserOnce(1, printResult);
}, 5000);

module.exports = once;