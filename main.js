/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UIController.js":
/*!*****************************!*\
  !*** ./src/UIController.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UIController)
/* harmony export */ });
/* harmony import */ var _appController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./appController */ "./src/appController.js");


class UIController {
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
        const getShownProjectDetails = document.querySelector('.task_title');
        const checkboxBtns = document.querySelectorAll('.checkbox');
        const closeBtns = document.querySelectorAll('.close_task_btn');
        const taskIsDone = document.querySelectorAll('.done');
        const indexOfTask = e.target.dataset.index;
        _appController__WEBPACK_IMPORTED_MODULE_0__["default"].changeStatusOfTask(
            getShownProjectDetails.dataset.type,
            getShownProjectDetails.dataset.index,
            indexOfTask
        );

        checkboxBtns[indexOfTask].classList.toggle('checked');
        closeBtns[indexOfTask].classList.toggle('show');
        taskIsDone[indexOfTask].classList.toggle('task_done');

        UIController.showRemoveButtonInUserProjects();
    }

    static removeTask(e) {
        const taskIndex = e.target.dataset.index;
        const getShownProjectDetails = document.querySelector('.task_title');

        _appController__WEBPACK_IMPORTED_MODULE_0__["default"].removeTaskFromProject(
            getShownProjectDetails.dataset.type,
            getShownProjectDetails.dataset.index,
            taskIndex
        );

        UIController.renderProjectTasks(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTasks(
                getShownProjectDetails.dataset.type,
                getShownProjectDetails.dataset.index
            )
        );
        UIController.addEventListenersToTasks();

        UIController.showRemoveButtonInUserProjects();
    }

    static removeProjectFromList() {
        const projectIndex =
            document.querySelector('.task_title').dataset.index;

        _appController__WEBPACK_IMPORTED_MODULE_0__["default"].removeProject(projectIndex);

        UIController.renderBlankPage();
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
        const task = _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getTask(
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
        const newDueDate = document.querySelector('#taskDueDate').value;

        _appController__WEBPACK_IMPORTED_MODULE_0__["default"].updateTaskDetails(
            projectDetails.type,
            projectDetails.index,
            taskIndex,
            newTaskName,
            newTaskPriority,
            newTaskNotes,
            newDueDate
        );

        UIController.renderProjectTasks(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTasks(
                projectDetails.type,
                projectDetails.index
            )
        );

        UIController.renderProjectTasks(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTasks(
                projectDetails.type,
                projectDetails.index
            )
        );

        UIController.addEventListenersToTasks();

        UIController.hideModalForNewTask();

        UIController.showRemoveButtonInUserProjects();
    }

    static addNewTask(e) {
        e.preventDefault();

        const projectType = document.querySelector('.task_title').dataset.type;
        const projectIndex =
            document.querySelector('.task_title').dataset.index;
        const newTaskName = document.querySelector('#newTaskName').value;
        const newTaskPriority = document.querySelector('#priorityTask').value;
        const newTaskNotes = document.querySelector('#newTaskNotes').value;
        const newDueDate = document.querySelector('#taskDueDate').value;

        _appController__WEBPACK_IMPORTED_MODULE_0__["default"].addNewTaskToProject(
            projectType,
            projectIndex,
            newTaskName,
            newTaskPriority,
            newTaskNotes,
            newDueDate
        );

        UIController.renderProjectTasks(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTasks(projectType, projectIndex)
        );

        UIController.clearInputsForNewTask();

        UIController.addEventListenersToTasks();

        UIController.hideModalForNewTask();

        UIController.showRemoveButtonInUserProjects();
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
        _appController__WEBPACK_IMPORTED_MODULE_0__["default"].addNewUserProject(newProjectName, newProjectNotes);
        UIController.renderProjectList(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getContainerWithProjects('userProject'),
            'userProject'
        );
        UIController.addEventListenersToPage();
        UIController.hideModalForNewProject();
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

        _appController__WEBPACK_IMPORTED_MODULE_0__["default"].updateProjectDetails(
            projectDetails.type,
            projectDetails.index,
            newProjectName,
            newProjectNotes
        );

        UIController.showProjectName(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectName(
                projectDetails.type,
                projectDetails.index
            ),
            projectDetails.index,
            projectDetails.type
        );

        UIController.setProjectNotes(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectNotes(
                projectDetails.type,
                projectDetails.index
            )
        );

        UIController.renderProjectList(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getContainerWithProjects('userProject'),
            'userProject'
        );

        UIController.hideModalForNewProject();

        UIController.addEventListenersToPage();

        UIController.setActiveClass('', projectDetails.index);
    }

    static fillProjectModalWithProjectDetails() {
        const projectDetails = document.querySelector('.task_title');
        const projectNameInput = document.querySelector('#newProjectName');
        const projectNotesInput = document.querySelector('#newProjectNotes');

        projectNameInput.value = _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectName(
            projectDetails.dataset.type,
            projectDetails.dataset.index
        );
        projectNotesInput.value = _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectNotes(
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
        const projectTasksList = _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTasks(
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
                _appController__WEBPACK_IMPORTED_MODULE_0__["default"].checkIfAllTasksAreDone(
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
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectName(projectType, projectIndex),
            projectIndex,
            projectType
        );

        if (projectType === 'userProject') {
            UIController.setProjectNotes(
                _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectNotes(projectType, projectIndex)
            );
        }

        UIController.renderProjectTasks(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getProjectTasks(projectType, projectIndex)
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

    // First page render
    static renderBlankPage() {
        UIController.renderProjectList(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getContainerWithProjects('basicProject'),
            'basicProject'
        );
        UIController.renderProjectList(
            _appController__WEBPACK_IMPORTED_MODULE_0__["default"].getContainerWithProjects('userProject'),
            'userProject'
        );

        UIController.showProjectDetails();

        this.addEventListenersToPage();
    }
}


/***/ }),

/***/ "./src/appController.js":
/*!******************************!*\
  !*** ./src/appController.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ appController)
/* harmony export */ });
/* harmony import */ var _classes_BasicProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/BasicProject */ "./src/classes/BasicProject.js");
/* harmony import */ var _classes_BasicTask__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/BasicTask */ "./src/classes/BasicTask.js");
/* harmony import */ var _classes_UserProject__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes/UserProject */ "./src/classes/UserProject.js");




class appController {
    static containerForBasicProjects = [
        new _classes_BasicProject__WEBPACK_IMPORTED_MODULE_0__["default"]('Daily Tasks'),
        new _classes_BasicProject__WEBPACK_IMPORTED_MODULE_0__["default"]('Grocery List'),
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
            new _classes_UserProject__WEBPACK_IMPORTED_MODULE_2__["default"](newProjectName, newProjectNotes)
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
            new _classes_BasicTask__WEBPACK_IMPORTED_MODULE_1__["default"](taskName, taskPriority, taskDueDate, taskNotes)
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


/***/ }),

/***/ "./src/classes/BasicClassPattern.js":
/*!******************************************!*\
  !*** ./src/classes/BasicClassPattern.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicClassPattern)
/* harmony export */ });
class BasicClassPattern {
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


/***/ }),

/***/ "./src/classes/BasicProject.js":
/*!*************************************!*\
  !*** ./src/classes/BasicProject.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicProject)
/* harmony export */ });
/* harmony import */ var _BasicClassPattern__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicClassPattern */ "./src/classes/BasicClassPattern.js");


class BasicProject extends _BasicClassPattern__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/classes/BasicTask.js":
/*!**********************************!*\
  !*** ./src/classes/BasicTask.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BasicTask)
/* harmony export */ });
/* harmony import */ var _BasicClassPattern__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicClassPattern */ "./src/classes/BasicClassPattern.js");


class BasicTask extends _BasicClassPattern__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ }),

/***/ "./src/classes/UserProject.js":
/*!************************************!*\
  !*** ./src/classes/UserProject.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserProject)
/* harmony export */ });
/* harmony import */ var _BasicProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasicProject */ "./src/classes/BasicProject.js");


class UserProject extends _BasicProject__WEBPACK_IMPORTED_MODULE_0__["default"] {
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UIController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UIController */ "./src/UIController.js");


_UIController__WEBPACK_IMPORTED_MODULE_0__["default"].renderBlankPage();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7O0FBRTdCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwyQkFBMkI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQixFQUFFLGVBQWU7QUFDdEQ7QUFDQSwrQkFBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw0QkFBNEIsd0JBQXdCO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsU0FBUztBQUN4RDtBQUNBLDRFQUE0RSxFQUFFLElBQUk7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQkFBZ0IsRUFBRTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQkFBZ0IsRUFBRTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNHQUFzRyxFQUFFO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLHNEQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzREFBYTs7QUFFckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsc0RBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHNEQUFhO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLHNEQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFhO0FBQ3JCO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxzREFBYTtBQUM5QztBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0RBQWE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLHNEQUFhO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQWE7QUFDN0I7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFhO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0b0JrRDtBQUNOO0FBQ0k7O0FBRWpDO0FBQ2Y7QUFDQSxZQUFZLDZEQUFZO0FBQ3hCLFlBQVksNkRBQVk7QUFDeEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLDREQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLDBEQUFTO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3JLZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNab0Q7O0FBRXJDLDJCQUEyQiwwREFBaUI7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdCb0Q7O0FBRXJDLHdCQUF3QiwwREFBaUI7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUseUJBQXlCO0FBQ3hDO0FBQ0EsMEJBQTBCLHNCQUFzQjtBQUNoRDtBQUNBLGFBQWEsR0FBRyxxQkFBcUI7QUFDckM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRTBDOztBQUUzQiwwQkFBMEIscURBQVk7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDcEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEM7O0FBRTFDLHFEQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdF90b2RvX2xpc3RfX190b3AvLi9zcmMvVUlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3Byb2plY3RfdG9kb19saXN0X19fdG9wLy4vc3JjL2FwcENvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90b2RvX2xpc3RfX190b3AvLi9zcmMvY2xhc3Nlcy9CYXNpY0NsYXNzUGF0dGVybi5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC8uL3NyYy9jbGFzc2VzL0Jhc2ljUHJvamVjdC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC8uL3NyYy9jbGFzc2VzL0Jhc2ljVGFzay5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC8uL3NyYy9jbGFzc2VzL1VzZXJQcm9qZWN0LmpzIiwid2VicGFjazovL3Byb2plY3RfdG9kb19saXN0X19fdG9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Byb2plY3RfdG9kb19saXN0X19fdG9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Byb2plY3RfdG9kb19saXN0X19fdG9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcHJvamVjdF90b2RvX2xpc3RfX190b3AvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFwcENvbnRyb2xsZXIgZnJvbSAnLi9hcHBDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDb250cm9sbGVyIHtcbiAgICAvLyBSZW5kZXIgcHJvamVjdHNcbiAgICBzdGF0aWMgcmVuZGVyUHJvamVjdExpc3QobGlzdE9mUHJvamVjdHMsIGxpc3RUeXBlKSB7XG4gICAgICAgIGNvbnN0IGxpc3RzRm9yUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgJy5wcm9qZWN0c19jb250YWluZXJfbGlzdCdcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgY29udGFpbmVyRm9yUHJvamVjdHMgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0T2ZQcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29udGFpbmVyRm9yUHJvamVjdHMgKz0gYFxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdidG4gcHJvamVjdCAke1xuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdE9mUHJvamVjdHNbaV0uZ2V0UHJvamVjdFR5cGUoKSA9PT0gJ2Jhc2ljUHJvamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiYXNpY19wcm9qZWN0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3VzZXJfcHJvamVjdCdcbiAgICAgICAgICAgICAgICAgICAgfScgZGF0YS1pbmRleD0nJHtpfScgZGF0YS10eXBlPScke2xpc3RPZlByb2plY3RzW1xuICAgICAgICAgICAgICAgIGlcbiAgICAgICAgICAgIF0uZ2V0UHJvamVjdFR5cGUoKX0nPiR7bGlzdE9mUHJvamVjdHNbaV0uZ2V0TmFtZSgpfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0VHlwZSA9PT0gJ2Jhc2ljUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGxpc3RzRm9yUHJvamVjdHNbMF0uaW5uZXJIVE1MID0gY29udGFpbmVyRm9yUHJvamVjdHM7XG4gICAgICAgIH0gZWxzZSBpZiAobGlzdFR5cGUgPT09ICd1c2VyUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGxpc3RzRm9yUHJvamVjdHNbMV0uaW5uZXJIVE1MID0gY29udGFpbmVyRm9yUHJvamVjdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW5kZXIgdGFza3NcbiAgICBzdGF0aWMgcmVuZGVyUHJvamVjdFRhc2tzKHByb2plY3RMaXN0KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckZvclRhc2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcudGFza3NfY29udGFpbmVyX2xpc3QnXG4gICAgICAgICk7XG5cbiAgICAgICAgY29udGFpbmVyRm9yVGFza3MuaW5uZXJIVE1MID0gJyc7XG5cbiAgICAgICAgaWYgKHByb2plY3RMaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29udGFpbmVyRm9yVGFza3MuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9J2luZm9fYWxlcnQnPkFkZCBmaXJzdCB0YXNrIGJ5IGNsaWNraW5nIGJ1dHRvbiBiZWxvdzwvcD5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcmlvcml0eSA9IHByb2plY3RMaXN0W2ldLmdldFByaW9yaXR5SW5TdHIoKTtcblxuICAgICAgICAgICAgICAgIGNvbnRhaW5lckZvclRhc2tzLmlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3Rhc2tfYm94ICR7cHJpb3JpdHl9X3ByaW9yaXR5JyA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ndG9wJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRhc2tfbmFtZSBidG5cIiBkYXRhLWluZGV4PScke2l9Jz4ke3Byb2plY3RMaXN0W1xuICAgICAgICAgICAgICAgICAgICBpXG4gICAgICAgICAgICAgICAgXS5nZXROYW1lKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSd0b3BfcmlnaHQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nY2xvc2VfdGFza19idG4gYnRuICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdExpc3RbaV0uY2hlY2tJc0RvbmUoKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdzaG93J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfScgZGF0YS1pbmRleD0nJHtpfSc+WDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nY2hlY2tib3ggJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdFtpXS5jaGVja0lzRG9uZSgpID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2NoZWNrZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9JyBkYXRhLWluZGV4PScke2l9Jz48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2RldGFpbHMnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdtZWRpdW0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nbWVkaXVtX2xlZnQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZGV0YWlsXCI+UHJpb3JpdHk6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ndmFsdWUgcHJpb3JpdHknPiR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlvcml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnJylbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudG9VcHBlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmlvcml0eVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuam9pbignJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J21lZGl1bV9yaWdodCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9J2RldGFpbCc+RHVlIGRhdGU6IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ndmFsdWUnPiR7cHJvamVjdExpc3RbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0uZ2V0RHVlRGF0ZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdib3R0b20nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29udGFpbmVyX3Rhc2tfc2V0dGluZ3MgYnRuJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz0nZGV0YWlsJz5Ob3Rlczo8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ0YXNrX3NldHRpbmdzIGJ0blwiIGRhdGEtaW5kZXg9JyR7aX0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi4vaW1nL3NldHRpbmdzX2ljb24uc3ZnXCIgYWx0PVwiU2V0dGluZ3MgaWNvblwiIGNsYXNzPVwic2V0dGluZ3NcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nbm90ZXNfdHh0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Byb2plY3RMaXN0W2ldLmdldE5vdGVzKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZG9uZSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0TGlzdFtpXS5jaGVja0lzRG9uZSgpID09PSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGFza19kb25lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0nPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXZlbnRzIGZvciB0YXNrc1xuICAgIHN0YXRpYyBzaG93VGFza0RldGFpbHMoZSkge1xuICAgICAgICBjb25zdCB0YXNrc0RldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGV0YWlscycpO1xuICAgICAgICBjb25zdCBpbmRleE9mVGFzayA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG5cbiAgICAgICAgdGFza3NEZXRhaWxzW2luZGV4T2ZUYXNrXS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNoYW5nZVRhc2tTdGF0dXMoZSkge1xuICAgICAgICBjb25zdCBnZXRTaG93blByb2plY3REZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKTtcbiAgICAgICAgY29uc3QgY2hlY2tib3hCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNoZWNrYm94Jyk7XG4gICAgICAgIGNvbnN0IGNsb3NlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZV90YXNrX2J0bicpO1xuICAgICAgICBjb25zdCB0YXNrSXNEb25lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRvbmUnKTtcbiAgICAgICAgY29uc3QgaW5kZXhPZlRhc2sgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgICBhcHBDb250cm9sbGVyLmNoYW5nZVN0YXR1c09mVGFzayhcbiAgICAgICAgICAgIGdldFNob3duUHJvamVjdERldGFpbHMuZGF0YXNldC50eXBlLFxuICAgICAgICAgICAgZ2V0U2hvd25Qcm9qZWN0RGV0YWlscy5kYXRhc2V0LmluZGV4LFxuICAgICAgICAgICAgaW5kZXhPZlRhc2tcbiAgICAgICAgKTtcblxuICAgICAgICBjaGVja2JveEJ0bnNbaW5kZXhPZlRhc2tdLmNsYXNzTGlzdC50b2dnbGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgY2xvc2VCdG5zW2luZGV4T2ZUYXNrXS5jbGFzc0xpc3QudG9nZ2xlKCdzaG93Jyk7XG4gICAgICAgIHRhc2tJc0RvbmVbaW5kZXhPZlRhc2tdLmNsYXNzTGlzdC50b2dnbGUoJ3Rhc2tfZG9uZScpO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5zaG93UmVtb3ZlQnV0dG9uSW5Vc2VyUHJvamVjdHMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlVGFzayhlKSB7XG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGNvbnN0IGdldFNob3duUHJvamVjdERldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpO1xuXG4gICAgICAgIGFwcENvbnRyb2xsZXIucmVtb3ZlVGFza0Zyb21Qcm9qZWN0KFxuICAgICAgICAgICAgZ2V0U2hvd25Qcm9qZWN0RGV0YWlscy5kYXRhc2V0LnR5cGUsXG4gICAgICAgICAgICBnZXRTaG93blByb2plY3REZXRhaWxzLmRhdGFzZXQuaW5kZXgsXG4gICAgICAgICAgICB0YXNrSW5kZXhcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIucmVuZGVyUHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRQcm9qZWN0VGFza3MoXG4gICAgICAgICAgICAgICAgZ2V0U2hvd25Qcm9qZWN0RGV0YWlscy5kYXRhc2V0LnR5cGUsXG4gICAgICAgICAgICAgICAgZ2V0U2hvd25Qcm9qZWN0RGV0YWlscy5kYXRhc2V0LmluZGV4XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIFVJQ29udHJvbGxlci5hZGRFdmVudExpc3RlbmVyc1RvVGFza3MoKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2hvd1JlbW92ZUJ1dHRvbkluVXNlclByb2plY3RzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZVByb2plY3RGcm9tTGlzdCgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX3RpdGxlJykuZGF0YXNldC5pbmRleDtcblxuICAgICAgICBhcHBDb250cm9sbGVyLnJlbW92ZVByb2plY3QocHJvamVjdEluZGV4KTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIucmVuZGVyQmxhbmtQYWdlKCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIG5ldyB0YXNrXG4gICAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJzVG9UYXNrcygpIHtcbiAgICAgICAgY29uc3QgdGFza3NUaXRsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFza19uYW1lJyk7XG4gICAgICAgIGNvbnN0IHRhc2tzQ2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveCcpO1xuICAgICAgICBjb25zdCBjbG9zZVRhc2tCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNsb3NlX3Rhc2tfYnRuJyk7XG4gICAgICAgIGNvbnN0IHRhc2tzU2V0dGluZ3NCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfc2V0dGluZ3MnKTtcblxuICAgICAgICB0YXNrc1RpdGxlcy5mb3JFYWNoKCh0aXRsZSkgPT5cbiAgICAgICAgICAgIHRpdGxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUlDb250cm9sbGVyLnNob3dUYXNrRGV0YWlscylcbiAgICAgICAgKTtcblxuICAgICAgICB0YXNrc0NoZWNrYm94ZXMuZm9yRWFjaCgoY2hlY2tib3gpID0+XG4gICAgICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJQ29udHJvbGxlci5jaGFuZ2VUYXNrU3RhdHVzKVxuICAgICAgICApO1xuXG4gICAgICAgIGNsb3NlVGFza0J0bnMuZm9yRWFjaCgoY2xvc2VUYXNrKSA9PlxuICAgICAgICAgICAgY2xvc2VUYXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUlDb250cm9sbGVyLnJlbW92ZVRhc2spXG4gICAgICAgICk7XG5cbiAgICAgICAgdGFza3NTZXR0aW5nc0J0bnMuZm9yRWFjaCgodGFzaykgPT5cbiAgICAgICAgICAgIHRhc2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSUNvbnRyb2xsZXIuc2hvd01vZGFsRm9yTmV3VGFzaylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmlsbFRhc2tNb2RhbFdpdGhUYXNrRGV0YWlscyhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICAgICAgY29uc3QgdGFzayA9IGFwcENvbnRyb2xsZXIuZ2V0VGFzayhcbiAgICAgICAgICAgIHByb2plY3RUeXBlLFxuICAgICAgICAgICAgcHJvamVjdEluZGV4LFxuICAgICAgICAgICAgdGFza0luZGV4XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgbmV3VGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3VGFza05hbWUnKTtcbiAgICAgICAgY29uc3QgbmV3VGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5VGFzaycpO1xuICAgICAgICBjb25zdCBuZXdUYXNrTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3VGFza05vdGVzJyk7XG4gICAgICAgIGNvbnN0IG5ld0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0R1ZURhdGUnKTtcblxuICAgICAgICBuZXdUYXNrTmFtZS52YWx1ZSA9IHRhc2suZ2V0TmFtZSgpO1xuICAgICAgICBuZXdUYXNrUHJpb3JpdHkudmFsdWUgPSB0YXNrLmdldFByaW9yaXR5SW5EaWdpdCgpO1xuICAgICAgICBuZXdUYXNrTm90ZXMudmFsdWUgPSB0YXNrLmdldE5vdGVzKCk7XG4gICAgICAgIG5ld0R1ZURhdGUudmFsdWUgPSB0YXNrLmdldER1ZURhdGUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlVGFza0RldGFpbHMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgdGFza0luZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgICAgY29uc3QgcHJvamVjdERldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpLmRhdGFzZXQ7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOYW1lJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eVRhc2snKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3VGFza05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOb3RlcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tEdWVEYXRlJykudmFsdWU7XG5cbiAgICAgICAgYXBwQ29udHJvbGxlci51cGRhdGVUYXNrRGV0YWlscyhcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLnR5cGUsXG4gICAgICAgICAgICBwcm9qZWN0RGV0YWlscy5pbmRleCxcbiAgICAgICAgICAgIHRhc2tJbmRleCxcbiAgICAgICAgICAgIG5ld1Rhc2tOYW1lLFxuICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5LFxuICAgICAgICAgICAgbmV3VGFza05vdGVzLFxuICAgICAgICAgICAgbmV3RHVlRGF0ZVxuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0VGFza3MoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3RUYXNrcyhcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy50eXBlLFxuICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmluZGV4XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnJlbmRlclByb2plY3RUYXNrcyhcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0UHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLnR5cGUsXG4gICAgICAgICAgICAgICAgcHJvamVjdERldGFpbHMuaW5kZXhcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcnNUb1Rhc2tzKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLmhpZGVNb2RhbEZvck5ld1Rhc2soKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2hvd1JlbW92ZUJ1dHRvbkluVXNlclByb2plY3RzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZE5ld1Rhc2soZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdFR5cGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpLmRhdGFzZXQudHlwZTtcbiAgICAgICAgY29uc3QgcHJvamVjdEluZGV4ID1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX3RpdGxlJykuZGF0YXNldC5pbmRleDtcbiAgICAgICAgY29uc3QgbmV3VGFza05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3VGFza05hbWUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3VGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5VGFzaycpLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdUYXNrTm90ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3VGFza05vdGVzJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFza0R1ZURhdGUnKS52YWx1ZTtcblxuICAgICAgICBhcHBDb250cm9sbGVyLmFkZE5ld1Rhc2tUb1Byb2plY3QoXG4gICAgICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgICAgIHByb2plY3RJbmRleCxcbiAgICAgICAgICAgIG5ld1Rhc2tOYW1lLFxuICAgICAgICAgICAgbmV3VGFza1ByaW9yaXR5LFxuICAgICAgICAgICAgbmV3VGFza05vdGVzLFxuICAgICAgICAgICAgbmV3RHVlRGF0ZVxuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0VGFza3MoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3RUYXNrcyhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KVxuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5jbGVhcklucHV0c0Zvck5ld1Rhc2soKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcnNUb1Rhc2tzKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLmhpZGVNb2RhbEZvck5ld1Rhc2soKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2hvd1JlbW92ZUJ1dHRvbkluVXNlclByb2plY3RzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNsZWFySW5wdXRzRm9yTmV3VGFzaygpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOYW1lJykudmFsdWUgPSAnJztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ByaW9yaXR5VGFzaycpLnZhbHVlID0gJzEnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3VGFza05vdGVzJykudmFsdWUgPSAnJztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tEdWVEYXRlJykudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZU1vZGFsRm9yTmV3VGFzayhlKSB7XG4gICAgICAgIGlmIChlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9mb3JfdGFzaycpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dfbW9kYWwnKTtcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5jbGVhcklucHV0c0Zvck5ld1Rhc2soKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0WzBdID09PSAnbW9kYWxfZm9yX3Rhc2snKSB7XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93X21vZGFsJyk7XG4gICAgICAgICAgICBVSUNvbnRyb2xsZXIuY2xlYXJJbnB1dHNGb3JOZXdUYXNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdFsxXSA9PT0gJ2Nsb3NlX3Rhc2tfbW9kYWwnKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfZm9yX3Rhc2snKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93X21vZGFsJyk7XG4gICAgICAgICAgICBVSUNvbnRyb2xsZXIuY2xlYXJJbnB1dHNGb3JOZXdUYXNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd01vZGFsRm9yTmV3VGFzayhlKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsRm9yTmV3VGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9mb3JfdGFzaycpO1xuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZV90YXNrX21vZGFsJyk7XG4gICAgICAgIGNvbnN0IGFkZE5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3X3Rhc2tfbW9kYWwnKTtcbiAgICAgICAgY29uc3QgdXBhZHRlTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51cGRhdGVfdGFza19tb2RhbCcpO1xuICAgICAgICBjb25zdCBwcm9qZWN0RGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX3RpdGxlJykuZGF0YXNldDtcblxuICAgICAgICBtb2RhbEZvck5ld1Rhc2suY2xhc3NMaXN0LmFkZCgnc2hvd19tb2RhbCcpO1xuXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICduZXdfdGFzaycpIHtcbiAgICAgICAgICAgIHVwYWR0ZU5ld1Rhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICAgICAgYWRkTmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICBhZGROZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUlDb250cm9sbGVyLmFkZE5ld1Rhc2spO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdFswXSA9PT0gJ3NldHRpbmdzJykge1xuICAgICAgICAgICAgYWRkTmV3VGFza0J0bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgICAgICB1cGFkdGVOZXdUYXNrQnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgICAgIHVwYWR0ZU5ld1Rhc2tCdG4uZGF0YXNldC5pbmRleCA9IHRoaXMuZGF0YXNldC5pbmRleDtcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5maWxsVGFza01vZGFsV2l0aFRhc2tEZXRhaWxzKFxuICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLnR5cGUsXG4gICAgICAgICAgICAgICAgcHJvamVjdERldGFpbHMuaW5kZXgsXG4gICAgICAgICAgICAgICAgdGhpcy5kYXRhc2V0LmluZGV4XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdXBhZHRlTmV3VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgVUlDb250cm9sbGVyLnVwZGF0ZVRhc2tEZXRhaWxzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kYWxGb3JOZXdUYXNrLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgVUlDb250cm9sbGVyLmhpZGVNb2RhbEZvck5ld1Rhc2tcbiAgICAgICAgKTtcblxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJQ29udHJvbGxlci5oaWRlTW9kYWxGb3JOZXdUYXNrKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgbmV3IHByb2plY3RcbiAgICBzdGF0aWMgYWRkTmV3UHJvamVjdChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3UHJvamVjdE5hbWUnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3UHJvamVjdE5vdGVzID1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdQcm9qZWN0Tm90ZXMnKS52YWx1ZSB8fCAnJztcbiAgICAgICAgYXBwQ29udHJvbGxlci5hZGROZXdVc2VyUHJvamVjdChuZXdQcm9qZWN0TmFtZSwgbmV3UHJvamVjdE5vdGVzKTtcbiAgICAgICAgVUlDb250cm9sbGVyLnJlbmRlclByb2plY3RMaXN0KFxuICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRDb250YWluZXJXaXRoUHJvamVjdHMoJ3VzZXJQcm9qZWN0JyksXG4gICAgICAgICAgICAndXNlclByb2plY3QnXG4gICAgICAgICk7XG4gICAgICAgIFVJQ29udHJvbGxlci5hZGRFdmVudExpc3RlbmVyc1RvUGFnZSgpO1xuICAgICAgICBVSUNvbnRyb2xsZXIuaGlkZU1vZGFsRm9yTmV3UHJvamVjdCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcklucHV0c0Zvck5ld1Byb2plY3QoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdQcm9qZWN0TmFtZScpLnZhbHVlID0gJyc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdQcm9qZWN0Tm90ZXMnKS52YWx1ZSA9ICcnO1xuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlTW9kYWxGb3JOZXdQcm9qZWN0KGUpIHtcbiAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm1vZGFsX2Zvcl9wcm9qZWN0JylcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd19tb2RhbCcpO1xuICAgICAgICAgICAgVUlDb250cm9sbGVyLmNsZWFySW5wdXRzRm9yTmV3UHJvamVjdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICdtb2RhbF9mb3JfcHJvamVjdCcpIHtcbiAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dfbW9kYWwnKTtcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5jbGVhcklucHV0c0Zvck5ld1Byb2plY3QoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0WzFdID09PSAnY2xvc2VfcHJvamVjdF9tb2RhbCcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9mb3JfcHJvamVjdCcpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dfbW9kYWwnKTtcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5jbGVhcklucHV0c0Zvck5ld1Byb2plY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyB1cGRhdGVQcm9qZWN0RGV0YWlscyhlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdERldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpLmRhdGFzZXQ7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Byb2plY3ROYW1lJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3ROb3RlcyA9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3UHJvamVjdE5vdGVzJykudmFsdWU7XG5cbiAgICAgICAgYXBwQ29udHJvbGxlci51cGRhdGVQcm9qZWN0RGV0YWlscyhcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLnR5cGUsXG4gICAgICAgICAgICBwcm9qZWN0RGV0YWlscy5pbmRleCxcbiAgICAgICAgICAgIG5ld1Byb2plY3ROYW1lLFxuICAgICAgICAgICAgbmV3UHJvamVjdE5vdGVzXG4gICAgICAgICk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnNob3dQcm9qZWN0TmFtZShcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0UHJvamVjdE5hbWUoXG4gICAgICAgICAgICAgICAgcHJvamVjdERldGFpbHMudHlwZSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy5pbmRleFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmluZGV4LFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMudHlwZVxuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5zZXRQcm9qZWN0Tm90ZXMoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3ROb3RlcyhcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy50eXBlLFxuICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmluZGV4XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnJlbmRlclByb2plY3RMaXN0KFxuICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRDb250YWluZXJXaXRoUHJvamVjdHMoJ3VzZXJQcm9qZWN0JyksXG4gICAgICAgICAgICAndXNlclByb2plY3QnXG4gICAgICAgICk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLmhpZGVNb2RhbEZvck5ld1Byb2plY3QoKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcnNUb1BhZ2UoKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2V0QWN0aXZlQ2xhc3MoJycsIHByb2plY3REZXRhaWxzLmluZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZmlsbFByb2plY3RNb2RhbFdpdGhQcm9qZWN0RGV0YWlscygpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdERldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpO1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Byb2plY3ROYW1lJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3ROb3Rlc0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Byb2plY3ROb3RlcycpO1xuXG4gICAgICAgIHByb2plY3ROYW1lSW5wdXQudmFsdWUgPSBhcHBDb250cm9sbGVyLmdldFByb2plY3ROYW1lKFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuZGF0YXNldC50eXBlLFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuZGF0YXNldC5pbmRleFxuICAgICAgICApO1xuICAgICAgICBwcm9qZWN0Tm90ZXNJbnB1dC52YWx1ZSA9IGFwcENvbnRyb2xsZXIuZ2V0UHJvamVjdE5vdGVzKFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuZGF0YXNldC50eXBlLFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuZGF0YXNldC5pbmRleFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93TW9kYWxGb3JOZXdQcm9qZWN0KGUpIHtcbiAgICAgICAgY29uc3QgbW9kYWxGb3JOZXdQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsX2Zvcl9wcm9qZWN0Jyk7XG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlX3Byb2plY3RfbW9kYWwnKTtcbiAgICAgICAgY29uc3QgYWRkTmV3UHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdfcHJvamVjdCcpO1xuICAgICAgICBjb25zdCBjaGFuZ2VQcm9qZWN0VmFsdWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy51cGRhdGVfcHJvamVjdF9tb2RhbCdcbiAgICAgICAgKTtcblxuICAgICAgICBtb2RhbEZvck5ld1Byb2plY3QuY2xhc3NMaXN0LmFkZCgnc2hvd19tb2RhbCcpO1xuXG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICdhZGRfcHJvamVjdCcpIHtcbiAgICAgICAgICAgIGFkZE5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICAgICAgY2hhbmdlUHJvamVjdFZhbHVlQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgIGFkZE5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgICAgIFVJQ29udHJvbGxlci5hZGROZXdQcm9qZWN0XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdFswXSA9PT0gJ3NldHRpbmdzJykge1xuICAgICAgICAgICAgVUlDb250cm9sbGVyLmZpbGxQcm9qZWN0TW9kYWxXaXRoUHJvamVjdERldGFpbHMoKTtcbiAgICAgICAgICAgIGNoYW5nZVByb2plY3RWYWx1ZUJ0bi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICBhZGROZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgIGNoYW5nZVByb2plY3RWYWx1ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgVUlDb250cm9sbGVyLnVwZGF0ZVByb2plY3REZXRhaWxzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbW9kYWxGb3JOZXdQcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgVUlDb250cm9sbGVyLmhpZGVNb2RhbEZvck5ld1Byb2plY3RcbiAgICAgICAgKTtcblxuICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJQ29udHJvbGxlci5oaWRlTW9kYWxGb3JOZXdQcm9qZWN0KTtcbiAgICB9XG5cbiAgICAvLyBTaG93IHByb2plY3QgZGV0YWlsc1xuICAgIHN0YXRpYyB0b2dnbGVGb3JQcm9qZWN0Tm90ZXMoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKS5kYXRhc2V0LnR5cGU7XG4gICAgICAgIGNvbnN0IHByb2plY3ROb3Rlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAnLnByb2plY3Rfbm90ZXNfY29udGFpbmVyJ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9qZWN0VHlwZSA9PT0gJ3VzZXJQcm9qZWN0Jykge1xuICAgICAgICAgICAgcHJvamVjdE5vdGVzQ29udGFpbmVyLmNsYXNzTGlzdC50b2dnbGUoJ3Nob3dfbm90ZXMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzaG93UmVtb3ZlQnV0dG9uSW5Vc2VyUHJvamVjdHMoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdFRhc2tzTGlzdCA9IGFwcENvbnRyb2xsZXIuZ2V0UHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuZGF0YXNldC50eXBlLFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuZGF0YXNldC5pbmRleFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBidG5Ub1JlbW92ZVByb2plY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy5yZW1vdmVfcHJvamVjdF9idG4nXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHByb2plY3REZXRhaWxzLmRhdGFzZXQudHlwZSA9PT0gJ2Jhc2ljUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGJ0blRvUmVtb3ZlUHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdERldGFpbHMuZGF0YXNldC50eXBlID09PSAndXNlclByb2plY3QnKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgcHJvamVjdFRhc2tzTGlzdC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICBhcHBDb250cm9sbGVyLmNoZWNrSWZBbGxUYXNrc0FyZURvbmUoXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmRhdGFzZXQuaW5kZXhcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBidG5Ub1JlbW92ZVByb2plY3QuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5Ub1JlbW92ZVByb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNldEFjdGl2ZUNsYXNzKHByb2plY3RUYXJnZXQsIHByb2plY3RJbmRleCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvamVjdCcpO1xuXG4gICAgICAgIHByb2plY3RzTGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocHJvamVjdFRhcmdldCA9PT0gJycpIHtcbiAgICAgICAgICAgIHByb2plY3RzTGlzdFsrcHJvamVjdEluZGV4ICsgMl0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd1Byb2plY3ROYW1lKHByb2plY3ROYW1lLCBpbmRleCwgdHlwZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdF90aXRsZScpO1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpO1xuXG4gICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICAgICAgICBwcm9qZWN0VGl0bGVDb250YWluZXIuZGF0YXNldC5pbmRleCA9IGluZGV4O1xuICAgICAgICBwcm9qZWN0VGl0bGVDb250YWluZXIuZGF0YXNldC50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2V0UHJvamVjdE5vdGVzKHByb2plY3ROb3Rlcykge1xuICAgICAgICBjb25zdCBwcm9qZWN0Tm90ZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdF9ub3RlcycpO1xuXG4gICAgICAgIHByb2plY3ROb3Rlc0NvbnRhaW5lci50ZXh0Q29udGVudCA9IHByb2plY3ROb3RlcztcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd1Byb2plY3REZXRhaWxzKGUpIHtcbiAgICAgICAgbGV0IHByb2plY3RUeXBlO1xuICAgICAgICBsZXQgcHJvamVjdEluZGV4O1xuICAgICAgICBsZXQgcHJvamVjdFRhcmdldDtcblxuICAgICAgICBpZiAoZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwcm9qZWN0VHlwZSA9ICdiYXNpY1Byb2plY3QnO1xuICAgICAgICAgICAgcHJvamVjdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHByb2plY3RUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvamVjdFR5cGUgPSBlLnRhcmdldC5kYXRhc2V0LnR5cGU7XG4gICAgICAgICAgICBwcm9qZWN0SW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgICAgICAgcHJvamVjdFRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnNob3dQcm9qZWN0TmFtZShcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0UHJvamVjdE5hbWUocHJvamVjdFR5cGUsIHByb2plY3RJbmRleCksXG4gICAgICAgICAgICBwcm9qZWN0SW5kZXgsXG4gICAgICAgICAgICBwcm9qZWN0VHlwZVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9qZWN0VHlwZSA9PT0gJ3VzZXJQcm9qZWN0Jykge1xuICAgICAgICAgICAgVUlDb250cm9sbGVyLnNldFByb2plY3ROb3RlcyhcbiAgICAgICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3ROb3Rlcyhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0VGFza3MoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3RUYXNrcyhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KVxuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5zaG93UmVtb3ZlQnV0dG9uSW5Vc2VyUHJvamVjdHMoKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2V0QWN0aXZlQ2xhc3MocHJvamVjdFRhcmdldCwgJycpO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5hZGRFdmVudExpc3RlbmVyc1RvVGFza3MoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkRXZlbnRMaXN0ZW5lcnNUb1BhZ2UoKSB7XG4gICAgICAgIGNvbnN0IGJhc2ljUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYmFzaWNfcHJvamVjdCcpO1xuICAgICAgICBjb25zdCB1c2VyUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudXNlcl9wcm9qZWN0Jyk7XG4gICAgICAgIGNvbnN0IGFkZE5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkX3Byb2plY3QnKTtcbiAgICAgICAgY29uc3QgYWRkTmV3VGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZXdfdGFzaycpO1xuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGVDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdF90aXRsZScpO1xuICAgICAgICBjb25zdCByZW1vdmVQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlbW92ZV9wcm9qZWN0X2J0bicpO1xuICAgICAgICBjb25zdCBzZXR0aW5nc1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdF9zZXR0aW5ncycpO1xuXG4gICAgICAgIGJhc2ljUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuc2hvd1Byb2plY3REZXRhaWxzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXNlclByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dQcm9qZWN0RGV0YWlscyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFkZE5ld1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dNb2RhbEZvck5ld1Byb2plY3QpO1xuXG4gICAgICAgIHNldHRpbmdzUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIHRoaXMuc2hvd01vZGFsRm9yTmV3UHJvamVjdFxuICAgICAgICApO1xuXG4gICAgICAgIGFkZE5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dNb2RhbEZvck5ld1Rhc2spO1xuXG4gICAgICAgIHByb2plY3RUaXRsZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlRm9yUHJvamVjdE5vdGVzXG4gICAgICAgICk7XG5cbiAgICAgICAgcmVtb3ZlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5yZW1vdmVQcm9qZWN0RnJvbUxpc3RcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBGaXJzdCBwYWdlIHJlbmRlclxuICAgIHN0YXRpYyByZW5kZXJCbGFua1BhZ2UoKSB7XG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0TGlzdChcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0Q29udGFpbmVyV2l0aFByb2plY3RzKCdiYXNpY1Byb2plY3QnKSxcbiAgICAgICAgICAgICdiYXNpY1Byb2plY3QnXG4gICAgICAgICk7XG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0TGlzdChcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0Q29udGFpbmVyV2l0aFByb2plY3RzKCd1c2VyUHJvamVjdCcpLFxuICAgICAgICAgICAgJ3VzZXJQcm9qZWN0J1xuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5zaG93UHJvamVjdERldGFpbHMoKTtcblxuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzVG9QYWdlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2ljUHJvamVjdCBmcm9tICcuL2NsYXNzZXMvQmFzaWNQcm9qZWN0JztcbmltcG9ydCBCYXNpY1Rhc2sgZnJvbSAnLi9jbGFzc2VzL0Jhc2ljVGFzayc7XG5pbXBvcnQgVXNlclByb2plY3QgZnJvbSAnLi9jbGFzc2VzL1VzZXJQcm9qZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgYXBwQ29udHJvbGxlciB7XG4gICAgc3RhdGljIGNvbnRhaW5lckZvckJhc2ljUHJvamVjdHMgPSBbXG4gICAgICAgIG5ldyBCYXNpY1Byb2plY3QoJ0RhaWx5IFRhc2tzJyksXG4gICAgICAgIG5ldyBCYXNpY1Byb2plY3QoJ0dyb2NlcnkgTGlzdCcpLFxuICAgIF07XG5cbiAgICBzdGF0aWMgY29udGFpbmVyRm9yVXNlclByb2plY3RzID0gW107XG5cbiAgICBzdGF0aWMgZ2V0Q29udGFpbmVyV2l0aFByb2plY3RzKHByb2plY3RUeXBlKSB7XG4gICAgICAgIGxldCBjb250YWluZXJGb3JQcm9qZWN0cztcbiAgICAgICAgaWYgKHByb2plY3RUeXBlID09PSAnYmFzaWNQcm9qZWN0Jykge1xuICAgICAgICAgICAgY29udGFpbmVyRm9yUHJvamVjdHMgPSB0aGlzLmNvbnRhaW5lckZvckJhc2ljUHJvamVjdHM7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdFR5cGUgPT09ICd1c2VyUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lckZvclByb2plY3RzID0gdGhpcy5jb250YWluZXJGb3JVc2VyUHJvamVjdHM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lckZvclByb2plY3RzO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRQcm9qZWN0KHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgbGV0IHByb2plY3RUb1Nob3c7XG4gICAgICAgIGlmIChwcm9qZWN0VHlwZSA9PT0gJ2Jhc2ljUHJvamVjdCcpIHtcbiAgICAgICAgICAgIHByb2plY3RUb1Nob3cgPSB0aGlzLmNvbnRhaW5lckZvckJhc2ljUHJvamVjdHM7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdFR5cGUgPT09ICd1c2VyUHJvamVjdCcpIHtcbiAgICAgICAgICAgIHByb2plY3RUb1Nob3cgPSB0aGlzLmNvbnRhaW5lckZvclVzZXJQcm9qZWN0cztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9qZWN0VG9TaG93W3Byb2plY3RJbmRleF07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFByb2plY3ROYW1lKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSB0aGlzLmdldFByb2plY3QocHJvamVjdFR5cGUsIHByb2plY3RJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3ROYW1lLmdldE5hbWUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UHJvamVjdFRhc2tzKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgbGV0IHByb2plY3RUYXNrcztcbiAgICAgICAgaWYgKHByb2plY3RUeXBlID09PSAnYmFzaWNQcm9qZWN0Jykge1xuICAgICAgICAgICAgcHJvamVjdFRhc2tzID1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lckZvckJhc2ljUHJvamVjdHNbcHJvamVjdEluZGV4XS5nZXRUYXNrc0xpc3QoKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9qZWN0VHlwZSA9PT0gJ3VzZXJQcm9qZWN0Jykge1xuICAgICAgICAgICAgcHJvamVjdFRhc2tzID1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lckZvclVzZXJQcm9qZWN0c1twcm9qZWN0SW5kZXhdLmdldFRhc2tzTGlzdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3RUYXNrcztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UHJvamVjdE5vdGVzKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IHRoaXMuZ2V0UHJvamVjdChwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KTtcblxuICAgICAgICByZXR1cm4gcHJvamVjdC5nZXROb3RlcygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGROZXdVc2VyUHJvamVjdChuZXdQcm9qZWN0TmFtZSwgbmV3UHJvamVjdE5vdGVzKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyRm9yVXNlclByb2plY3RzLnB1c2goXG4gICAgICAgICAgICBuZXcgVXNlclByb2plY3QobmV3UHJvamVjdE5hbWUsIG5ld1Byb2plY3ROb3RlcylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hlY2tJZkFsbFRhc2tzQXJlRG9uZShwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdExpc3RUYXNrcyA9IHRoaXMuZ2V0UHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgJ3VzZXJQcm9qZWN0JyxcbiAgICAgICAgICAgIHByb2plY3RJbmRleFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBwcm9qZWN0TGlzdFRhc2tzLmV2ZXJ5KCh0YXNrKSA9PiB0YXNrLmNoZWNrSXNEb25lKCkgPT09IHRydWUpO1xuICAgIH1cblxuICAgIHN0YXRpYyBzZWFyY2hQcm9qZWN0VG9BZGRUYXNrKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgbGV0IGNvbnRhaW5lcldpdGhQcm9qZWN0O1xuICAgICAgICBpZiAocHJvamVjdFR5cGUgPT09ICdiYXNpY1Byb2plY3QnKSB7XG4gICAgICAgICAgICBjb250YWluZXJXaXRoUHJvamVjdCA9IHRoaXMuY29udGFpbmVyRm9yQmFzaWNQcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9qZWN0VHlwZSA9PT0gJ3VzZXJQcm9qZWN0Jykge1xuICAgICAgICAgICAgY29udGFpbmVyV2l0aFByb2plY3QgPSB0aGlzLmNvbnRhaW5lckZvclVzZXJQcm9qZWN0c1twcm9qZWN0SW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcldpdGhQcm9qZWN0O1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGFuZ2VTdGF0dXNPZlRhc2socHJvamVjdFR5cGUsIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgICAgIGNvbnN0IGdldFByb2plY3RUYXNrc0xpc3QgPSB0aGlzLmdldFByb2plY3RUYXNrcyhcbiAgICAgICAgICAgIHByb2plY3RUeXBlLFxuICAgICAgICAgICAgcHJvamVjdEluZGV4XG4gICAgICAgICk7XG5cbiAgICAgICAgZ2V0UHJvamVjdFRhc2tzTGlzdFt0YXNrSW5kZXhdLmNoYW5nZUlzRG9uZSgpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGROZXdUYXNrVG9Qcm9qZWN0KFxuICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgcHJvamVjdEluZGV4LFxuICAgICAgICB0YXNrTmFtZSxcbiAgICAgICAgdGFza1ByaW9yaXR5LFxuICAgICAgICB0YXNrRHVlRGF0ZSxcbiAgICAgICAgdGFza05vdGVzXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUb0FkZFRhc2sgPSBhcHBDb250cm9sbGVyLnNlYXJjaFByb2plY3RUb0FkZFRhc2soXG4gICAgICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgICAgIHByb2plY3RJbmRleFxuICAgICAgICApO1xuXG4gICAgICAgIHByb2plY3RUb0FkZFRhc2suYWRkVGFza3NUb0xpc3QoXG4gICAgICAgICAgICBuZXcgQmFzaWNUYXNrKHRhc2tOYW1lLCB0YXNrUHJpb3JpdHksIHRhc2tEdWVEYXRlLCB0YXNrTm90ZXMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZVRhc2tGcm9tUHJvamVjdChwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRvUmVtb3ZlVGFzayA9IHRoaXMuc2VhcmNoUHJvamVjdFRvQWRkVGFzayhcbiAgICAgICAgICAgIHByb2plY3RUeXBlLFxuICAgICAgICAgICAgcHJvamVjdEluZGV4XG4gICAgICAgICk7XG5cbiAgICAgICAgcHJvamVjdFRvUmVtb3ZlVGFzay5yZW1vdmVUYXNrRnJvbUxpc3QodGFza0luZGV4KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVtb3ZlUHJvamVjdChwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2l0aFByb2plY3RzID1cbiAgICAgICAgICAgIHRoaXMuZ2V0Q29udGFpbmVyV2l0aFByb2plY3RzKCd1c2VyUHJvamVjdCcpO1xuXG4gICAgICAgIGNvbnRhaW5lcldpdGhQcm9qZWN0cy5zcGxpY2UocHJvamVjdEluZGV4LCAxKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlUHJvamVjdERldGFpbHMoXG4gICAgICAgIHByb2plY3RUeXBlLFxuICAgICAgICBwcm9qZWN0SW5kZXgsXG4gICAgICAgIG5ld1Byb2plY3ROYW1lLFxuICAgICAgICBuZXdQcm9qZWN0Tm90ZXNcbiAgICApIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRvVXBkYXRlID0gdGhpcy5nZXRQcm9qZWN0KHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgICAgIHByb2plY3RUb1VwZGF0ZS5zZXROZXdOYW1lKG5ld1Byb2plY3ROYW1lKTtcbiAgICAgICAgcHJvamVjdFRvVXBkYXRlLnNldE5ld05vdGVzKG5ld1Byb2plY3ROb3Rlcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFRhc2socHJvamVjdFR5cGUsIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUYXNrcyA9IHRoaXMuZ2V0UHJvamVjdFRhc2tzKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGFza3NbdGFza0luZGV4XTtcbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlVGFza0RldGFpbHMoXG4gICAgICAgIHByb2plY3RUeXBlLFxuICAgICAgICBwcm9qZWN0SW5kZXgsXG4gICAgICAgIHRhc2tJbmRleCxcbiAgICAgICAgbmV3VGFza05hbWUsXG4gICAgICAgIG5ld1Rhc2tQcmlvcml0eSxcbiAgICAgICAgbmV3VGFza05vdGVzLFxuICAgICAgICBuZXdUYXNrRHVlRGF0ZVxuICAgICkge1xuICAgICAgICBjb25zdCB0YXNrID0gdGhpcy5nZXRUYXNrKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLmdldFByb2plY3QocHJvamVjdFR5cGUsIHByb2plY3RJbmRleCk7XG5cbiAgICAgICAgdGFzay5zZXROZXdOYW1lKG5ld1Rhc2tOYW1lKTtcbiAgICAgICAgdGFzay5zZXROZXdQcmlvcml0eShuZXdUYXNrUHJpb3JpdHkpO1xuICAgICAgICB0YXNrLnNldE5ld05vdGVzKG5ld1Rhc2tOb3Rlcyk7XG4gICAgICAgIHRhc2suc2V0RHVlRGF0ZShuZXdUYXNrRHVlRGF0ZSk7XG5cbiAgICAgICAgcHJvamVjdC5zb3J0VGFza3NCeVByaW9yaXR5KCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzaWNDbGFzc1BhdHRlcm4ge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB9XG5cbiAgICBzZXROZXdOYW1lKG5ld05hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmV3TmFtZTtcbiAgICB9XG5cbiAgICBnZXROYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNpY0NsYXNzUGF0dGVybiBmcm9tICcuL0Jhc2ljQ2xhc3NQYXR0ZXJuJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzaWNQcm9qZWN0IGV4dGVuZHMgQmFzaWNDbGFzc1BhdHRlcm4ge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIHRoaXMudGFza3NMaXN0ID0gW107XG4gICAgICAgIHRoaXMudHlwZSA9ICdiYXNpY1Byb2plY3QnO1xuICAgIH1cblxuICAgIHNvcnRUYXNrc0J5UHJpb3JpdHkoKSB7XG4gICAgICAgIHRoaXMudGFza3NMaXN0LnNvcnQoKGEsIGIpID0+IGEucHJpb3JpdHkgLSBiLnByaW9yaXR5KTtcbiAgICB9XG5cbiAgICBhZGRUYXNrc1RvTGlzdChuZXdUYXNrKSB7XG4gICAgICAgIHRoaXMudGFza3NMaXN0LnB1c2gobmV3VGFzayk7XG4gICAgICAgIHRoaXMuc29ydFRhc2tzQnlQcmlvcml0eSgpO1xuICAgIH1cblxuICAgIGdldFRhc2tzTGlzdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza3NMaXN0O1xuICAgIH1cblxuICAgIHJlbW92ZVRhc2tGcm9tTGlzdChpKSB7XG4gICAgICAgIHRoaXMudGFza3NMaXN0LnNwbGljZShpLCAxKTtcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzaWNDbGFzc1BhdHRlcm4gZnJvbSAnLi9CYXNpY0NsYXNzUGF0dGVybic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljVGFzayBleHRlbmRzIEJhc2ljQ2xhc3NQYXR0ZXJuIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBwcmlvcml0eSwgbm90ZXMsIGR1ZURhdGUpIHtcbiAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcbiAgICAgICAgdGhpcy5kdWVEYXRlID1cbiAgICAgICAgICAgIGR1ZURhdGUgfHxcbiAgICAgICAgICAgIGAke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0tJHtcbiAgICAgICAgICAgICAgICArbmV3IERhdGUoKS5nZXRNb250aCgpIDwgMTBcbiAgICAgICAgICAgICAgICAgICAgPyBgMCR7bmV3IERhdGUoKS5nZXRNb250aCgpfWBcbiAgICAgICAgICAgICAgICAgICAgOiBuZXcgRGF0ZSgpLmdldE1vbnRoKClcbiAgICAgICAgICAgIH0tJHtuZXcgRGF0ZSgpLmdldERhdGUoKX1gO1xuICAgICAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgICAgIHRoaXMuaXNEb25lID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2V0TmV3UHJpb3JpdHkobmV3UHJpb3JpdHkpIHtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IG5ld1ByaW9yaXR5O1xuICAgIH1cblxuICAgIGNoYW5nZVByaW9yaXR5VmFsdWVUb1N0cigpIHtcbiAgICAgICAgaWYgKCt0aGlzLnByaW9yaXR5ID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2hpZ2gnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCt0aGlzLnByaW9yaXR5ID09PSAyKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21lZGl1bSc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJ2xvdyc7XG4gICAgfVxuXG4gICAgZ2V0UHJpb3JpdHlJbkRpZ2l0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcmlvcml0eTtcbiAgICB9XG5cbiAgICBnZXRQcmlvcml0eUluU3RyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VQcmlvcml0eVZhbHVlVG9TdHIoKTtcbiAgICB9XG5cbiAgICBzZXROZXdOb3RlcyhuZXdOb3Rlcykge1xuICAgICAgICB0aGlzLm5vdGVzID0gbmV3Tm90ZXM7XG4gICAgfVxuXG4gICAgZ2V0Tm90ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGVzO1xuICAgIH1cblxuICAgIHNldER1ZURhdGUobmV3RHVlRGF0ZSkge1xuICAgICAgICB0aGlzLmR1ZURhdGUgPSBuZXdEdWVEYXRlO1xuICAgIH1cblxuICAgIGdldER1ZURhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR1ZURhdGU7XG4gICAgfVxuXG4gICAgY2hhbmdlSXNEb25lKCkge1xuICAgICAgICB0aGlzLmlzRG9uZSA9ICF0aGlzLmlzRG9uZTtcbiAgICB9XG5cbiAgICBjaGVja0lzRG9uZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNEb25lO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNpY1Byb2plY3QgZnJvbSAnLi9CYXNpY1Byb2plY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VyUHJvamVjdCBleHRlbmRzIEJhc2ljUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgbm90ZXMpIHtcbiAgICAgICAgc3VwZXIobmFtZSk7XG4gICAgICAgIHRoaXMubm90ZXMgPSBub3RlcztcbiAgICAgICAgdGhpcy50eXBlID0gJ3VzZXJQcm9qZWN0JztcbiAgICB9XG5cbiAgICBzZXROZXdOb3RlcyhuZXdOb3Rlcykge1xuICAgICAgICB0aGlzLm5vdGVzID0gbmV3Tm90ZXM7XG4gICAgfVxuXG4gICAgZ2V0Tm90ZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGVzO1xuICAgIH1cblxuICAgIGdldFByb2plY3RUeXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFVJQ29udHJvbGxlciBmcm9tICcuL1VJQ29udHJvbGxlcic7XG5cblVJQ29udHJvbGxlci5yZW5kZXJCbGFua1BhZ2UoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==