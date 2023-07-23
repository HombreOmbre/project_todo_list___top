import appController from './appController';
import storageController from './storageController';

export default class UIController {
    // Render projects
    static renderProjectList(listOfProjects, listType) {
        const listsForProjects = document.querySelectorAll(
            '.projects_container_list'
        );

        let containerForProjects = '';
        for (let i = 0; i < listOfProjects.length; i++) {
            containerForProjects += `
                <li>
                    <button type='button' class='btn project ${
                        listOfProjects[i].getProjectType() === 'basicProject'
                            ? 'basic_project'
                            : 'user_project'
                    }' data-index='${i}' data-type='${listOfProjects[
                i
            ].getProjectType()}'>${listOfProjects[i].getName()}
                    </button>
                </li>
            `;
        }

        if (listType === 'basicProject') {
            listsForProjects[0].innerHTML = containerForProjects;
        } else if (listType === 'userProject') {
            listsForProjects[1].innerHTML = containerForProjects;
        }
    }

    // Render tasks
    static renderProjectTasks(projectList) {
        const containerForTasks = document.querySelector(
            '.tasks_container_list'
        );

        containerForTasks.innerHTML = '';

        if (projectList.length === 0) {
            containerForTasks.innerHTML = `
                <li>
                    <p class='info_alert'>Add first task by clicking button below</p>
                </li>
            `;
        } else {
            for (let i = 0; i < projectList.length; i++) {
                const priority = projectList[i].getPriorityInStr();

                containerForTasks.innerHTML += `
                    <li>
                        <div class='task_box ${priority}_priority' >
                            <div class='top'>
                                <button class="task_name btn" data-index='${i}'>${projectList[
                    i
                ].getName()}
                                </button>
                                <div class='top_right'>
                                    <button class='close_task_btn btn ${
                                        projectList[i].checkIsDone() === false
                                            ? ''
                                            : 'show'
                                    }' data-index='${i}'>X</button>
                                    <button class='checkbox ${
                                        projectList[i].checkIsDone() === false
                                            ? ''
                                            : 'checked'
                                    }' data-index='${i}'></button>
                                </div> 
                            </div>
                            <div class='details'>
                                <div class='medium'>
                                    <div class='medium_left'>
                                        <p class="detail">Priority: 
                                            <span class='value priority'>${
                                                priority
                                                    .split('')[0]
                                                    .toUpperCase() +
                                                priority
                                                    .split('')
                                                    .slice(1)
                                                    .join('')
                                            }</span>
                                        </p>
                                    </div>
                                    <div class='medium_right'>
                                        <p class='detail'>Due date: 
                                            <span class='value'>${projectList[
                                                i
                                            ].getDueDate()}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div class='bottom'>
                                    <div class='container_task_settings btn'>
                                        <p class='detail'>Notes:</p>
                                        <button type="button" class="task_settings btn" data-index='${i}'>
                                            <img src="./img/settings_icon.svg" alt="Settings icon" class="settings">
                                        </button>
                                    </div>
                                    <div class='notes_txt'>
                                        ${projectList[i].getNotes()}
                                    </div>
                                </div>
                            </div>
                            <div class='done ${
                                projectList[i].checkIsDone() === false
                                    ? ''
                                    : 'task_done'
                            }'</div>
                        </div>
                    </li>
                `;
            }
        }
    }

    // Events for tasks
    static showTaskDetails(e) {
        const tasksDetails = document.querySelectorAll('.details');
        const indexOfTask = e.target.dataset.index;

        tasksDetails[indexOfTask].classList.toggle('show');
    }

    static changeTaskStatus(e) {
        const projectDetails = document.querySelector('.task_title').dataset;
        const checkboxBtns = document.querySelectorAll('.checkbox');
        const closeBtns = document.querySelectorAll('.close_task_btn');
        const taskIsDone = document.querySelectorAll('.done');
        const indexOfTask = e.target.dataset.index;

        appController.changeStatusOfTask(
            projectDetails.type,
            projectDetails.index,
            indexOfTask
        );

        checkboxBtns[indexOfTask].classList.toggle('checked');
        closeBtns[indexOfTask].classList.toggle('show');
        taskIsDone[indexOfTask].classList.toggle('task_done');

        UIController.addEventListenersToTasks();

        UIController.showRemoveButtonInUserProjects();

        storageController.manageDataInLocalStorage(
            projectDetails.type,
            appController.getContainerWithProjects(projectDetails.type)
        );
    }

    static removeTask(e) {
        const taskIndex = e.target.dataset.index;
        const projectDetails = document.querySelector('.task_title').dataset;

        appController.removeTaskFromProject(
            projectDetails.type,
            projectDetails.index,
            taskIndex
        );

        UIController.renderProjectTasks(
            appController.getProjectTasks(
                projectDetails.type,
                projectDetails.index
            )
        );
        UIController.addEventListenersToTasks();

        UIController.showRemoveButtonInUserProjects();

        storageController.manageDataInLocalStorage(
            projectDetails.type,
            appController.getContainerWithProjects(projectDetails.type)
        );
    }

    static removeProjectFromList() {
        const projectDetails = document.querySelector('.task_title').dataset;

        appController.removeProject(projectDetails.index);

        storageController.manageDataInLocalStorage(
            projectDetails.type,
            appController.getContainerWithProjects(projectDetails.type)
        );

        UIController.renderMainProject();
    }

    // Add new task
    static addEventListenersToTasks() {
        const tasksTitles = document.querySelectorAll('.task_name');
        const tasksCheckboxes = document.querySelectorAll('.checkbox');
        const closeTaskBtns = document.querySelectorAll('.close_task_btn');
        const tasksSettingsBtns = document.querySelectorAll('.task_settings');

        tasksTitles.forEach((title) =>
            title.addEventListener('click', UIController.showTaskDetails)
        );

        tasksCheckboxes.forEach((checkbox) =>
            checkbox.addEventListener('click', UIController.changeTaskStatus)
        );

        closeTaskBtns.forEach((closeTask) =>
            closeTask.addEventListener('click', UIController.removeTask)
        );

        tasksSettingsBtns.forEach((task) =>
            task.addEventListener('click', UIController.showModalForNewTask)
        );
    }

    static fillTaskModalWithTaskDetails(projectType, projectIndex, taskIndex) {
        const task = appController.getTask(
            projectType,
            projectIndex,
            taskIndex
        );

        const newTaskName = document.querySelector('#newTaskName');
        const newTaskPriority = document.querySelector('#priorityTask');
        const newTaskNotes = document.querySelector('#newTaskNotes');
        const newDueDate = document.querySelector('#taskDueDate');

        newTaskName.value = task.getName();
        newTaskPriority.value = task.getPriorityInDigit();
        newTaskNotes.value = task.getNotes();
        newDueDate.value = task.getDueDate();
    }

    static updateTaskDetails(e) {
        e.preventDefault();

        const taskIndex = e.target.dataset.index;
        const projectDetails = document.querySelector('.task_title').dataset;
        const newTaskName = document.querySelector('#newTaskName').value;
        const newTaskPriority = document.querySelector('#priorityTask').value;
        const newTaskNotes = document.querySelector('#newTaskNotes').value;
        const newDueDate = document.querySelector('#taskDueDate').valueAsDate;

        appController.updateTaskDetails(
            projectDetails.type,
            projectDetails.index,
            taskIndex,
            newTaskName,
            newTaskPriority,
            newTaskNotes,
            newDueDate
        );

        appController.changePriorityOfOverdueTasks(
            projectDetails.type,
            projectDetails.index
        );

        UIController.renderProjectTasks(
            appController.getProjectTasks(
                projectDetails.type,
                projectDetails.index
            )
        );

        UIController.renderProjectTasks(
            appController.getProjectTasks(
                projectDetails.type,
                projectDetails.index
            )
        );

        UIController.addEventListenersToTasks();

        UIController.hideModalForNewTask();

        UIController.showRemoveButtonInUserProjects();

        storageController.manageDataInLocalStorage(
            projectDetails.type,
            appController.getContainerWithProjects(projectDetails.type)
        );
    }

    static addNewTask(e) {
        e.preventDefault();

        const projectDetails = document.querySelector('.task_title').dataset;
        const newTaskName = document.querySelector('#newTaskName').value;
        const newTaskPriority = document.querySelector('#priorityTask').value;
        const newTaskNotes = document.querySelector('#newTaskNotes').value;
        const newDueDate = document.querySelector('#taskDueDate').valueAsDate;

        appController.addNewTaskToProject(
            projectDetails.type,
            projectDetails.index,
            newTaskName,
            newTaskPriority,
            newTaskNotes,
            newDueDate
        );

        appController.changePriorityOfOverdueTasks(
            projectDetails.type,
            projectDetails.index
        );

        UIController.renderProjectTasks(
            appController.getProjectTasks(
                projectDetails.type,
                projectDetails.index
            )
        );

        UIController.clearInputsForNewTask();

        UIController.addEventListenersToTasks();

        UIController.hideModalForNewTask();

        UIController.showRemoveButtonInUserProjects();

        storageController.manageDataInLocalStorage(
            projectDetails.type,
            appController.getContainerWithProjects(projectDetails.type)
        );
    }

    static clearInputsForNewTask() {
        document.querySelector('#newTaskName').value = '';
        document.querySelector('#priorityTask').value = '1';
        document.querySelector('#newTaskNotes').value = '';
        document.querySelector('#taskDueDate').value = '';
    }

    static hideModalForNewTask(e) {
        if (e === undefined) {
            document
                .querySelector('.modal_for_task')
                .classList.remove('show_modal');
            UIController.clearInputsForNewTask();
            return;
        }
        if (e.target.classList[0] === 'modal_for_task') {
            e.target.classList.remove('show_modal');
            UIController.clearInputsForNewTask();
            return;
        }
        if (e.target.classList[1] === 'close_task_modal') {
            document
                .querySelector('.modal_for_task')
                .classList.remove('show_modal');
            UIController.clearInputsForNewTask();
        }
    }

    static showModalForNewTask(e) {
        const modalForNewTask = document.querySelector('.modal_for_task');
        const closeBtn = document.querySelector('.close_task_modal');
        const addNewTaskBtn = document.querySelector('.new_task_modal');
        const upadteNewTaskBtn = document.querySelector('.update_task_modal');
        const projectDetails = document.querySelector('.task_title').dataset;

        modalForNewTask.classList.add('show_modal');

        if (e.target.classList[0] === 'new_task') {
            upadteNewTaskBtn.classList.remove('show');
            addNewTaskBtn.classList.add('show');
            addNewTaskBtn.addEventListener('click', UIController.addNewTask);
        } else if (e.target.classList[0] === 'settings') {
            addNewTaskBtn.classList.remove('show');
            upadteNewTaskBtn.classList.add('show');
            upadteNewTaskBtn.dataset.index = this.dataset.index;
            UIController.fillTaskModalWithTaskDetails(
                projectDetails.type,
                projectDetails.index,
                this.dataset.index
            );
            upadteNewTaskBtn.addEventListener(
                'click',
                UIController.updateTaskDetails
            );
        }

        modalForNewTask.addEventListener(
            'click',
            UIController.hideModalForNewTask
        );

        closeBtn.addEventListener('click', UIController.hideModalForNewTask);
    }

    // Add new project
    static addNewProject(e) {
        e.preventDefault();
        const newProjectName = document.querySelector('#newProjectName').value;
        const newProjectNotes =
            document.querySelector('#newProjectNotes').value || '';
        appController.addNewUserProject(newProjectName, newProjectNotes);
        UIController.renderProjectList(
            appController.getContainerWithProjects('userProject'),
            'userProject'
        );
        UIController.addEventListenersToPage();
        UIController.hideModalForNewProject();

        storageController.manageDataInLocalStorage(
            'userProject',
            appController.getContainerWithProjects('userProject')
        );
    }

    static clearInputsForNewProject() {
        document.querySelector('#newProjectName').value = '';
        document.querySelector('#newProjectNotes').value = '';
    }

    static hideModalForNewProject(e) {
        if (e === undefined) {
            document
                .querySelector('.modal_for_project')
                .classList.remove('show_modal');
            UIController.clearInputsForNewProject();
            return;
        }
        if (e.target.classList[0] === 'modal_for_project') {
            e.target.classList.remove('show_modal');
            UIController.clearInputsForNewProject();
            return;
        }
        if (e.target.classList[1] === 'close_project_modal') {
            document
                .querySelector('.modal_for_project')
                .classList.remove('show_modal');
            UIController.clearInputsForNewProject();
        }
    }

    static updateProjectDetails(e) {
        e.preventDefault();
        const projectDetails = document.querySelector('.task_title').dataset;
        const newProjectName = document.querySelector('#newProjectName').value;
        const newProjectNotes =
            document.querySelector('#newProjectNotes').value;

        appController.updateProjectDetails(
            projectDetails.type,
            projectDetails.index,
            newProjectName,
            newProjectNotes
        );

        UIController.showProjectName(
            appController.getProjectName(
                projectDetails.type,
                projectDetails.index
            ),
            projectDetails.index,
            projectDetails.type
        );

        UIController.setProjectNotes(
            appController.getProjectNotes(
                projectDetails.type,
                projectDetails.index
            )
        );

        UIController.renderProjectList(
            appController.getContainerWithProjects('userProject'),
            'userProject'
        );

        UIController.hideModalForNewProject();

        UIController.addEventListenersToPage();

        UIController.setActiveClass('', projectDetails.index);

        storageController.manageDataInLocalStorage(
            projectDetails.type,
            appController.getContainerWithProjects(projectDetails.type)
        );
    }

    static fillProjectModalWithProjectDetails() {
        const projectDetails = document.querySelector('.task_title');
        const projectNameInput = document.querySelector('#newProjectName');
        const projectNotesInput = document.querySelector('#newProjectNotes');

        projectNameInput.value = appController.getProjectName(
            projectDetails.dataset.type,
            projectDetails.dataset.index
        );
        projectNotesInput.value = appController.getProjectNotes(
            projectDetails.dataset.type,
            projectDetails.dataset.index
        );
    }

    static showModalForNewProject(e) {
        const modalForNewProject = document.querySelector('.modal_for_project');
        const closeBtn = document.querySelector('.close_project_modal');
        const addNewProjectBtn = document.querySelector('.new_project');
        const changeProjectValueBtn = document.querySelector(
            '.update_project_modal'
        );

        modalForNewProject.classList.add('show_modal');

        if (e.target.classList[0] === 'add_project') {
            addNewProjectBtn.classList.add('show');
            changeProjectValueBtn.classList.remove('show');
            addNewProjectBtn.addEventListener(
                'click',
                UIController.addNewProject
            );
        } else if (e.target.classList[0] === 'settings') {
            UIController.fillProjectModalWithProjectDetails();
            changeProjectValueBtn.classList.add('show');
            addNewProjectBtn.classList.remove('show');
            changeProjectValueBtn.addEventListener(
                'click',
                UIController.updateProjectDetails
            );
        }

        modalForNewProject.addEventListener(
            'click',
            UIController.hideModalForNewProject
        );

        closeBtn.addEventListener('click', UIController.hideModalForNewProject);
    }

    // Show project details
    static toggleForProjectNotes() {
        const projectType = document.querySelector('.task_title').dataset.type;
        const projectNotesContainer = document.querySelector(
            '.project_notes_container'
        );

        if (projectType === 'userProject') {
            projectNotesContainer.classList.toggle('show_notes');
        }
    }

    static showRemoveButtonInUserProjects() {
        const projectDetails = document.querySelector('.task_title');
        const projectTasksList = appController.getProjectTasks(
            projectDetails.dataset.type,
            projectDetails.dataset.index
        );
        const btnToRemoveProject = document.querySelector(
            '.remove_project_btn'
        );

        if (projectDetails.dataset.type === 'basicProject') {
            btnToRemoveProject.classList.remove('show');
        } else if (projectDetails.dataset.type === 'userProject') {
            if (
                projectTasksList.length === 0 ||
                appController.checkIfAllTasksAreDone(
                    projectDetails.dataset.index
                )
            ) {
                btnToRemoveProject.classList.add('show');
            } else {
                btnToRemoveProject.classList.remove('show');
            }
        }
    }

    static setActiveClass(projectTarget, projectIndex) {
        const projectsList = document.querySelectorAll('.project');

        projectsList.forEach((project) => {
            project.classList.remove('active');
        });

        if (projectTarget === '') {
            projectsList[+projectIndex + 2].classList.add('active');
            return;
        }
        projectTarget.classList.add('active');
    }

    static showProjectName(projectName, index, type) {
        const projectTitle = document.querySelector('.project_title');
        const projectTitleContainer = document.querySelector('.task_title');

        projectTitle.textContent = projectName;
        projectTitleContainer.dataset.index = index;
        projectTitleContainer.dataset.type = type;
    }

    static setProjectNotes(projectNotes) {
        const projectNotesContainer = document.querySelector('.project_notes');

        projectNotesContainer.textContent = projectNotes;
    }

    static showProjectDetails(e) {
        let projectType;
        let projectIndex;
        let projectTarget;

        if (e === undefined) {
            projectType = 'basicProject';
            projectIndex = 0;
            projectTarget = document.querySelector('.project');
        } else {
            projectType = e.target.dataset.type;
            projectIndex = e.target.dataset.index;
            projectTarget = e.target;
        }

        UIController.showProjectName(
            appController.getProjectName(projectType, projectIndex),
            projectIndex,
            projectType
        );

        if (projectType === 'userProject') {
            UIController.setProjectNotes(
                appController.getProjectNotes(projectType, projectIndex)
            );
        }

        appController.changePriorityOfOverdueTasks(projectType, projectIndex);

        UIController.renderProjectTasks(
            appController.getProjectTasks(projectType, projectIndex)
        );

        UIController.showRemoveButtonInUserProjects();

        UIController.setActiveClass(projectTarget, '');

        UIController.addEventListenersToTasks();
    }

    static addEventListenersToPage() {
        const basicProjects = document.querySelectorAll('.basic_project');
        const userProjects = document.querySelectorAll('.user_project');
        const addNewProjectBtn = document.querySelector('.add_project');
        const addNewTaskBtn = document.querySelector('.new_task');
        const projectTitleContainer = document.querySelector('.project_title');
        const removeProjectBtn = document.querySelector('.remove_project_btn');
        const settingsProjectBtn = document.querySelector('.project_settings');

        basicProjects.forEach((project) => {
            project.addEventListener('click', this.showProjectDetails);
        });

        userProjects.forEach((project) => {
            project.addEventListener('click', this.showProjectDetails);
        });

        addNewProjectBtn.addEventListener('click', this.showModalForNewProject);

        settingsProjectBtn.addEventListener(
            'click',
            this.showModalForNewProject
        );

        addNewTaskBtn.addEventListener('click', this.showModalForNewTask);

        projectTitleContainer.addEventListener(
            'click',
            this.toggleForProjectNotes
        );

        removeProjectBtn.addEventListener(
            'click',
            UIController.removeProjectFromList
        );
    }

    // Render Main project
    static renderMainProject() {
        UIController.renderProjectList(
            appController.getContainerWithProjects('basicProject'),
            'basicProject'
        );
        UIController.renderProjectList(
            appController.getContainerWithProjects('userProject'),
            'userProject'
        );

        UIController.showProjectDetails();

        this.addEventListenersToPage();
    }

    static firstPageRender() {
        storageController.getDataFromLocalStorage('basicProject');

        storageController.getDataFromLocalStorage('userProject');

        UIController.renderMainProject();
    }
}
