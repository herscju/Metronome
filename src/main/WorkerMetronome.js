/**
 * Scheduling is done by calling setInterval() in a worker thread.
 */
import BaseMetronome from "./BaseMetronome.js"

export default class WorkerMetronome extends BaseMetronome {

    worker = null;

    /**
     * Constructor
     * @param {*} tempo 
     * @param {*} counter 
     * @param {*} task 
     * @param {*} input 
     * @param {*} worker 
     */
    constructor(tempo, counter, task, input = "toggle", worker = "./../main/Worker.js") {
        super(tempo, counter);
        this.task = task;
        this.input = input;
        this.worker = new Worker(worker);
    }

    /**
     * 
     * @param {*} instance 
     * @param {*} callback 
     * @returns 
     */
    start(instance, callback) {
        super.start(instance, callback);

        const interval = (60 / this.tempo) * 1000;
        //console.log("Tempo '" + this.tempo + "' gets interval '" + interval + "'.");

        this.worker.postMessage({ "interval": interval });
        this.worker.postMessage("start");
        this.worker.onmessage = (evnt) => {
            if (evnt.data === "tick" && this.task != null) {
                this.task.transition(this.input);
                //console.log("Task state: " + this.task.state())
            }
            this.click(instance, callback);
        };

        return this;
    }

    /**
     * 
     * @param {*} instance 
     * @param {*} callback 
     * @returns 
     */
    stop(instance, callback) {
        super.stop(instance, callback);

        this.worker.onmessage = (evnt) => { this.worker.postMessage({ "interval": 0 }); this.worker.postMessage("stop"); this.click(instance, callback); };

        return this;
    }
}