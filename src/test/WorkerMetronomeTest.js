import BaseMetronome from "./../main/BaseMetronome.js"
import WorkerMetronome from "./../main/WorkerMetronome.js"

let metronome = new WorkerMetronome(60, 0);

metronome.start(BaseMetronome.START, (instance, counter) => {
    console.log("Current number of ticks: '" + counter + "'.");
    const itemNode = document.createElement("li");
    itemNode.innerText = "Tick #" + counter + ". Selected instance is '" + instance + "'.";
    const listNode = document.getElementById("ticks");
    listNode.appendChild(itemNode);

    if (counter >= 9) {
        metronome.stop(BaseMetronome.STOP, (instance, counter) => {
            console.log("Last number of ticks: '" + counter + "'.");
            const itemNode = document.createElement("li");
            itemNode.innerText = "Tick #" + counter + ". Selected instance is '" + instance + "'.";
            const listNode = document.getElementById("ticks");
            listNode.appendChild(itemNode);
        });
    } 
});
