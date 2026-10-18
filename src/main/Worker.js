/**
 * SetInterval in a worker to see if it's different than on the main thread
 */
self.postMessage("Worker ready!");

let interval = 1;
let timeoutId = 0;

self.onmessage = (evnt) => {
    if (evnt.data.interval) {
        interval = evnt.data.interval;
        //console.log("Current interval '" + interval + "'.");

    } else if (evnt.data === "start") {
        timeoutId = self.setInterval(() => { self.postMessage("tick"); }, interval);
        //console.log("Run function 'self.setInterval' (ID: " + timeoutId + "). Current interval '" + interval + "'.");
        
    } else if (evnt.data === "stop") {
        self.clearInterval(timeoutId);
        //console.log("Run function 'self.clearInterval' (ID: " + timeoutId + ").");

    } else if (evnt.data === "tick") {
        // Nothing to do here
    }
};