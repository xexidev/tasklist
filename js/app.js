const displayHolder = document.getElementById('display-holder');
const main = document.getElementById('main');
const sidebar = document.getElementById('sidebar');
const HTMLTaskList = document.getElementById('tasklist');

const taskElementTpl = document.getElementById('tasklist-element-template');

const withoutTasksTpl = document.createElement('div');
const withoutTasksTplContent = document.getElementById('without-tasks-template').content.cloneNode(true);
withoutTasksTpl.appendChild(withoutTasksTplContent);

const welcomeTpl = document.createElement('div');
const welcomeTplContent = document.getElementById('welcome-template').content.cloneNode(true);
welcomeTpl.appendChild(welcomeTplContent);

const taskTpl = document.createElement('div');
const taskTplContent = document.getElementById('task-template').content.cloneNode(true);
taskTpl.appendChild(taskTplContent);

const btnSave = document.getElementById('task-save');
const btnActive = document.getElementById('task-active');
const btnImportant = document.getElementById('task-important');
const btnCompleted = document.getElementById('task-completed');
const btnDeleteSingle = document.getElementById('task-delete');
const btnDeleteBulk = document.getElementById('list-delete-bulk');
const btnNew = document.getElementById('list-new');
const btnTaskNew = document.getElementById('task-new');

const taskListBtns = [btnDeleteBulk];
const taskBtns = [btnSave,btnActive,btnImportant,btnCompleted,btnDeleteSingle];

let checkedTasks = [];

let taskList = []
if (localStorage.getItem('taskList')) {
    taskList = JSON.parse(localStorage.getItem('taskList'));
};

class Task {
    constructor (title,date,description,creationDate) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.creationDate = creationDate;
        this.modificationDate = null;
        this.isImportant = false;
        this.isCompleted = false;
        this.isExpired = false;
        this.isActive = true;
    };
    getDataFrom(container,title,date,description) {
        this.title = encodeURIComponent(title);
        this.date = date;
        this.description = encodeURIComponent(description);
        this.modificationDate = new Date().toISOString();
        this.checkIfExpired(this.date);
        this.isImportant = container.hasAttribute("important") ? true : false;
        this.isCompleted = container.hasAttribute("completed") ? true : false;
        this.isActive = container.hasAttribute("active") ? true : false;
    };
    putDataTo(container,title,date,description) {
        this.checkIfExpired(this.date);
        //Reset attributes
        container.removeAttribute("important");
        container.removeAttribute("expired");
        container.removeAttribute("completed");
        container.removeAttribute("active");
        //Set attributes
        if(this.isImportant) { container.toggleAttribute("important"); };
        if(this.isCompleted) { container.toggleAttribute("completed"); };
        if(this.isExpired) { container.toggleAttribute("expired"); };
        if(this.isActive) { container.toggleAttribute("active"); };
        container.setAttribute('date-id',this.creationDate); //Not in use
        if(title) { title.innerHTML = title.value = decodeURIComponent(this.title) };
        if(date) {
            date.innerHTML = date.value = this.date;
            if (this.date === '') {
                date.innerHTML = txtkey_undated;
            };
        };
        if(description) { description.innerHTML = description.value = decodeURIComponent(this.description) };
    };
    checkIfExpired(date) {
        let currentDate = new Date();
        let isoDate = parseInt(currentDate.toISOString().split('T')[0].replace(/-/g,''));
        let taskIsoDate = parseInt(date.replace(/-/g,''));
        if(isoDate > taskIsoDate) {
            this.isExpired = true;
        } else {
            this.isExpired = false;
        };
    };
};

//Check localStorage and start
if (typeof(Storage) !== 'undefined') {
    router();
} else {
    alert(txtkey_localStorageError)
    throw new Error('LocalStorage not supported.');
};

//Set the route
function router() {
    renderTaskList();
    if (taskList.length === 0) {                        //List is empty        
        renderWithoutTasks();
        displayHolder.focus();
    } else {                                            //List is not empty
        if(typeof(activeTask) === 'undefined') {        //No active task
            renderWelcome();
        } else {                                        //Active task exists
            renderTask();
        };
        HTMLTaskList.focus();
    };
};

//New task
function newTask() {    
    let currentDate = new Date().toISOString();
    activeTask = new Task('','','',currentDate);
    taskList.unshift(activeTask);
    localStorage.setItem('taskList',JSON.stringify(taskList));
    renderTaskList();
    renderTask();
    document.getElementById('title').focus();
};

//Save task
function saveTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let description = document.getElementById('description').value;
    activeTask.getDataFrom(main,title,date,description);
    taskList[taskList.findIndex(task => task.creationDate === activeTask.creationDate)] = Object.assign({...activeTask});
    if(activeTask.isExpired) { alert(txtkey_taskIsExpired); };
    localStorage.setItem('taskList',JSON.stringify(taskList))
    HTMLTaskList.focus();
};

//Set task as active
function toggleActive() {
    main.toggleAttribute("active");
};

//Set task as important
function toggleImportant() {
    main.toggleAttribute("important");
};

//Set task as completed
function toggleCompleted() {
    main.toggleAttribute("completed");
};

//Delete single task
function deleteSingleTask() {    
    let taskName = activeTask.title === '' ? txtkey_untitledTask : decodeURIComponent(activeTask.title);
    if (confirm(`${txtkey_delete} ${taskName}?`)) {
        taskList.splice(taskList.indexOf(taskList[taskList.findIndex(task => task.creationDate === activeTask.creationDate)]),1);
        localStorage.setItem('taskList',JSON.stringify(taskList));
        delete activeTask;
        router();
        HTMLTaskList.focus();
    };
};

//Delete multiple tasks
function deleteMultipleTasks() {    
    if (confirm(txtkey_deleteSelected)) {
        let newTaskList = [];
        //Check if task is checked
        function isChecked(task) {
            let isChecked = false;
            checkedTasks.forEach(checked => {
                if (task.creationDate === checked) {
                    isChecked = true;
                };
            })
            return isChecked;
        };
        taskList.forEach(task => {
            if (!isChecked(task)) {
                newTaskList.push(task);
            };
        });
        taskList = newTaskList;
        checkedTasks = [];
        sidebar.removeAttribute('checked');
        localStorage.setItem('taskList',JSON.stringify(taskList));
        delete activeTask;
        router();
        HTMLTaskList.focus();
    };
};

//Set listeners on headers's buttons
btnNew.addEventListener('click', () => {
    if (unsavedChanges()) {
        let taskName = activeTask.title === '' ? txtkey_untitledTask : decodeURIComponent(activeTask.title);
        if(confirm(`${txtkey_save} ${taskName}?`)) {
            saveTask();
        };
    };
    newTask();
    hideSidebar();
});
btnTaskNew.addEventListener('click', () => {
    if (unsavedChanges()) {
        let taskName = activeTask.title === '' ? txtkey_untitledTask : decodeURIComponent(activeTask.title);
        if(confirm(`${txtkey_save} ${taskName}?`)) {
            saveTask();
        };
    };
    newTask();
});
btnSave.addEventListener('click', () => {
    saveTask();
    renderTaskList();
});
btnActive.addEventListener('click', () => {
    toggleActive();
    toggleChecked(btnActive);
});
btnImportant.addEventListener('click', () => {
    toggleImportant();
    toggleChecked(btnImportant);
});
btnCompleted.addEventListener('click', () => {
    toggleCompleted();
    toggleChecked(btnCompleted);
});
btnDeleteSingle.addEventListener('click', () => {
    deleteSingleTask();
});
btnDeleteBulk.addEventListener('click', () => {
    deleteMultipleTasks();
});

//Render tasklist
function renderTaskList() {
    if (taskList.length === 0) {
        let newList = document.createElement('div');
        HTMLTaskList.innerHTML = newList.innerHTML;
        hideSidebar();
    } else {
        let newList = document.createElement('div');
        
        let tabIndex = 3001;
        taskList.forEach(task => {
            task = Object.assign(new Task, {...task});

            //Render elements
            let listElementTpl = taskElementTpl.content.cloneNode(true);
            let listElement =  listElementTpl.querySelector('.tasklist-element');
            let listElementCheckbox = listElementTpl.querySelector('.task-checkbox');
            let listElementSelectable = listElementTpl.querySelector('.task-selectable');
            let listElementTitle = listElementTpl.querySelector('.title');
            let listElementDate = listElementTpl.querySelector('.date');
            
            task.putDataTo(listElement,listElementTitle,listElementDate);
            let titleToPut = task.title === '' ? txtkey_untitledTask : decodeURIComponent(task.title);
            listElement.setAttribute('title',`Task name: ${titleToPut}`);
            listElementTitle.innerHTML = titleToPut;
            if (listElementDate.innerHTML === txtkey_undated) { listElementDate.innerHTML = ''};

            listElement.setAttribute('tabindex',tabIndex);
            tabIndex++;
            listElementCheckbox.setAttribute('tabindex',tabIndex);
            tabIndex++;
            listElementSelectable.setAttribute('tabindex',tabIndex);
            tabIndex++;

            newList.appendChild(listElementTpl);
        });    
        HTMLTaskList.innerHTML = newList.innerHTML;

        //Set listeners    
        let HTMLTasks = document.querySelectorAll('.tasklist-element');
        HTMLTasks.forEach(HTMLTask => {       
            //Search selected task 
            HTMLTask.classList.remove('selected');
            if(typeof(activeTask) !== 'undefined' && HTMLTask.getAttribute('date-id') === activeTask.creationDate) {
                HTMLTask.classList.add('selected');
            };
            //Checkbox listener
            let listElementCheckbox = HTMLTask.querySelector('.task-checkbox');
            listElementCheckbox.addEventListener('change', () => {
                if(listElementCheckbox.checked) {
                    checkedTasks.push(HTMLTask.getAttribute('date-id'));
                } else {
                    checkedTasks.pop(HTMLTask.getAttribute('task-id'));
                };
                if(checkedTasks.length === 0) {
                    unsetButtons(taskListBtns);
                } else {
                    setButtons(taskListBtns);
                };
            });
            if(checkedTasks.length === 0) {
                unsetButtons(taskListBtns);
            } else {
                setButtons(taskListBtns);
            };
            //Select task listener
            HTMLTask.querySelector('.task-selectable').addEventListener('click', () => {
                if (!HTMLTask.classList.contains('selected')) {
                    if (unsavedChanges()) {
                        let taskName = activeTask.title === '' ? txtkey_untitledTask : decodeURIComponent(activeTask.title);
                        if(confirm(`${txtkey_save} ${taskName}?`)) {
                            saveTask();
                            selectedTask = taskList[taskList.findIndex(task => task.creationDate === HTMLTask.getAttribute('date-id'))];
                            activeTask = Object.assign(new Task, {...selectedTask});
                            renderTaskList();
                        };
                    } else {
                        selectedTask = taskList[taskList.findIndex(task => task.creationDate === HTMLTask.getAttribute('date-id'))];
                        activeTask = Object.assign(new Task, {...selectedTask});
                        HTMLTasks.forEach(HTMLTask => { HTMLTask.classList.remove('selected'); });
                        HTMLTask.classList.add('selected');
                    };
                    renderTask();                    
                };
                document.getElementById('form').focus();
            });
            mobilejsHideSidebarOnClick(HTMLTask.querySelector('.task-selectable'));
        });
    };
    translateDom(lang);
};

//Render task
function renderTask() {
    setButtons(taskBtns);

    //Render
    displayHolder.innerHTML = taskTpl.innerHTML;

    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let description = document.getElementById('description');
    let dateText = document.getElementById('date-picker-text');

    activeTask.putDataTo(main,title,date,description);
    dateText.innerHTML = activeTask.date === '' ? txtkey_undated : activeTask.date;

    //Title & Description auto-resize
    resizeTextArea();
    title.addEventListener('input', resizeTextArea);
    description.addEventListener('input', resizeTextArea);
    window.onresize = resizeTextArea;
    function resizeTextArea() {        
        description.style.height = 0;
        title.style.height = 0;
        description.style.height = description.scrollHeight + 'px';
        title.style.height = title.scrollHeight + 'px';
    };

    //Date text on change listener    
    date.addEventListener('change', () => {
        dateText.innerHTML = date.value === '' ? txtkey_undated : date.value;
        let currentDate = new Date();
        let isoDate = parseInt(currentDate.toISOString().split('T')[0].replace(/-/g,''));
        let taskIsoDate = parseInt(dateText.innerHTML.replace(/-/g,''))
        if (isoDate > taskIsoDate) {
            main.setAttribute("expired","");
        } else 
        if (isoDate <= taskIsoDate) {
            main.removeAttribute("expired");
        };
    });
    
    //Save task on Enter key keydown on task HTML title input
    title.addEventListener('keydown', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault();
            saveTask();
            renderTaskList();
        };
    });
    translateDom(lang);
    
    //Focus on Save Task Button on Tab on Description text
    description.addEventListener('keydown', (e) => {
        if(e.code === 'Tab') {
            e.preventDefault();
            btnSave.focus();
        };
    });

    //Set task status mobile buttons listeners
    let btnActiveMobile = document.getElementById('task-active-mobile');
    let btnImportantMobile = document.getElementById('task-important-mobile');
    let btnCompletedMobile = document.getElementById('task-completed-mobile');
    btnActiveMobile.addEventListener('click', () => { toggleChecked(btnActiveMobile); toggleActive(); });
    btnImportantMobile.addEventListener('click', () => { toggleChecked(btnImportantMobile); toggleImportant(); });
    btnCompletedMobile.addEventListener('click', () => { toggleChecked(btnCompletedMobile); toggleCompleted(); });
    
    document.title = activeTask.title !== '' ? decodeURIComponent(activeTask.title) : txtkey_docTitleUntitledTask;
};

//Render 'without tasks' screen and set listeners
function renderWithoutTasks() {
    unsetButtons(taskBtns);
    displayHolder.innerHTML = withoutTasksTpl.innerHTML;
    let btnNew = document.getElementsByClassName('new-task-btn');
    let btnNewArray = Array.from(btnNew);
    btnNewArray.forEach(btn => {
        btn.addEventListener('click', () => { 
            newTask();
        });
    });
    translateDom(lang);
    document.title = `Xexi Tasklist: ${txtkey_docTitleNoTasks}`;
};

//Render 'welcome' screen and set listeners
function renderWelcome() {
    unsetButtons(taskBtns);
    displayHolder.innerHTML = welcomeTpl.innerHTML;
    let btnNew = document.getElementsByClassName('new-task-btn');
    let btnNewArray = Array.from(btnNew);
    btnNewArray.forEach(btn => {
        btn.addEventListener('click', () => { 
            newTask();
        });
    });
    translateDom(lang);
    document.title = `Xexi Tasklist: ${txtkey_docTitleSelectTask}`;
};

//Check for unsaved changes
unsavedChanges = () => {
    if(typeof(activeTask) !== 'undefined') {
        let titleInDisplay = document.getElementById('title').value;
        let dateInDisplay = document.getElementById('date').value;
        let descriptionInDisplay = document.getElementById('description').value;
        if(decodeURIComponent(activeTask.title) !== titleInDisplay || 
            activeTask.date !== dateInDisplay || 
            decodeURIComponent(activeTask.description) !== descriptionInDisplay || 
            (!activeTask.isImportant && main.hasAttribute("important")) ||
            (activeTask.isImportant && !main.hasAttribute("important")) || 
            (!activeTask.isCompleted && main.hasAttribute("completed")) ||
            (activeTask.isCompleted && !main.hasAttribute("completed")) ||
            (!activeTask.isActive && main.hasAttribute("active")) ||
            (activeTask.isActive && !main.hasAttribute("active"))) {
            return true;
        } else {
            return false;
        };
    };
};

//Set / Unset buttons
function unsetButtons(btnArray) {
    btnArray.forEach(btn => {
        btn.setAttribute('disabled','');
        btn.setAttribute('aria-disabled','true');
    });
};
function setButtons(btnArray) {
    btnArray.forEach(btn => {
        btn.removeAttribute('disabled','');
        btn.setAttribute('aria-disabled','false');
    });
};

//Toggle 'aria checked' on buttons
function toggleChecked(btn) {
    if (btn.getAttribute('aria-checked') === 'true') {
        btn.setAttribute('aria-checked','false');
    } else {
        btn.setAttribute('aria-checked','true');
    };
};