// Problem Description – fetchWithTimeout(url, ms, callback)
//
// You are required to write a function named fetchWithTimeout that accepts a URL,
// a time limit in milliseconds, and a callback function.
// The function attempts to fetch data from the given URL.
// If the request completes within the specified time, the callback is invoked with
// null as the first argument and the fetched data as the second argument.
// If the operation exceeds the time limit, the callback is invoked with an Error
// whose message is "Request Timed Out".


function fetchWithTimeout(url, ms, callback) {
    let iscompleted = false;
    
    const timeout = setTimeout(() => {
        if (!iscompleted) {
            iscompleted = true;
            callback(new Error("Request Timed Out"));
        }
    }, ms);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!iscompleted) {
                iscompleted = true;
                clearTimeout(timeout);
                callback(null, data);
            }
        })
        .catch(error => {
            if (!iscompleted) {
                iscompleted = true;
                clearTimeout(timeout);
                callback(error);
            }
        });

}
function printResult(err, data) {
    if (err) {
        console.error("Error:", err.message);
    } else {
        console.log("Data:", data);
    }
}

fetchWithTimeout(
    "https://jsonplacehoder.typicode.com/todos/1",
    30,
    printResult
);

module.exports = fetchWithTimeout;
