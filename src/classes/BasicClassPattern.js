export default class BasicClassPattern {
    constructor(name) {
        this.name = name;
    }

    setNewName(newName) {
        this.name = newName;
    }

    getName() {
        return this.name;
    }
}
