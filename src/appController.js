import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
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
        const containerWithProjects =
            this.getContainerWithProjects(projectType);

        return containerWithProjects[projectIndex];
    }

    static getProjectName(projectType, projectIndex) {
        const project = this.getProject(projectType, projectIndex);

        return project.getName();
    }

    static getProjectTasks(projectType, projectIndex) {
        const project = this.getProject(projectType, projectIndex);

        return project.getTasksList();
    }

    static getProjectNotes(projectType, projectIndex) {
        const project = this.getProject(projectType, projectIndex);

        return project.getNotes();
    }

    static addNewUserProject(newProjectName, newProjectNotes) {
        const containerWithProjects =
            this.getContainerWithProjects('userProject');

        containerWithProjects.push(
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

    static changeStatusOfTask(projectType, projectIndex, taskIndex) {
        const getProjectTasksList = this.getProjectTasks(
            projectType,
            projectIndex
        );

        getProjectTasksList[taskIndex].changeIsDone();
    }

    static getTask(projectType, projectIndex, taskIndex) {
        const projectTasks = this.getProjectTasks(projectType, projectIndex);

        return projectTasks[taskIndex];
    }

    static changePriorityOfOverdueTasks(projectType, projectIndex) {
        const project = this.getProject(projectType, projectIndex);
        const projectTasks = this.getProjectTasks(projectType, projectIndex);

        for (let i = 0; i < projectTasks.length; i++) {
            const priority = +projectTasks[i].getPriorityInDigit();

            if (
                differenceInCalendarDays(
                    new Date(),
                    new Date(projectTasks[i].getChangePriorityDate())
                ) > 3
            ) {
                projectTasks[i].setNewPriority((priority - 1).toString());
                projectTasks[i].setNewChangePriorityDate(new Date());
            }
        }

        project.sortTasksByPriority();
    }

    static addNewTaskToProject(
        projectType,
        projectIndex,
        taskName,
        taskPriority,
        taskDueDate,
        taskNotes,
        taskIsDone,
        taskChangePriorityDate
    ) {
        const project = appController.getProject(projectType, projectIndex);

        project.addTasksToList(
            new BasicTask(
                taskName,
                taskPriority,
                taskDueDate,
                taskNotes,
                taskIsDone,
                taskChangePriorityDate
            )
        );
    }

    static removeTaskFromProject(projectType, projectIndex, taskIndex) {
        const project = this.getProject(projectType, projectIndex);

        project.removeTaskFromList(taskIndex);
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
        const project = this.getProject(projectType, projectIndex);

        project.setNewName(newProjectName);
        project.setNewNotes(newProjectNotes);
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
