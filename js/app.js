const mainHolder = document.getElementById('main-holder');

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

const task = taskTpl.querySelector('#task');
const title = taskTpl.querySelector('#title');
const date = taskTpl.querySelector('#date');
const description = taskTpl.querySelector('#description');

const btnSave = document.getElementById('task-save');
const btnDeleteSingle = document.getElementById('task-delete');
const taskBtns = [btnSave,btnDeleteSingle];

const btnNew = document.getElementById('list-new');
const taskListBtns = [btnNew];

const HTMLTaskList = document.getElementById('tasklist');
var HTMLTasks = [];

if (localStorage.getItem('taskList')) {
    var taskList = JSON.parse(localStorage.getItem('taskList'));
} else {
    var taskList = [];
};

class Task {
    constructor (title,date,description) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.creationDate = '';
        this.modificationDate = '';
        this.isImportant = false;
        this.isCompleted = false;
        this.isExpired = false;
        this.isActive = true;
    };
};

let activeTask = new Task();

//Start
router();

//Set the route
function router() {
    if (taskList.length === 0) {                //List is empty
        setAsInactive(taskBtns);
        renderWithoutTasks();
        document.title = 'Ninguna tarea creada. Crea una nueva tarea.';
    } else {                                    //List is not empty.
        taskList.forEach(task => {
            if(isExpired(task)) {
                task.isExpired = true;
            } else {
                taskList.isExpired = false;
            };
        });
        if(activeTask.title === undefined) {    //No active element.
            setAsInactive(taskBtns);
            renderWelcome();
            document.title = 'Selecciona o crea una tarea';
        } else {                                //Active element exists.
            setAsActive(taskBtns);
            renderTask();
            setSaveOnTitleEnter()
            document.title = activeTask.title;
        };        
    };
    renderTaskList();
};

//Saving task on taskList
function setNewTask(type) {

    let titleInDisplay = document.getElementById('title');
    let dateInDisplay = document.getElementById('date');
    let descriptionInDisplay = document.getElementById('description');

    if(type === 'newTask') {
        activeTask = new Task(title.getAttribute('placeholder'),'','');
        activeTask.creationDate = new Date().toISOString();
        taskList.unshift(activeTask);
    } else
    if(type === 'saveTask') {
        if (titleInDisplay.value === '') {
            activeTask.title = titleInDisplay.getAttribute('placeholder');
        } else {
            activeTask.title = titleInDisplay.value;
        };
        activeTask.date = dateInDisplay.value;
        activeTask.description = descriptionInDisplay.value;
        activeTask.modificationDate = new Date().toISOString();        
        if(isExpired(activeTask)) {            
            alert('La fecha límite de la tarea es anterior a la actual, aparecerá como caducada.')
            activeTask.isExpired = true;
        } else {
            activeTask.isExpired = false;
        };
    };
    localStorage.setItem('taskList',JSON.stringify(taskList));
    router();
};

//New task action
btnNew.addEventListener('click', () => { setNewTask('newTask') });
mobilejsHideSidebar(btnNew);

//Save task action
btnSave.addEventListener('click', () => { setNewTask('saveTask') });

//Save task action on Enter key keydown on task HTML title input
function setSaveOnTitleEnter() {
    document.getElementById('title').addEventListener('keydown', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            setNewTask('saveTask');
            e.preventDefault();
        };
    });
};

//Remove single task
btnDeleteSingle.addEventListener('click', () => {
    if (activeTask.title === undefined) {
        alert('Ninguna tarea seleccionada.');
    } else {
        let confirmDelete = confirm(`¿Deseas eliminar la tarea ${activeTask.title} ?`);
        if (confirmDelete) {
            taskList.splice(taskList.indexOf(activeTask),1);
            localStorage.setItem('taskList',JSON.stringify(taskList));
            activeTask = new Task();
            router();
        };
    };
});

//Render tasklist
function renderTaskList() {    
    let HTMLNewList = document.createElement('div');
    
    taskList.forEach(task => {
        let HTMLNewListElement = taskElementTpl.content.cloneNode(true);
        HTMLNewListElement.querySelector('.tasklist-element').setAttribute('date-id', `${task.creationDate}`)
        if (task.isExpired) {HTMLNewListElement.querySelector('.tasklist-element').classList.add('expired')};
        HTMLNewListElement.querySelector('.title').innerHTML = task.title;
        HTMLNewListElement.querySelector('.date').innerHTML = task.date;
        HTMLNewList.appendChild(HTMLNewListElement);
    });
    
    HTMLTaskList.innerHTML = HTMLNewList.innerHTML;
    
    HTMLTasks = document.querySelectorAll('.tasklist-element');

    HTMLTasks.forEach(HTMLTask => {
        HTMLTask.classList.remove('selected');
        if(HTMLTask.getAttribute('date-id') === activeTask.creationDate) {
            HTMLTask.classList.add('selected');
        };
        HTMLTask.addEventListener('click', () => {
            activeTask = taskList[taskList.findIndex(task => task.creationDate === HTMLTask.getAttribute('date-id'))];
            router();
        });
        mobilejsHideSidebar(HTMLTask);
    });
}

//Render task
function renderTask() {
    task.setAttribute('main-date-id',activeTask.creationDate);
    title.setAttribute('value',activeTask.title);
    date.setAttribute('value',activeTask.date);
    description.innerHTML = activeTask.description;
    mainHolder.innerHTML = taskTpl.innerHTML;
};

//Render 'no tasks' screen
function renderWithoutTasks() {
    mainHolder.innerHTML = withoutTasksTpl.innerHTML;
};

//Render 'welcome' screen
function renderWelcome() {
    mainHolder.innerHTML = welcomeTpl.innerHTML;
};

//Check if date is expired
function isExpired(task) {
    if(task.creationDate !== '') {
        let currentDate = new Date();
        let isoDate = parseInt(currentDate.toISOString().split('T')[0].replace(/-/g,''));
        let taskIsoDate = parseInt(task.date.replace(/-/g,''))
        if(isoDate > taskIsoDate) {
            return true;
        } else {
            return false;
        };
    };
};

//Show/Hide buttons
function setAsInactive(btnArray) {
    btnArray.forEach(btn => {
        if (btn.classList.contains('inactive')) {
        } else {
            btn.classList.add('inactive');
        };
    });
};
function setAsActive(btnArray) {
    btnArray.forEach(btn => {
        if (btn.classList.contains('inactive')) {
            btn.classList.remove('inactive');
        };
    });
};