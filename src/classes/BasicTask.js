import BasicClassPattern from './BasicClassPattern';

export default class BasicTask extends BasicClassPattern {
    constructor(name, priority, notes, dueDate) {
        super(name);
        this.priority = priority;
        this.dueDate =
            dueDate ||
            `${new Date().getFullYear()}-${
                +new Date().getMonth() < 10
                    ? `0${new Date().getMonth()}`
                    : new Date().getMonth()
            }-${new Date().getDate()}`;
        this.notes = notes;
        this.isDone = false;
    }

    setNewPriority(newPriority) {
        this.priority = newPriority;
    }

    changePriorityValueToStr() {
        if (+this.priority === 1) {
            return 'high';
        }

        if (+this.priority === 2) {
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
        this.dueDate = newDueDate;
    }

    getDueDate() {
        return this.dueDate;
    }

    changeIsDone() {
        this.isDone = !this.isDone;
    }

    checkIsDone() {
        return this.isDone;
    }
}
