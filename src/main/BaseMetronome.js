/**
 * Base metronome, with no timing.
 * More like a "click on command" class.
 */
export default class BaseMetronome {

    static START = 1;
    static STOP = 2;

    tempo = 0;
    counter = 0;
    playing = false;

    /**
     * 
     */
    constructor(tempo = 60, counter = 0) {
        this.tempo = tempo;
        this.counter = counter
        this.playing = false;
    }

    /**
     * 
     */
    init() {
        // Nothing to do here

        return this;
    }

    /**
     * 
     */
    click(instance, callback) {

        if (instance && callback) {
            //console.log("Run callback function with instance '" + instance + "'.");
            switch(instance) {
                case BaseMetronome.START:
                    callback(instance, this.counter++);
                    break;

                case BaseMetronome.STOP:
                    callback(instance, this.counter);
                    break;
            }
        } else {
            console.error("No callback function available!");
        }

        return this;
    }

    /**
     * 
     * @param {*} time 
     * @returns 
     */
    clickAtTime(time) {
        console.log("Method 'clickAtTime': time = '" + time + "'");

        return this;
    }

    /**
     * 
     * @param {*} callback 
     * @returns 
     */
    start(instance, callback) {
        this.playing = true;

        return this.init();
    }

    /**
     * 
     * @param {*} callback 
     * @returns 
     */
    stop(instance, callback) {
        this.playing = false;

        return this;
    }
}