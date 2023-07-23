import { format } from 'date-fns';
import BasicClassPattern from './BasicClassPattern';

export default class BasicTask extends BasicClassPattern {
    constructor(name, priority, notes, dueDate, isDone, changePriorityDate) {
        super(name);
        this.priority = priority;
        this.dueDate = new Date(dueDate) || new Date();
        this.notes = notes;
        this.isDone = isDone || false;
        this.changePriorityDate = changePriorityDate || this.dueDate;
    }

    setNewPriority(newPriority) {
        this.priority = newPriority;
    }

    changePriorityValueToStr() {
        if (this.priority === '1') {
            return 'high';
        }
        if (this.priority === '2') {
            return 'medium';
        }

        return 'low';
    }

    getPriorityInDigit() {
        return this.priority;
    }

    getPriorityInStr() {
        return this.changePriorityValueToStr();
    }

    setNewNotes(newNotes) {
        this.notes = newNotes;
    }

    getNotes() {
        return this.notes;
    }

    setDueDate(newDueDate) {
        this.dueDate = newDueDate || this.dueDate;
    }

    getDueDate() {
        return format(new Date(this.dueDate), 'dd/MM/yyyy');
    }

    changeIsDone() {
        this.isDone = !this.isDone;
    }

    checkIsDone() {
        return this.isDone;
    }

    getChangePriorityDate() {
        return this.changePriorityDate;
    }

    setNewChangePriorityDate(newChangePriorityDate) {
        this.changePriorityDate = newChangePriorityDate;
    }
}
