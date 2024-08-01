import { SchedulerEventModel } from "@bryntum/schedulerpro";


export default class Task extends SchedulerEventModel {
    static get $name() {
        return 'Task';
    }

    static get defaults() {
        return {
            durationUnit: 'h',
            name: 'New event',
            iconCls: 'b-fa b-fa-calendar',
        }
    }

    getDurationMS = (): number => {
        return this.durationMS;
    }
}