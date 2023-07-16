import BasicClassPattern from './BasicClassPattern';

export default class BasicProject extends BasicClassPattern {
    constructor(name) {
        super(name);
        this.tasksList = [];
        this.type = 'basicProject';
    }

    sortTasksByPriority() {
        this.tasksList.sort((a, b) => a.priority - b.priority);
    }

    addTasksToList(newTask) {
        this.tasksList.push(newTask);
        this.sortTasksByPriority();
    }

    getTasksList() {
        return this.tasksList;
    }

    removeTaskFromList(i) {
        this.tasksList.splice(i, 1);
    }

    getProjectType() {
        return this.type;
    }
}
