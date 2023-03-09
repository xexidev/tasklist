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
const btnNewMobile = document.getElementById('task-new');

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
        container.setAttribute('date-id',this.creationDate);
        if(this.isImportant) { container.toggleAttribute("important"); };
        if(this.isCompleted) { container.toggleAttribute("completed"); };
        if(this.isExpired) { container.toggleAttribute("expired"); };
        if(this.isActive) { container.toggleAttribute("active"); };
        if(title) { title.innerHTML = title.value = decodeURIComponent(this.title) };
        if(date) { date.innerHTML = date.value = this.date; };
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
if (typeof(Storage) === 'undefined') {
    alert(txtkey_localStorageError)
    throw new Error('LocalStorage not supported.');
} else {
    app();
};

//Set the route
function app() {
    renderTaskList();
    if (taskList.length === 0) {                        //List is empty        
        renderWithoutTasks();
        displayHolder.focus();
        window.scrollTo(0, 0);
    } else {                                            //List is not empty
        if(typeof(activeTask) === 'undefined') {        //No active task
            renderWelcome();
        } else {                                        //Active task exists
            renderTask();
        };
        HTMLTaskList.focus();
        window.scrollTo(0, 0);
    };
};

//New task
function newTask() {    
    checkedTasks = [];
    let currentDate = new Date().toISOString();
    activeTask = new Task('','','',currentDate);
    taskList.unshift(activeTask);
    localStorage.setItem('taskList',JSON.stringify(taskList));
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
    window.scrollTo(0, 0);
};

//Delete single task
function deleteSingleTask() {    
    let taskName = activeTask.title === '' ? txtkey_untitledTask : decodeURIComponent(activeTask.title);
    if (confirm(`${txtkey_delete} ${taskName}?`)) {
        taskList.splice(taskList.indexOf(taskList[taskList.findIndex(task => task.creationDate === activeTask.creationDate)]),1);
        localStorage.setItem('taskList',JSON.stringify(taskList));
        delete activeTask;
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
        localStorage.setItem('taskList',JSON.stringify(taskList));
        delete activeTask;
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
    renderTaskList();
    renderTask();
    document.getElementById('title').focus();
    window.scrollTo(0, 0);
    hideSidebar();
});
btnNewMobile.addEventListener('click', () => {
    if (unsavedChanges()) {
        let taskName = activeTask.title === '' ? txtkey_untitledTask : decodeURIComponent(activeTask.title);
        if(confirm(`${txtkey_save} ${taskName}?`)) {
            saveTask();
        };
    };
    newTask();
    renderTaskList();
    renderTask();
    document.getElementById('title').focus();
    window.scrollTo(0, 0);
});
btnSave.addEventListener('click', () => {
    saveTask();
    renderTaskList();
});
btnActive.addEventListener('click', () => {
    main.toggleAttribute("active");
    HTMLTaskList.querySelectorAll(`li[date-id="${activeTask.creationDate}"]`)[0].toggleAttribute("active");
    toggleAriaChecked(btnActive);
});
btnImportant.addEventListener('click', () => {
    main.toggleAttribute("important");
    HTMLTaskList.querySelectorAll(`li[date-id="${activeTask.creationDate}"]`)[0].toggleAttribute("important");
    toggleAriaChecked(btnImportant);
});
btnCompleted.addEventListener('click', () => {
    main.toggleAttribute("completed");
    HTMLTaskList.querySelectorAll(`li[date-id="${activeTask.creationDate}"]`)[0].toggleAttribute("completed");
    toggleAriaChecked(btnCompleted);
});
btnDeleteSingle.addEventListener('click', () => {
    deleteSingleTask();
    app();
    HTMLTaskList.focus();
    window.scrollTo(0, 0);
});
btnDeleteBulk.addEventListener('click', () => {
    deleteMultipleTasks();
    app();
    HTMLTaskList.focus();
    window.scrollTo(0, 0);
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

            if (listElementTitle.innerHTML === '') {
                listElementTitle.setAttribute('txtkey','untitledTask');
            } else {
                listElement.setAttribute('titlekey','untitledTask');
            };

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
                window.scrollTo(0, 0);
            });
            mobilejsHideSidebarOnClick(HTMLTask.querySelector('.task-selectable'));

            //Scrolling title on tasklist
            let title = HTMLTask.getElementsByClassName('title')[0];
            let titleBox = HTMLTask.getElementsByClassName('titlebox')[0];
            let titleBoxWidth = HTMLTask.getElementsByClassName('titlebox')[0].offsetWidth;
            let titleTextWidth = HTMLTask.getElementsByClassName('title')[0].scrollWidth;
            let margin = 0;
            let scroll;
                            
            if (titleTextWidth > titleBoxWidth) {
                titleBox.addEventListener('mouseover', () => {
                    scroll = setInterval(() => {
                        title.style.transition = 'margin-left 300ms linear'
                        title.style.marginLeft = `-${margin}px`;
                        margin++;
                        if (margin > titleTextWidth) {                        
                            clearInterval(scroll);
                            margin = 0;
                            title.style.marginLeft = `-${margin}px`;
                            title.style.transition = 'margin-left 300ms ease-in-out'
                        };
                    },10);
                });
                titleBox.addEventListener('mouseout', () => {
                    clearInterval(scroll);
                    margin = 0;
                    title.style.marginLeft = `-${margin}px`;
                    title.style.transition = 'margin-left 300ms ease-in-out';
                });
            };
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

    if(activeTask.date === '') {
        dateText.setAttribute('txtkey','undated');
    } else {
        dateText.innerHTML = getFormattedDate(activeTask.date);
    };

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
        if (date.value === '') {
            dateText.setAttribute('txtkey','undated');
            dateText.innerHTML = txtkey_undated;
        } else {
            dateText.innerHTML = getFormattedDate(date.value);
            dateText.removeAttribute('txtkey');
        };
        //Check if expired
        let currentDate = new Date();
        let isoDate = parseInt(currentDate.toISOString().split('T')[0].replace(/-/g,''));
        let taskIsoDate = parseInt(new Date(date.value).toISOString().split('T')[0].replace(/-/g,''));
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
    
    //Focus on Save Task Button on Tab on Description text
    description.addEventListener('keydown', (e) => {
        if(e.code === 'Tab') {
            e.preventDefault();
            btnSave.focus();
            window.scrollTo(0, 0);
        };
    });

    //Set task status mobile buttons listeners
    let btnActiveMobile = document.getElementById('task-active-mobile');
    let btnImportantMobile = document.getElementById('task-important-mobile');
    let btnCompletedMobile = document.getElementById('task-completed-mobile');
    btnActiveMobile.addEventListener('click', () => {
        main.toggleAttribute("active");
        toggleAriaChecked(btnActiveMobile);
    });
    btnImportantMobile.addEventListener('click', () => {
        main.toggleAttribute("important");
        toggleAriaChecked(btnImportantMobile);
    });
    btnCompletedMobile.addEventListener('click', () => {
        main.toggleAttribute("completed");
        toggleAriaChecked(btnCompletedMobile);
    });

    //Set aria-checked attribute on buttons
    if (main.hasAttribute('active')) {
        btnActive.setAttribute('aria-checked','true');
        btnActiveMobile.setAttribute('aria-checked','true');
    } else {
        btnActive.setAttribute('aria-checked','false');
        btnActiveMobile.setAttribute('aria-checked','false');
    };
    if (main.hasAttribute('important')) {
        btnImportant.setAttribute('aria-checked','true');
        btnImportantMobile.setAttribute('aria-checked','true');
    } else {
        btnImportant.setAttribute('aria-checked','false');
        btnImportantMobile.setAttribute('aria-checked','false');
    };
    if (main.hasAttribute('completed')) {
        btnCompleted.setAttribute('aria-checked','true');
        btnCompletedMobile.setAttribute('aria-checked','true');
    } else {        
        btnCompleted.setAttribute('aria-checked','false');
        btnCompletedMobile.setAttribute('aria-checked','false');
    };
    
    //Set document title
    if (activeTask.title === '') {
        document.getElementsByTagName("title")[0].setAttribute('txtkey','untitledTask');
    } else {
        document.getElementsByTagName("title")[0].removeAttribute('txtkey');
        document.title = decodeURIComponent(activeTask.title);
    };

    translateDom(lang);
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
            renderTaskList();
            renderTask();
            document.getElementById('title').focus();
            window.scrollTo(0, 0);
        });
    });
    document.getElementsByTagName("title")[0].setAttribute('txtkey','docTitleNoTasks');
    translateDom(lang);
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
            renderTaskList();
            renderTask();
            document.getElementById('title').focus();
            window.scrollTo(0, 0);
        });
    });
    document.getElementsByTagName("title")[0].setAttribute('txtkey','docTitleSelectTask');
    translateDom(lang);
};

//Check for unsaved changes
unsavedChanges = () => {
    if(typeof(activeTask) !== 'undefined') {
        if(decodeURIComponent(activeTask.title) !== title.value || 
            activeTask.date !== date.value || 
            decodeURIComponent(activeTask.description) !== description.value || 
            (activeTask.isImportant !== main.hasAttribute("important")) ||
            (activeTask.isCompleted !== main.hasAttribute("completed")) ||
            (activeTask.isActive !== main.hasAttribute("active"))) {
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
function toggleAriaChecked(btn) {
    if (btn.getAttribute('aria-checked') === 'true') {
        btn.setAttribute('aria-checked','false');
    } else {
        btn.setAttribute('aria-checked','true');
    };
};