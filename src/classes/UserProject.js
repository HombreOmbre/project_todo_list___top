import BasicProject from './BasicProject';

export default class UserProject extends BasicProject {
    constructor(name, notes) {
        super(name);
        this.notes = notes;
        this.type = 'userProject';
    }

    setNewNotes(newNotes) {
        this.notes = newNotes;
    }

    getNotes() {
        return this.notes;
    }

    getProjectType() {
        return this.type;
    }
}
