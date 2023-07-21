import appController from './appController';

export default class storageController {
    static addTasksToProjects(data) {
        JSON.parse(data).forEach((project, index) => {
            for (let i = 0; i < project.tasksList.length; i++) {
                appController.addNewTaskToProject(
                    project.type,
                    index,
                    project.tasksList[i].name,
                    project.tasksList[i].priority,
                    project.tasksList[i].dueDate,
                    project.tasksList[i].notes,
                    project.tasksList[i].isDone
                );
            }
        });
    }

    static addUserProjectsToContainer(data) {
        JSON.parse(data).forEach((project) => {
            appController.addNewUserProject(project.name, project.notes);
        });
    }

    static getDataFromLocalStorage(projectType) {
        if (localStorage.getItem(projectType)) {
            if (projectType === 'userProject') {
                this.addUserProjectsToContainer(
                    localStorage.getItem(projectType)
                );
            }

            this.addTasksToProjects(localStorage.getItem(projectType));
        }
    }

    static checkIfContainerTaskListIsEmpty(projectList) {
        return projectList.every((project) => project.tasksList.length === 0);
    }

    static removeDataFromLocalStorage(projectType) {
        localStorage.removeItem(projectType);
    }

    static manageDataInLocalStorage(projectType, containerWithProjects) {
        if (containerWithProjects.length === 0) {
            this.removeDataFromLocalStorage(projectType);
            return;
        }

        if (
            projectType === 'basicProject' &&
            this.checkIfContainerTaskListIsEmpty(containerWithProjects)
        ) {
            this.removeDataFromLocalStorage(projectType);
            return;
        }

        localStorage.setItem(
            projectType,
            JSON.stringify(containerWithProjects)
        );
    }
}
