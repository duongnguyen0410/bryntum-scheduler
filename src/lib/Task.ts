import { EventModel } from "@bryntum/schedulerpro";


export default class Task extends EventModel {
    static get $name() {
        return 'Task';
    }

    static get defaults() {
        return {
            durationUnit: 'h',
            name: 'New event',
        }
    }

    getDurationMS = (): number => {
        return this.durationMS;
    }
}