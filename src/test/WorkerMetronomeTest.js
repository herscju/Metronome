import WorkerMetronome from "./../main/WorkerMetronome.js"

let metronome = new WorkerMetronome(60, 0);

metronome.start(1, (instance, counter) => {
    console.log("Current number of ticks: '" + counter + "'.");
    const itemNode = document.createElement("li");
    itemNode.innerText = "Tick #" + counter + ". Selected instance is '" + instance + "'.";
    const listNode = document.getElementById("ticks");
    listNode.appendChild(itemNode);

    if (counter >= 9) {
        metronome.stop(2, (instance, counter) => {
            console.log("Last number of ticks: '" + counter + "'.");
            const itemNode = document.createElement("li");
            itemNode.innerText = "Tick #" + counter + ". Selected instance is '" + instance + "'.";
            const listNode = document.getElementById("ticks");
            listNode.appendChild(itemNode);
        });
    } 
});
