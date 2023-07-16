import BasicProject from './classes/BasicProject';
import BasicTask from './classes/BasicTask';
import UserProject from './classes/UserProject';

export default class appController {
    static containerForBasicProjects = [
        new BasicProject('Daily Tasks'),
        new BasicProject('Grocery List'),
    ];

    static containerForUserProjects = [];

    static getContainerWithProjects(projectType) {
        let containerForProjects;
        if (projectType === 'basicProject') {
            containerForProjects = this.containerForBasicProjects;
        } else if (projectType === 'userProject') {
            containerForProjects = this.containerForUserProjects;
        }
        return containerForProjects;
    }

    static getProject(projectType, projectIndex) {
        let projectToShow;
        if (projectType === 'basicProject') {
            projectToShow = this.containerForBasicProjects;
        } else if (projectType === 'userProject') {
            projectToShow = this.containerForUserProjects;
        }

        return projectToShow[projectIndex];
    }

    static getProjectName(projectType, projectIndex) {
        const projectName = this.getProject(projectType, projectIndex);

        return projectName.getName();
    }

    static getProjectTasks(projectType, projectIndex) {
        let projectTasks;
        if (projectType === 'basicProject') {
            projectTasks =
                this.containerForBasicProjects[projectIndex].getTasksList();
        } else if (projectType === 'userProject') {
            projectTasks =
                this.containerForUserProjects[projectIndex].getTasksList();
        }

        return projectTasks;
    }

    static getProjectNotes(projectType, projectIndex) {
        const project = this.getProject(projectType, projectIndex);

        return project.getNotes();
    }

    static addNewUserProject(newProjectName, newProjectNotes) {
        this.containerForUserProjects.push(
            new UserProject(newProjectName, newProjectNotes)
        );
    }

    static checkIfAllTasksAreDone(projectIndex) {
        const projectListTasks = this.getProjectTasks(
            'userProject',
            projectIndex
        );

        return projectListTasks.every((task) => task.checkIsDone() === true);
    }

    static searchProjectToAddTask(projectType, projectIndex) {
        let containerWithProject;
        if (projectType === 'basicProject') {
            containerWithProject = this.containerForBasicProjects[projectIndex];
        }
        if (projectType === 'userProject') {
            containerWithProject = this.containerForUserProjects[projectIndex];
        }

        return containerWithProject;
    }

    static changeStatusOfTask(projectType, projectIndex, taskIndex) {
        const getProjectTasksList = this.getProjectTasks(
            projectType,
            projectIndex
        );

        getProjectTasksList[taskIndex].changeIsDone();
    }

    static addNewTaskToProject(
        projectType,
        projectIndex,
        taskName,
        taskPriority,
        taskDueDate,
        taskNotes
    ) {
        const projectToAddTask = appController.searchProjectToAddTask(
            projectType,
            projectIndex
        );

        projectToAddTask.addTasksToList(
            new BasicTask(taskName, taskPriority, taskDueDate, taskNotes)
        );
    }

    static removeTaskFromProject(projectType, projectIndex, taskIndex) {
        const projectToRemoveTask = this.searchProjectToAddTask(
            projectType,
            projectIndex
        );

        projectToRemoveTask.removeTaskFromList(taskIndex);
    }

    static removeProject(projectIndex) {
        const containerWithProjects =
            this.getContainerWithProjects('userProject');

        containerWithProjects.splice(projectIndex, 1);
    }

    static updateProjectDetails(
        projectType,
        projectIndex,
        newProjectName,
        newProjectNotes
    ) {
        const projectToUpdate = this.getProject(projectType, projectIndex);

        projectToUpdate.setNewName(newProjectName);
        projectToUpdate.setNewNotes(newProjectNotes);
    }

    static getTask(projectType, projectIndex, taskIndex) {
        const projectTasks = this.getProjectTasks(projectType, projectIndex);

        return projectTasks[taskIndex];
    }

    static updateTaskDetails(
        projectType,
        projectIndex,
        taskIndex,
        newTaskName,
        newTaskPriority,
        newTaskNotes,
        newTaskDueDate
    ) {
        const task = this.getTask(projectType, projectIndex, taskIndex);
        const project = this.getProject(projectType, projectIndex);

        task.setNewName(newTaskName);
        task.setNewPriority(newTaskPriority);
        task.setNewNotes(newTaskNotes);
        task.setDueDate(newTaskDueDate);

        project.sortTasksByPriority();
    }
}
