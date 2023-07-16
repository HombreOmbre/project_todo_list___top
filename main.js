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
        console.log(projectTasks[taskIndex]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBNEM7O0FBRTdCO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiwyQkFBMkI7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdCQUFnQixFQUFFLGVBQWU7QUFDdEQ7QUFDQSwrQkFBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw0QkFBNEIsd0JBQXdCO0FBQ3BEOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsU0FBUztBQUN4RDtBQUNBLDRFQUE0RSxFQUFFLElBQUk7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQkFBZ0IsRUFBRTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQkFBZ0IsRUFBRTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNHQUFzRyxFQUFFO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLHNEQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzREFBYTs7QUFFckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsc0RBQWE7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHNEQUFhO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxZQUFZLHNEQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUUFBUSxzREFBYTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFhO0FBQ3JCO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFFBQVEsc0RBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxzREFBYTtBQUM5QztBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msc0RBQWE7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDLHNEQUFhO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0Isc0RBQWE7QUFDN0I7QUFDQTs7QUFFQTtBQUNBLFlBQVksc0RBQWE7QUFDekI7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxzREFBYTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFhO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0b0JrRDtBQUNOO0FBQ0k7O0FBRWpDO0FBQ2Y7QUFDQSxZQUFZLDZEQUFZO0FBQ3hCLFlBQVksNkRBQVk7QUFDeEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCLDREQUFXO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCLDBEQUFTO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNyS2U7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWm9EOztBQUVyQywyQkFBMkIsMERBQWlCO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Qm9EOztBQUVyQyx3QkFBd0IsMERBQWlCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLHlCQUF5QjtBQUN4QztBQUNBLDBCQUEwQixzQkFBc0I7QUFDaEQ7QUFDQSxhQUFhLEdBQUcscUJBQXFCO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEUwQzs7QUFFM0IsMEJBQTBCLHFEQUFZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3BCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTjBDOztBQUUxQyxxREFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3RfdG9kb19saXN0X19fdG9wLy4vc3JjL1VJQ29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC8uL3NyYy9hcHBDb250cm9sbGVyLmpzIiwid2VicGFjazovL3Byb2plY3RfdG9kb19saXN0X19fdG9wLy4vc3JjL2NsYXNzZXMvQmFzaWNDbGFzc1BhdHRlcm4uanMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90b2RvX2xpc3RfX190b3AvLi9zcmMvY2xhc3Nlcy9CYXNpY1Byb2plY3QuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90b2RvX2xpc3RfX190b3AvLi9zcmMvY2xhc3Nlcy9CYXNpY1Rhc2suanMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90b2RvX2xpc3RfX190b3AvLi9zcmMvY2xhc3Nlcy9Vc2VyUHJvamVjdC5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcHJvamVjdF90b2RvX2xpc3RfX190b3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9wcm9qZWN0X3RvZG9fbGlzdF9fX3RvcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Byb2plY3RfdG9kb19saXN0X19fdG9wLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcHBDb250cm9sbGVyIGZyb20gJy4vYXBwQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJQ29udHJvbGxlciB7XG4gICAgLy8gUmVuZGVyIHByb2plY3RzXG4gICAgc3RhdGljIHJlbmRlclByb2plY3RMaXN0KGxpc3RPZlByb2plY3RzLCBsaXN0VHlwZSkge1xuICAgICAgICBjb25zdCBsaXN0c0ZvclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgICcucHJvamVjdHNfY29udGFpbmVyX2xpc3QnXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGNvbnRhaW5lckZvclByb2plY3RzID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdE9mUHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRhaW5lckZvclByb2plY3RzICs9IGBcbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nYnRuIHByb2plY3QgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RPZlByb2plY3RzW2ldLmdldFByb2plY3RUeXBlKCkgPT09ICdiYXNpY1Byb2plY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmFzaWNfcHJvamVjdCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICd1c2VyX3Byb2plY3QnXG4gICAgICAgICAgICAgICAgICAgIH0nIGRhdGEtaW5kZXg9JyR7aX0nIGRhdGEtdHlwZT0nJHtsaXN0T2ZQcm9qZWN0c1tcbiAgICAgICAgICAgICAgICBpXG4gICAgICAgICAgICBdLmdldFByb2plY3RUeXBlKCl9Jz4ke2xpc3RPZlByb2plY3RzW2ldLmdldE5hbWUoKX1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdFR5cGUgPT09ICdiYXNpY1Byb2plY3QnKSB7XG4gICAgICAgICAgICBsaXN0c0ZvclByb2plY3RzWzBdLmlubmVySFRNTCA9IGNvbnRhaW5lckZvclByb2plY3RzO1xuICAgICAgICB9IGVsc2UgaWYgKGxpc3RUeXBlID09PSAndXNlclByb2plY3QnKSB7XG4gICAgICAgICAgICBsaXN0c0ZvclByb2plY3RzWzFdLmlubmVySFRNTCA9IGNvbnRhaW5lckZvclByb2plY3RzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyIHRhc2tzXG4gICAgc3RhdGljIHJlbmRlclByb2plY3RUYXNrcyhwcm9qZWN0TGlzdCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJGb3JUYXNrcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAnLnRhc2tzX2NvbnRhaW5lcl9saXN0J1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnRhaW5lckZvclRhc2tzLmlubmVySFRNTCA9ICcnO1xuXG4gICAgICAgIGlmIChwcm9qZWN0TGlzdC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbnRhaW5lckZvclRhc2tzLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPSdpbmZvX2FsZXJ0Jz5BZGQgZmlyc3QgdGFzayBieSBjbGlja2luZyBidXR0b24gYmVsb3c8L3A+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcHJpb3JpdHkgPSBwcm9qZWN0TGlzdFtpXS5nZXRQcmlvcml0eUluU3RyKCk7XG5cbiAgICAgICAgICAgICAgICBjb250YWluZXJGb3JUYXNrcy5pbm5lckhUTUwgKz0gYFxuICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSd0YXNrX2JveCAke3ByaW9yaXR5fV9wcmlvcml0eScgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3RvcCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0YXNrX25hbWUgYnRuXCIgZGF0YS1pbmRleD0nJHtpfSc+JHtwcm9qZWN0TGlzdFtcbiAgICAgICAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgICAgIF0uZ2V0TmFtZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0ndG9wX3JpZ2h0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2Nsb3NlX3Rhc2tfYnRuIGJ0biAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3RMaXN0W2ldLmNoZWNrSXNEb25lKCkgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnc2hvdydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0nIGRhdGEtaW5kZXg9JyR7aX0nPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9J2NoZWNrYm94ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdExpc3RbaV0uY2hlY2tJc0RvbmUoKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdjaGVja2VkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfScgZGF0YS1pbmRleD0nJHtpfSc+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdkZXRhaWxzJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nbWVkaXVtJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J21lZGl1bV9sZWZ0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImRldGFpbFwiPlByaW9yaXR5OiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3ZhbHVlIHByaW9yaXR5Jz4ke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJycpWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRvVXBwZXJDYXNlKCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmpvaW4oJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdtZWRpdW1fcmlnaHQnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPSdkZXRhaWwnPkR1ZSBkYXRlOiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J3ZhbHVlJz4ke3Byb2plY3RMaXN0W1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLmdldER1ZURhdGUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYm90dG9tJz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lcl90YXNrX3NldHRpbmdzIGJ0bic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9J2RldGFpbCc+Tm90ZXM6PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwidGFza19zZXR0aW5ncyBidG5cIiBkYXRhLWluZGV4PScke2l9Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIuL2ltZy9zZXR0aW5nc19pY29uLnN2Z1wiIGFsdD1cIlNldHRpbmdzIGljb25cIiBjbGFzcz1cInNldHRpbmdzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J25vdGVzX3R4dCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtwcm9qZWN0TGlzdFtpXS5nZXROb3RlcygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2RvbmUgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdExpc3RbaV0uY2hlY2tJc0RvbmUoKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ3Rhc2tfZG9uZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9JzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEV2ZW50cyBmb3IgdGFza3NcbiAgICBzdGF0aWMgc2hvd1Rhc2tEZXRhaWxzKGUpIHtcbiAgICAgICAgY29uc3QgdGFza3NEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRldGFpbHMnKTtcbiAgICAgICAgY29uc3QgaW5kZXhPZlRhc2sgPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuXG4gICAgICAgIHRhc2tzRGV0YWlsc1tpbmRleE9mVGFza10uY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjaGFuZ2VUYXNrU3RhdHVzKGUpIHtcbiAgICAgICAgY29uc3QgZ2V0U2hvd25Qcm9qZWN0RGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IGNoZWNrYm94QnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveCcpO1xuICAgICAgICBjb25zdCBjbG9zZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2xvc2VfdGFza19idG4nKTtcbiAgICAgICAgY29uc3QgdGFza0lzRG9uZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kb25lJyk7XG4gICAgICAgIGNvbnN0IGluZGV4T2ZUYXNrID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgICAgYXBwQ29udHJvbGxlci5jaGFuZ2VTdGF0dXNPZlRhc2soXG4gICAgICAgICAgICBnZXRTaG93blByb2plY3REZXRhaWxzLmRhdGFzZXQudHlwZSxcbiAgICAgICAgICAgIGdldFNob3duUHJvamVjdERldGFpbHMuZGF0YXNldC5pbmRleCxcbiAgICAgICAgICAgIGluZGV4T2ZUYXNrXG4gICAgICAgICk7XG5cbiAgICAgICAgY2hlY2tib3hCdG5zW2luZGV4T2ZUYXNrXS5jbGFzc0xpc3QudG9nZ2xlKCdjaGVja2VkJyk7XG4gICAgICAgIGNsb3NlQnRuc1tpbmRleE9mVGFza10uY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpO1xuICAgICAgICB0YXNrSXNEb25lW2luZGV4T2ZUYXNrXS5jbGFzc0xpc3QudG9nZ2xlKCd0YXNrX2RvbmUnKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2hvd1JlbW92ZUJ1dHRvbkluVXNlclByb2plY3RzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZVRhc2soZSkge1xuICAgICAgICBjb25zdCB0YXNrSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4O1xuICAgICAgICBjb25zdCBnZXRTaG93blByb2plY3REZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKTtcblxuICAgICAgICBhcHBDb250cm9sbGVyLnJlbW92ZVRhc2tGcm9tUHJvamVjdChcbiAgICAgICAgICAgIGdldFNob3duUHJvamVjdERldGFpbHMuZGF0YXNldC50eXBlLFxuICAgICAgICAgICAgZ2V0U2hvd25Qcm9qZWN0RGV0YWlscy5kYXRhc2V0LmluZGV4LFxuICAgICAgICAgICAgdGFza0luZGV4XG4gICAgICAgICk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnJlbmRlclByb2plY3RUYXNrcyhcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0UHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgICAgIGdldFNob3duUHJvamVjdERldGFpbHMuZGF0YXNldC50eXBlLFxuICAgICAgICAgICAgICAgIGdldFNob3duUHJvamVjdERldGFpbHMuZGF0YXNldC5pbmRleFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICBVSUNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcnNUb1Rhc2tzKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnNob3dSZW1vdmVCdXR0b25JblVzZXJQcm9qZWN0cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVQcm9qZWN0RnJvbUxpc3QoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpLmRhdGFzZXQuaW5kZXg7XG5cbiAgICAgICAgYXBwQ29udHJvbGxlci5yZW1vdmVQcm9qZWN0KHByb2plY3RJbmRleCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnJlbmRlckJsYW5rUGFnZSgpO1xuICAgIH1cblxuICAgIC8vIEFkZCBuZXcgdGFza1xuICAgIHN0YXRpYyBhZGRFdmVudExpc3RlbmVyc1RvVGFza3MoKSB7XG4gICAgICAgIGNvbnN0IHRhc2tzVGl0bGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2tfbmFtZScpO1xuICAgICAgICBjb25zdCB0YXNrc0NoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3gnKTtcbiAgICAgICAgY29uc3QgY2xvc2VUYXNrQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jbG9zZV90YXNrX2J0bicpO1xuICAgICAgICBjb25zdCB0YXNrc1NldHRpbmdzQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YXNrX3NldHRpbmdzJyk7XG5cbiAgICAgICAgdGFza3NUaXRsZXMuZm9yRWFjaCgodGl0bGUpID0+XG4gICAgICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJQ29udHJvbGxlci5zaG93VGFza0RldGFpbHMpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGFza3NDaGVja2JveGVzLmZvckVhY2goKGNoZWNrYm94KSA9PlxuICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSUNvbnRyb2xsZXIuY2hhbmdlVGFza1N0YXR1cylcbiAgICAgICAgKTtcblxuICAgICAgICBjbG9zZVRhc2tCdG5zLmZvckVhY2goKGNsb3NlVGFzaykgPT5cbiAgICAgICAgICAgIGNsb3NlVGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJQ29udHJvbGxlci5yZW1vdmVUYXNrKVxuICAgICAgICApO1xuXG4gICAgICAgIHRhc2tzU2V0dGluZ3NCdG5zLmZvckVhY2goKHRhc2spID0+XG4gICAgICAgICAgICB0YXNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVUlDb250cm9sbGVyLnNob3dNb2RhbEZvck5ld1Rhc2spXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbGxUYXNrTW9kYWxXaXRoVGFza0RldGFpbHMocHJvamVjdFR5cGUsIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBhcHBDb250cm9sbGVyLmdldFRhc2soXG4gICAgICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgICAgIHByb2plY3RJbmRleCxcbiAgICAgICAgICAgIHRhc2tJbmRleFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IG5ld1Rhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOYW1lJyk7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eVRhc2snKTtcbiAgICAgICAgY29uc3QgbmV3VGFza05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOb3RlcycpO1xuICAgICAgICBjb25zdCBuZXdEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tEdWVEYXRlJyk7XG5cbiAgICAgICAgbmV3VGFza05hbWUudmFsdWUgPSB0YXNrLmdldE5hbWUoKTtcbiAgICAgICAgbmV3VGFza1ByaW9yaXR5LnZhbHVlID0gdGFzay5nZXRQcmlvcml0eUluRGlnaXQoKTtcbiAgICAgICAgbmV3VGFza05vdGVzLnZhbHVlID0gdGFzay5nZXROb3RlcygpO1xuICAgICAgICBuZXdEdWVEYXRlLnZhbHVlID0gdGFzay5nZXREdWVEYXRlKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVRhc2tEZXRhaWxzKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHRhc2tJbmRleCA9IGUudGFyZ2V0LmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGNvbnN0IHByb2plY3REZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKS5kYXRhc2V0O1xuICAgICAgICBjb25zdCBuZXdUYXNrTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdUYXNrTmFtZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHlUYXNrJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tOb3RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdUYXNrTm90ZXMnKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3RHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRHVlRGF0ZScpLnZhbHVlO1xuXG4gICAgICAgIGFwcENvbnRyb2xsZXIudXBkYXRlVGFza0RldGFpbHMoXG4gICAgICAgICAgICBwcm9qZWN0RGV0YWlscy50eXBlLFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuaW5kZXgsXG4gICAgICAgICAgICB0YXNrSW5kZXgsXG4gICAgICAgICAgICBuZXdUYXNrTmFtZSxcbiAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eSxcbiAgICAgICAgICAgIG5ld1Rhc2tOb3RlcyxcbiAgICAgICAgICAgIG5ld0R1ZURhdGVcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIucmVuZGVyUHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRQcm9qZWN0VGFza3MoXG4gICAgICAgICAgICAgICAgcHJvamVjdERldGFpbHMudHlwZSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy5pbmRleFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0VGFza3MoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3RUYXNrcyhcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy50eXBlLFxuICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmluZGV4XG4gICAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLmFkZEV2ZW50TGlzdGVuZXJzVG9UYXNrcygpO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5oaWRlTW9kYWxGb3JOZXdUYXNrKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnNob3dSZW1vdmVCdXR0b25JblVzZXJQcm9qZWN0cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBhZGROZXdUYXNrKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHByb2plY3RUeXBlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKS5kYXRhc2V0LnR5cGU7XG4gICAgICAgIGNvbnN0IHByb2plY3RJbmRleCA9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpLmRhdGFzZXQuaW5kZXg7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOYW1lJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eVRhc2snKS52YWx1ZTtcbiAgICAgICAgY29uc3QgbmV3VGFza05vdGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOb3RlcycpLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2tEdWVEYXRlJykudmFsdWU7XG5cbiAgICAgICAgYXBwQ29udHJvbGxlci5hZGROZXdUYXNrVG9Qcm9qZWN0KFxuICAgICAgICAgICAgcHJvamVjdFR5cGUsXG4gICAgICAgICAgICBwcm9qZWN0SW5kZXgsXG4gICAgICAgICAgICBuZXdUYXNrTmFtZSxcbiAgICAgICAgICAgIG5ld1Rhc2tQcmlvcml0eSxcbiAgICAgICAgICAgIG5ld1Rhc2tOb3RlcyxcbiAgICAgICAgICAgIG5ld0R1ZURhdGVcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIucmVuZGVyUHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRQcm9qZWN0VGFza3MocHJvamVjdFR5cGUsIHByb2plY3RJbmRleClcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuY2xlYXJJbnB1dHNGb3JOZXdUYXNrKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLmFkZEV2ZW50TGlzdGVuZXJzVG9UYXNrcygpO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5oaWRlTW9kYWxGb3JOZXdUYXNrKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnNob3dSZW1vdmVCdXR0b25JblVzZXJQcm9qZWN0cygpO1xuICAgIH1cblxuICAgIHN0YXRpYyBjbGVhcklucHV0c0Zvck5ld1Rhc2soKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdUYXNrTmFtZScpLnZhbHVlID0gJyc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eVRhc2snKS52YWx1ZSA9ICcxJztcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Rhc2tOb3RlcycpLnZhbHVlID0gJyc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrRHVlRGF0ZScpLnZhbHVlID0gJyc7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGVNb2RhbEZvck5ld1Rhc2soZSkge1xuICAgICAgICBpZiAoZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfZm9yX3Rhc2snKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93X21vZGFsJyk7XG4gICAgICAgICAgICBVSUNvbnRyb2xsZXIuY2xlYXJJbnB1dHNGb3JOZXdUYXNrKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdFswXSA9PT0gJ21vZGFsX2Zvcl90YXNrJykge1xuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd19tb2RhbCcpO1xuICAgICAgICAgICAgVUlDb250cm9sbGVyLmNsZWFySW5wdXRzRm9yTmV3VGFzaygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3RbMV0gPT09ICdjbG9zZV90YXNrX21vZGFsJykge1xuICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignLm1vZGFsX2Zvcl90YXNrJylcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LnJlbW92ZSgnc2hvd19tb2RhbCcpO1xuICAgICAgICAgICAgVUlDb250cm9sbGVyLmNsZWFySW5wdXRzRm9yTmV3VGFzaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dNb2RhbEZvck5ld1Rhc2soZSkge1xuICAgICAgICBjb25zdCBtb2RhbEZvck5ld1Rhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfZm9yX3Rhc2snKTtcbiAgICAgICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2VfdGFza19tb2RhbCcpO1xuICAgICAgICBjb25zdCBhZGROZXdUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5ld190YXNrX21vZGFsJyk7XG4gICAgICAgIGNvbnN0IHVwYWR0ZU5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXBkYXRlX3Rhc2tfbW9kYWwnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdERldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza190aXRsZScpLmRhdGFzZXQ7XG5cbiAgICAgICAgbW9kYWxGb3JOZXdUYXNrLmNsYXNzTGlzdC5hZGQoJ3Nob3dfbW9kYWwnKTtcblxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0WzBdID09PSAnbmV3X3Rhc2snKSB7XG4gICAgICAgICAgICB1cGFkdGVOZXdUYXNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgIGFkZE5ld1Rhc2tCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICAgICAgYWRkTmV3VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIFVJQ29udHJvbGxlci5hZGROZXdUYXNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICdzZXR0aW5ncycpIHtcbiAgICAgICAgICAgIGFkZE5ld1Rhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICAgICAgdXBhZHRlTmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgICAgICAgICB1cGFkdGVOZXdUYXNrQnRuLmRhdGFzZXQuaW5kZXggPSB0aGlzLmRhdGFzZXQuaW5kZXg7XG4gICAgICAgICAgICBVSUNvbnRyb2xsZXIuZmlsbFRhc2tNb2RhbFdpdGhUYXNrRGV0YWlscyhcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy50eXBlLFxuICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmluZGV4LFxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YXNldC5pbmRleFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVwYWR0ZU5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgICAgIFVJQ29udHJvbGxlci51cGRhdGVUYXNrRGV0YWlsc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vZGFsRm9yTmV3VGFzay5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5oaWRlTW9kYWxGb3JOZXdUYXNrXG4gICAgICAgICk7XG5cbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSUNvbnRyb2xsZXIuaGlkZU1vZGFsRm9yTmV3VGFzayk7XG4gICAgfVxuXG4gICAgLy8gQWRkIG5ldyBwcm9qZWN0XG4gICAgc3RhdGljIGFkZE5ld1Byb2plY3QoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Byb2plY3ROYW1lJykudmFsdWU7XG4gICAgICAgIGNvbnN0IG5ld1Byb2plY3ROb3RlcyA9XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3UHJvamVjdE5vdGVzJykudmFsdWUgfHwgJyc7XG4gICAgICAgIGFwcENvbnRyb2xsZXIuYWRkTmV3VXNlclByb2plY3QobmV3UHJvamVjdE5hbWUsIG5ld1Byb2plY3ROb3Rlcyk7XG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0TGlzdChcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0Q29udGFpbmVyV2l0aFByb2plY3RzKCd1c2VyUHJvamVjdCcpLFxuICAgICAgICAgICAgJ3VzZXJQcm9qZWN0J1xuICAgICAgICApO1xuICAgICAgICBVSUNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcnNUb1BhZ2UoKTtcbiAgICAgICAgVUlDb250cm9sbGVyLmhpZGVNb2RhbEZvck5ld1Byb2plY3QoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2xlYXJJbnB1dHNGb3JOZXdQcm9qZWN0KCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3UHJvamVjdE5hbWUnKS52YWx1ZSA9ICcnO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3UHJvamVjdE5vdGVzJykudmFsdWUgPSAnJztcbiAgICB9XG5cbiAgICBzdGF0aWMgaGlkZU1vZGFsRm9yTmV3UHJvamVjdChlKSB7XG4gICAgICAgIGlmIChlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9mb3JfcHJvamVjdCcpXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dfbW9kYWwnKTtcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5jbGVhcklucHV0c0Zvck5ld1Byb2plY3QoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0WzBdID09PSAnbW9kYWxfZm9yX3Byb2plY3QnKSB7XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93X21vZGFsJyk7XG4gICAgICAgICAgICBVSUNvbnRyb2xsZXIuY2xlYXJJbnB1dHNGb3JOZXdQcm9qZWN0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdFsxXSA9PT0gJ2Nsb3NlX3Byb2plY3RfbW9kYWwnKSB7XG4gICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcubW9kYWxfZm9yX3Byb2plY3QnKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93X21vZGFsJyk7XG4gICAgICAgICAgICBVSUNvbnRyb2xsZXIuY2xlYXJJbnB1dHNGb3JOZXdQcm9qZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgdXBkYXRlUHJvamVjdERldGFpbHMoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IHByb2plY3REZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKS5kYXRhc2V0O1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdQcm9qZWN0TmFtZScpLnZhbHVlO1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0Tm90ZXMgPVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ld1Byb2plY3ROb3RlcycpLnZhbHVlO1xuXG4gICAgICAgIGFwcENvbnRyb2xsZXIudXBkYXRlUHJvamVjdERldGFpbHMoXG4gICAgICAgICAgICBwcm9qZWN0RGV0YWlscy50eXBlLFxuICAgICAgICAgICAgcHJvamVjdERldGFpbHMuaW5kZXgsXG4gICAgICAgICAgICBuZXdQcm9qZWN0TmFtZSxcbiAgICAgICAgICAgIG5ld1Byb2plY3ROb3Rlc1xuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5zaG93UHJvamVjdE5hbWUoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3ROYW1lKFxuICAgICAgICAgICAgICAgIHByb2plY3REZXRhaWxzLnR5cGUsXG4gICAgICAgICAgICAgICAgcHJvamVjdERldGFpbHMuaW5kZXhcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBwcm9qZWN0RGV0YWlscy5pbmRleCxcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLnR5cGVcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2V0UHJvamVjdE5vdGVzKFxuICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRQcm9qZWN0Tm90ZXMoXG4gICAgICAgICAgICAgICAgcHJvamVjdERldGFpbHMudHlwZSxcbiAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy5pbmRleFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5yZW5kZXJQcm9qZWN0TGlzdChcbiAgICAgICAgICAgIGFwcENvbnRyb2xsZXIuZ2V0Q29udGFpbmVyV2l0aFByb2plY3RzKCd1c2VyUHJvamVjdCcpLFxuICAgICAgICAgICAgJ3VzZXJQcm9qZWN0J1xuICAgICAgICApO1xuXG4gICAgICAgIFVJQ29udHJvbGxlci5oaWRlTW9kYWxGb3JOZXdQcm9qZWN0KCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLmFkZEV2ZW50TGlzdGVuZXJzVG9QYWdlKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnNldEFjdGl2ZUNsYXNzKCcnLCBwcm9qZWN0RGV0YWlscy5pbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpbGxQcm9qZWN0TW9kYWxXaXRoUHJvamVjdERldGFpbHMoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3REZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdQcm9qZWN0TmFtZScpO1xuICAgICAgICBjb25zdCBwcm9qZWN0Tm90ZXNJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXdQcm9qZWN0Tm90ZXMnKTtcblxuICAgICAgICBwcm9qZWN0TmFtZUlucHV0LnZhbHVlID0gYXBwQ29udHJvbGxlci5nZXRQcm9qZWN0TmFtZShcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmRhdGFzZXQudHlwZSxcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmRhdGFzZXQuaW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgcHJvamVjdE5vdGVzSW5wdXQudmFsdWUgPSBhcHBDb250cm9sbGVyLmdldFByb2plY3ROb3RlcyhcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmRhdGFzZXQudHlwZSxcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmRhdGFzZXQuaW5kZXhcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd01vZGFsRm9yTmV3UHJvamVjdChlKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsRm9yTmV3UHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbF9mb3JfcHJvamVjdCcpO1xuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZV9wcm9qZWN0X21vZGFsJyk7XG4gICAgICAgIGNvbnN0IGFkZE5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3X3Byb2plY3QnKTtcbiAgICAgICAgY29uc3QgY2hhbmdlUHJvamVjdFZhbHVlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcudXBkYXRlX3Byb2plY3RfbW9kYWwnXG4gICAgICAgICk7XG5cbiAgICAgICAgbW9kYWxGb3JOZXdQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ3Nob3dfbW9kYWwnKTtcblxuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0WzBdID09PSAnYWRkX3Byb2plY3QnKSB7XG4gICAgICAgICAgICBhZGROZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgICAgIGNoYW5nZVByb2plY3RWYWx1ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgICAgICBhZGROZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICBVSUNvbnRyb2xsZXIuYWRkTmV3UHJvamVjdFxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICdzZXR0aW5ncycpIHtcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5maWxsUHJvamVjdE1vZGFsV2l0aFByb2plY3REZXRhaWxzKCk7XG4gICAgICAgICAgICBjaGFuZ2VQcm9qZWN0VmFsdWVCdG4uY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAgICAgICAgICAgYWRkTmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgICAgICBjaGFuZ2VQcm9qZWN0VmFsdWVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgICAgIFVJQ29udHJvbGxlci51cGRhdGVQcm9qZWN0RGV0YWlsc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG1vZGFsRm9yTmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5oaWRlTW9kYWxGb3JOZXdQcm9qZWN0XG4gICAgICAgICk7XG5cbiAgICAgICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBVSUNvbnRyb2xsZXIuaGlkZU1vZGFsRm9yTmV3UHJvamVjdCk7XG4gICAgfVxuXG4gICAgLy8gU2hvdyBwcm9qZWN0IGRldGFpbHNcbiAgICBzdGF0aWMgdG9nZ2xlRm9yUHJvamVjdE5vdGVzKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0VHlwZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX3RpdGxlJykuZGF0YXNldC50eXBlO1xuICAgICAgICBjb25zdCBwcm9qZWN0Tm90ZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgJy5wcm9qZWN0X25vdGVzX2NvbnRhaW5lcidcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocHJvamVjdFR5cGUgPT09ICd1c2VyUHJvamVjdCcpIHtcbiAgICAgICAgICAgIHByb2plY3ROb3Rlc0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKCdzaG93X25vdGVzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvd1JlbW92ZUJ1dHRvbkluVXNlclByb2plY3RzKCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0RGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrX3RpdGxlJyk7XG4gICAgICAgIGNvbnN0IHByb2plY3RUYXNrc0xpc3QgPSBhcHBDb250cm9sbGVyLmdldFByb2plY3RUYXNrcyhcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmRhdGFzZXQudHlwZSxcbiAgICAgICAgICAgIHByb2plY3REZXRhaWxzLmRhdGFzZXQuaW5kZXhcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYnRuVG9SZW1vdmVQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICcucmVtb3ZlX3Byb2plY3RfYnRuJ1xuICAgICAgICApO1xuXG4gICAgICAgIGlmIChwcm9qZWN0RGV0YWlscy5kYXRhc2V0LnR5cGUgPT09ICdiYXNpY1Byb2plY3QnKSB7XG4gICAgICAgICAgICBidG5Ub1JlbW92ZVByb2plY3QuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3REZXRhaWxzLmRhdGFzZXQudHlwZSA9PT0gJ3VzZXJQcm9qZWN0Jykge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHByb2plY3RUYXNrc0xpc3QubGVuZ3RoID09PSAwIHx8XG4gICAgICAgICAgICAgICAgYXBwQ29udHJvbGxlci5jaGVja0lmQWxsVGFza3NBcmVEb25lKFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0RGV0YWlscy5kYXRhc2V0LmluZGV4XG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgYnRuVG9SZW1vdmVQcm9qZWN0LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnRuVG9SZW1vdmVQcm9qZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBzZXRBY3RpdmVDbGFzcyhwcm9qZWN0VGFyZ2V0LCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2plY3QnKTtcblxuICAgICAgICBwcm9qZWN0c0xpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgcHJvamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHByb2plY3RUYXJnZXQgPT09ICcnKSB7XG4gICAgICAgICAgICBwcm9qZWN0c0xpc3RbK3Byb2plY3RJbmRleCArIDJdLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHByb2plY3RUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dQcm9qZWN0TmFtZShwcm9qZWN0TmFtZSwgaW5kZXgsIHR5cGUpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RfdGl0bGUnKTtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2tfdGl0bGUnKTtcblxuICAgICAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgcHJvamVjdFRpdGxlQ29udGFpbmVyLmRhdGFzZXQuaW5kZXggPSBpbmRleDtcbiAgICAgICAgcHJvamVjdFRpdGxlQ29udGFpbmVyLmRhdGFzZXQudHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgc3RhdGljIHNldFByb2plY3ROb3Rlcyhwcm9qZWN0Tm90ZXMpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5vdGVzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3Rfbm90ZXMnKTtcblxuICAgICAgICBwcm9qZWN0Tm90ZXNDb250YWluZXIudGV4dENvbnRlbnQgPSBwcm9qZWN0Tm90ZXM7XG4gICAgfVxuXG4gICAgc3RhdGljIHNob3dQcm9qZWN0RGV0YWlscyhlKSB7XG4gICAgICAgIGxldCBwcm9qZWN0VHlwZTtcbiAgICAgICAgbGV0IHByb2plY3RJbmRleDtcbiAgICAgICAgbGV0IHByb2plY3RUYXJnZXQ7XG5cbiAgICAgICAgaWYgKGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcHJvamVjdFR5cGUgPSAnYmFzaWNQcm9qZWN0JztcbiAgICAgICAgICAgIHByb2plY3RJbmRleCA9IDA7XG4gICAgICAgICAgICBwcm9qZWN0VGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2plY3RUeXBlID0gZS50YXJnZXQuZGF0YXNldC50eXBlO1xuICAgICAgICAgICAgcHJvamVjdEluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleDtcbiAgICAgICAgICAgIHByb2plY3RUYXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgfVxuXG4gICAgICAgIFVJQ29udHJvbGxlci5zaG93UHJvamVjdE5hbWUoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldFByb2plY3ROYW1lKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpLFxuICAgICAgICAgICAgcHJvamVjdEluZGV4LFxuICAgICAgICAgICAgcHJvamVjdFR5cGVcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAocHJvamVjdFR5cGUgPT09ICd1c2VyUHJvamVjdCcpIHtcbiAgICAgICAgICAgIFVJQ29udHJvbGxlci5zZXRQcm9qZWN0Tm90ZXMoXG4gICAgICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRQcm9qZWN0Tm90ZXMocHJvamVjdFR5cGUsIHByb2plY3RJbmRleClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBVSUNvbnRyb2xsZXIucmVuZGVyUHJvamVjdFRhc2tzKFxuICAgICAgICAgICAgYXBwQ29udHJvbGxlci5nZXRQcm9qZWN0VGFza3MocHJvamVjdFR5cGUsIHByb2plY3RJbmRleClcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2hvd1JlbW92ZUJ1dHRvbkluVXNlclByb2plY3RzKCk7XG5cbiAgICAgICAgVUlDb250cm9sbGVyLnNldEFjdGl2ZUNsYXNzKHByb2plY3RUYXJnZXQsICcnKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcnNUb1Rhc2tzKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGFkZEV2ZW50TGlzdGVuZXJzVG9QYWdlKCkge1xuICAgICAgICBjb25zdCBiYXNpY1Byb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmJhc2ljX3Byb2plY3QnKTtcbiAgICAgICAgY29uc3QgdXNlclByb2plY3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVzZXJfcHJvamVjdCcpO1xuICAgICAgICBjb25zdCBhZGROZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZF9wcm9qZWN0Jyk7XG4gICAgICAgIGNvbnN0IGFkZE5ld1Rhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmV3X3Rhc2snKTtcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3RfdGl0bGUnKTtcbiAgICAgICAgY29uc3QgcmVtb3ZlUHJvamVjdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yZW1vdmVfcHJvamVjdF9idG4nKTtcbiAgICAgICAgY29uc3Qgc2V0dGluZ3NQcm9qZWN0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3Rfc2V0dGluZ3MnKTtcblxuICAgICAgICBiYXNpY1Byb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIHByb2plY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNob3dQcm9qZWN0RGV0YWlscyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVzZXJQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBwcm9qZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93UHJvamVjdERldGFpbHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBhZGROZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93TW9kYWxGb3JOZXdQcm9qZWN0KTtcblxuICAgICAgICBzZXR0aW5nc1Byb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICB0aGlzLnNob3dNb2RhbEZvck5ld1Byb2plY3RcbiAgICAgICAgKTtcblxuICAgICAgICBhZGROZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5zaG93TW9kYWxGb3JOZXdUYXNrKTtcblxuICAgICAgICBwcm9qZWN0VGl0bGVDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZvclByb2plY3ROb3Rlc1xuICAgICAgICApO1xuXG4gICAgICAgIHJlbW92ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICBVSUNvbnRyb2xsZXIucmVtb3ZlUHJvamVjdEZyb21MaXN0XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRmlyc3QgcGFnZSByZW5kZXJcbiAgICBzdGF0aWMgcmVuZGVyQmxhbmtQYWdlKCkge1xuICAgICAgICBVSUNvbnRyb2xsZXIucmVuZGVyUHJvamVjdExpc3QoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldENvbnRhaW5lcldpdGhQcm9qZWN0cygnYmFzaWNQcm9qZWN0JyksXG4gICAgICAgICAgICAnYmFzaWNQcm9qZWN0J1xuICAgICAgICApO1xuICAgICAgICBVSUNvbnRyb2xsZXIucmVuZGVyUHJvamVjdExpc3QoXG4gICAgICAgICAgICBhcHBDb250cm9sbGVyLmdldENvbnRhaW5lcldpdGhQcm9qZWN0cygndXNlclByb2plY3QnKSxcbiAgICAgICAgICAgICd1c2VyUHJvamVjdCdcbiAgICAgICAgKTtcblxuICAgICAgICBVSUNvbnRyb2xsZXIuc2hvd1Byb2plY3REZXRhaWxzKCk7XG5cbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyc1RvUGFnZSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNpY1Byb2plY3QgZnJvbSAnLi9jbGFzc2VzL0Jhc2ljUHJvamVjdCc7XG5pbXBvcnQgQmFzaWNUYXNrIGZyb20gJy4vY2xhc3Nlcy9CYXNpY1Rhc2snO1xuaW1wb3J0IFVzZXJQcm9qZWN0IGZyb20gJy4vY2xhc3Nlcy9Vc2VyUHJvamVjdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGFwcENvbnRyb2xsZXIge1xuICAgIHN0YXRpYyBjb250YWluZXJGb3JCYXNpY1Byb2plY3RzID0gW1xuICAgICAgICBuZXcgQmFzaWNQcm9qZWN0KCdEYWlseSBUYXNrcycpLFxuICAgICAgICBuZXcgQmFzaWNQcm9qZWN0KCdHcm9jZXJ5IExpc3QnKSxcbiAgICBdO1xuXG4gICAgc3RhdGljIGNvbnRhaW5lckZvclVzZXJQcm9qZWN0cyA9IFtdO1xuXG4gICAgc3RhdGljIGdldENvbnRhaW5lcldpdGhQcm9qZWN0cyhwcm9qZWN0VHlwZSkge1xuICAgICAgICBsZXQgY29udGFpbmVyRm9yUHJvamVjdHM7XG4gICAgICAgIGlmIChwcm9qZWN0VHlwZSA9PT0gJ2Jhc2ljUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lckZvclByb2plY3RzID0gdGhpcy5jb250YWluZXJGb3JCYXNpY1Byb2plY3RzO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RUeXBlID09PSAndXNlclByb2plY3QnKSB7XG4gICAgICAgICAgICBjb250YWluZXJGb3JQcm9qZWN0cyA9IHRoaXMuY29udGFpbmVyRm9yVXNlclByb2plY3RzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250YWluZXJGb3JQcm9qZWN0cztcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0UHJvamVjdChwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KSB7XG4gICAgICAgIGxldCBwcm9qZWN0VG9TaG93O1xuICAgICAgICBpZiAocHJvamVjdFR5cGUgPT09ICdiYXNpY1Byb2plY3QnKSB7XG4gICAgICAgICAgICBwcm9qZWN0VG9TaG93ID0gdGhpcy5jb250YWluZXJGb3JCYXNpY1Byb2plY3RzO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2plY3RUeXBlID09PSAndXNlclByb2plY3QnKSB7XG4gICAgICAgICAgICBwcm9qZWN0VG9TaG93ID0gdGhpcy5jb250YWluZXJGb3JVc2VyUHJvamVjdHM7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJvamVjdFRvU2hvd1twcm9qZWN0SW5kZXhdO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRQcm9qZWN0TmFtZShwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGhpcy5nZXRQcm9qZWN0KHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgICAgIHJldHVybiBwcm9qZWN0TmFtZS5nZXROYW1lKCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFByb2plY3RUYXNrcyhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KSB7XG4gICAgICAgIGxldCBwcm9qZWN0VGFza3M7XG4gICAgICAgIGlmIChwcm9qZWN0VHlwZSA9PT0gJ2Jhc2ljUHJvamVjdCcpIHtcbiAgICAgICAgICAgIHByb2plY3RUYXNrcyA9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJGb3JCYXNpY1Byb2plY3RzW3Byb2plY3RJbmRleF0uZ2V0VGFza3NMaXN0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdFR5cGUgPT09ICd1c2VyUHJvamVjdCcpIHtcbiAgICAgICAgICAgIHByb2plY3RUYXNrcyA9XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXJGb3JVc2VyUHJvamVjdHNbcHJvamVjdEluZGV4XS5nZXRUYXNrc0xpc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm9qZWN0VGFza3M7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldFByb2plY3ROb3Rlcyhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0aGlzLmdldFByb2plY3QocHJvamVjdFR5cGUsIHByb2plY3RJbmRleCk7XG5cbiAgICAgICAgcmV0dXJuIHByb2plY3QuZ2V0Tm90ZXMoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkTmV3VXNlclByb2plY3QobmV3UHJvamVjdE5hbWUsIG5ld1Byb2plY3ROb3Rlcykge1xuICAgICAgICB0aGlzLmNvbnRhaW5lckZvclVzZXJQcm9qZWN0cy5wdXNoKFxuICAgICAgICAgICAgbmV3IFVzZXJQcm9qZWN0KG5ld1Byb2plY3ROYW1lLCBuZXdQcm9qZWN0Tm90ZXMpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgc3RhdGljIGNoZWNrSWZBbGxUYXNrc0FyZURvbmUocHJvamVjdEluZGV4KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0VGFza3MgPSB0aGlzLmdldFByb2plY3RUYXNrcyhcbiAgICAgICAgICAgICd1c2VyUHJvamVjdCcsXG4gICAgICAgICAgICBwcm9qZWN0SW5kZXhcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gcHJvamVjdExpc3RUYXNrcy5ldmVyeSgodGFzaykgPT4gdGFzay5jaGVja0lzRG9uZSgpID09PSB0cnVlKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2VhcmNoUHJvamVjdFRvQWRkVGFzayhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KSB7XG4gICAgICAgIGxldCBjb250YWluZXJXaXRoUHJvamVjdDtcbiAgICAgICAgaWYgKHByb2plY3RUeXBlID09PSAnYmFzaWNQcm9qZWN0Jykge1xuICAgICAgICAgICAgY29udGFpbmVyV2l0aFByb2plY3QgPSB0aGlzLmNvbnRhaW5lckZvckJhc2ljUHJvamVjdHNbcHJvamVjdEluZGV4XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvamVjdFR5cGUgPT09ICd1c2VyUHJvamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lcldpdGhQcm9qZWN0ID0gdGhpcy5jb250YWluZXJGb3JVc2VyUHJvamVjdHNbcHJvamVjdEluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb250YWluZXJXaXRoUHJvamVjdDtcbiAgICB9XG5cbiAgICBzdGF0aWMgY2hhbmdlU3RhdHVzT2ZUYXNrKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgICAgICBjb25zdCBnZXRQcm9qZWN0VGFza3NMaXN0ID0gdGhpcy5nZXRQcm9qZWN0VGFza3MoXG4gICAgICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgICAgIHByb2plY3RJbmRleFxuICAgICAgICApO1xuXG4gICAgICAgIGdldFByb2plY3RUYXNrc0xpc3RbdGFza0luZGV4XS5jaGFuZ2VJc0RvbmUoKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgYWRkTmV3VGFza1RvUHJvamVjdChcbiAgICAgICAgcHJvamVjdFR5cGUsXG4gICAgICAgIHByb2plY3RJbmRleCxcbiAgICAgICAgdGFza05hbWUsXG4gICAgICAgIHRhc2tQcmlvcml0eSxcbiAgICAgICAgdGFza0R1ZURhdGUsXG4gICAgICAgIHRhc2tOb3Rlc1xuICAgICkge1xuICAgICAgICBjb25zdCBwcm9qZWN0VG9BZGRUYXNrID0gYXBwQ29udHJvbGxlci5zZWFyY2hQcm9qZWN0VG9BZGRUYXNrKFxuICAgICAgICAgICAgcHJvamVjdFR5cGUsXG4gICAgICAgICAgICBwcm9qZWN0SW5kZXhcbiAgICAgICAgKTtcblxuICAgICAgICBwcm9qZWN0VG9BZGRUYXNrLmFkZFRhc2tzVG9MaXN0KFxuICAgICAgICAgICAgbmV3IEJhc2ljVGFzayh0YXNrTmFtZSwgdGFza1ByaW9yaXR5LCB0YXNrRHVlRGF0ZSwgdGFza05vdGVzKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0YXRpYyByZW1vdmVUYXNrRnJvbVByb2plY3QocHJvamVjdFR5cGUsIHByb2plY3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUb1JlbW92ZVRhc2sgPSB0aGlzLnNlYXJjaFByb2plY3RUb0FkZFRhc2soXG4gICAgICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgICAgIHByb2plY3RJbmRleFxuICAgICAgICApO1xuXG4gICAgICAgIHByb2plY3RUb1JlbW92ZVRhc2sucmVtb3ZlVGFza0Zyb21MaXN0KHRhc2tJbmRleCk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbW92ZVByb2plY3QocHJvamVjdEluZGV4KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpdGhQcm9qZWN0cyA9XG4gICAgICAgICAgICB0aGlzLmdldENvbnRhaW5lcldpdGhQcm9qZWN0cygndXNlclByb2plY3QnKTtcblxuICAgICAgICBjb250YWluZXJXaXRoUHJvamVjdHMuc3BsaWNlKHByb2plY3RJbmRleCwgMSk7XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVByb2plY3REZXRhaWxzKFxuICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgcHJvamVjdEluZGV4LFxuICAgICAgICBuZXdQcm9qZWN0TmFtZSxcbiAgICAgICAgbmV3UHJvamVjdE5vdGVzXG4gICAgKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RUb1VwZGF0ZSA9IHRoaXMuZ2V0UHJvamVjdChwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KTtcblxuICAgICAgICBwcm9qZWN0VG9VcGRhdGUuc2V0TmV3TmFtZShuZXdQcm9qZWN0TmFtZSk7XG4gICAgICAgIHByb2plY3RUb1VwZGF0ZS5zZXROZXdOb3RlcyhuZXdQcm9qZWN0Tm90ZXMpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXRUYXNrKHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0VGFza3MgPSB0aGlzLmdldFByb2plY3RUYXNrcyhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4KTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdFRhc2tzW3Rhc2tJbmRleF0pO1xuICAgICAgICByZXR1cm4gcHJvamVjdFRhc2tzW3Rhc2tJbmRleF07XG4gICAgfVxuXG4gICAgc3RhdGljIHVwZGF0ZVRhc2tEZXRhaWxzKFxuICAgICAgICBwcm9qZWN0VHlwZSxcbiAgICAgICAgcHJvamVjdEluZGV4LFxuICAgICAgICB0YXNrSW5kZXgsXG4gICAgICAgIG5ld1Rhc2tOYW1lLFxuICAgICAgICBuZXdUYXNrUHJpb3JpdHksXG4gICAgICAgIG5ld1Rhc2tOb3RlcyxcbiAgICAgICAgbmV3VGFza0R1ZURhdGVcbiAgICApIHtcbiAgICAgICAgY29uc3QgdGFzayA9IHRoaXMuZ2V0VGFzayhwcm9qZWN0VHlwZSwgcHJvamVjdEluZGV4LCB0YXNrSW5kZXgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gdGhpcy5nZXRQcm9qZWN0KHByb2plY3RUeXBlLCBwcm9qZWN0SW5kZXgpO1xuXG4gICAgICAgIHRhc2suc2V0TmV3TmFtZShuZXdUYXNrTmFtZSk7XG4gICAgICAgIHRhc2suc2V0TmV3UHJpb3JpdHkobmV3VGFza1ByaW9yaXR5KTtcbiAgICAgICAgdGFzay5zZXROZXdOb3RlcyhuZXdUYXNrTm90ZXMpO1xuICAgICAgICB0YXNrLnNldER1ZURhdGUobmV3VGFza0R1ZURhdGUpO1xuXG4gICAgICAgIHByb2plY3Quc29ydFRhc2tzQnlQcmlvcml0eSgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljQ2xhc3NQYXR0ZXJuIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgfVxuXG4gICAgc2V0TmV3TmFtZShuZXdOYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5ld05hbWU7XG4gICAgfVxuXG4gICAgZ2V0TmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzaWNDbGFzc1BhdHRlcm4gZnJvbSAnLi9CYXNpY0NsYXNzUGF0dGVybic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2ljUHJvamVjdCBleHRlbmRzIEJhc2ljQ2xhc3NQYXR0ZXJuIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB0aGlzLnRhc2tzTGlzdCA9IFtdO1xuICAgICAgICB0aGlzLnR5cGUgPSAnYmFzaWNQcm9qZWN0JztcbiAgICB9XG5cbiAgICBzb3J0VGFza3NCeVByaW9yaXR5KCkge1xuICAgICAgICB0aGlzLnRhc2tzTGlzdC5zb3J0KChhLCBiKSA9PiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eSk7XG4gICAgfVxuXG4gICAgYWRkVGFza3NUb0xpc3QobmV3VGFzaykge1xuICAgICAgICB0aGlzLnRhc2tzTGlzdC5wdXNoKG5ld1Rhc2spO1xuICAgICAgICB0aGlzLnNvcnRUYXNrc0J5UHJpb3JpdHkoKTtcbiAgICB9XG5cbiAgICBnZXRUYXNrc0xpc3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tzTGlzdDtcbiAgICB9XG5cbiAgICByZW1vdmVUYXNrRnJvbUxpc3QoaSkge1xuICAgICAgICB0aGlzLnRhc2tzTGlzdC5zcGxpY2UoaSwgMSk7XG4gICAgfVxuXG4gICAgZ2V0UHJvamVjdFR5cGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2ljQ2xhc3NQYXR0ZXJuIGZyb20gJy4vQmFzaWNDbGFzc1BhdHRlcm4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNpY1Rhc2sgZXh0ZW5kcyBCYXNpY0NsYXNzUGF0dGVybiB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgcHJpb3JpdHksIG5vdGVzLCBkdWVEYXRlKSB7XG4gICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgICAgIHRoaXMuZHVlRGF0ZSA9XG4gICAgICAgICAgICBkdWVEYXRlIHx8XG4gICAgICAgICAgICBgJHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9LSR7XG4gICAgICAgICAgICAgICAgK25ldyBEYXRlKCkuZ2V0TW9udGgoKSA8IDEwXG4gICAgICAgICAgICAgICAgICAgID8gYDAke25ldyBEYXRlKCkuZ2V0TW9udGgoKX1gXG4gICAgICAgICAgICAgICAgICAgIDogbmV3IERhdGUoKS5nZXRNb250aCgpXG4gICAgICAgICAgICB9LSR7bmV3IERhdGUoKS5nZXREYXRlKCl9YDtcbiAgICAgICAgdGhpcy5ub3RlcyA9IG5vdGVzO1xuICAgICAgICB0aGlzLmlzRG9uZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNldE5ld1ByaW9yaXR5KG5ld1ByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQcmlvcml0eVZhbHVlVG9TdHIoKSB7XG4gICAgICAgIGlmICgrdGhpcy5wcmlvcml0eSA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuICdoaWdoJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgrdGhpcy5wcmlvcml0eSA9PT0gMikge1xuICAgICAgICAgICAgcmV0dXJuICdtZWRpdW0nO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICdsb3cnO1xuICAgIH1cblxuICAgIGdldFByaW9yaXR5SW5EaWdpdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpb3JpdHk7XG4gICAgfVxuXG4gICAgZ2V0UHJpb3JpdHlJblN0cigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlUHJpb3JpdHlWYWx1ZVRvU3RyKCk7XG4gICAgfVxuXG4gICAgc2V0TmV3Tm90ZXMobmV3Tm90ZXMpIHtcbiAgICAgICAgdGhpcy5ub3RlcyA9IG5ld05vdGVzO1xuICAgIH1cblxuICAgIGdldE5vdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RlcztcbiAgICB9XG5cbiAgICBzZXREdWVEYXRlKG5ld0R1ZURhdGUpIHtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB9XG5cbiAgICBnZXREdWVEYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kdWVEYXRlO1xuICAgIH1cblxuICAgIGNoYW5nZUlzRG9uZSgpIHtcbiAgICAgICAgdGhpcy5pc0RvbmUgPSAhdGhpcy5pc0RvbmU7XG4gICAgfVxuXG4gICAgY2hlY2tJc0RvbmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzRG9uZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzaWNQcm9qZWN0IGZyb20gJy4vQmFzaWNQcm9qZWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlclByb2plY3QgZXh0ZW5kcyBCYXNpY1Byb2plY3Qge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIG5vdGVzKSB7XG4gICAgICAgIHN1cGVyKG5hbWUpO1xuICAgICAgICB0aGlzLm5vdGVzID0gbm90ZXM7XG4gICAgICAgIHRoaXMudHlwZSA9ICd1c2VyUHJvamVjdCc7XG4gICAgfVxuXG4gICAgc2V0TmV3Tm90ZXMobmV3Tm90ZXMpIHtcbiAgICAgICAgdGhpcy5ub3RlcyA9IG5ld05vdGVzO1xuICAgIH1cblxuICAgIGdldE5vdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RlcztcbiAgICB9XG5cbiAgICBnZXRQcm9qZWN0VHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZTtcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBVSUNvbnRyb2xsZXIgZnJvbSAnLi9VSUNvbnRyb2xsZXInO1xuXG5VSUNvbnRyb2xsZXIucmVuZGVyQmxhbmtQYWdlKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=