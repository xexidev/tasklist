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

const btnSave = document.getElementById('task-save');
const btnNew = document.getElementById('list-new');
const btnDeleteSingle = document.getElementById('task-delete');
const taskBtns = [btnSave,btnDeleteSingle];

const HTMLTaskList = document.getElementById('tasklist');

let inDisplay = '';

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
    getDataFrom() {
        this.title = document.getElementById('title').value;
        this.date = document.getElementById('date').value;
        this.description = document.getElementById('description').value;
        this.modificationDate = new Date().toISOString();
        this.checkIfExpired(this.date);
    };
    putDataTo(title,date,description) {
        title.value = this.title;
        date.value = this.date;
        description.value = this.description;
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
    alert('Este navegador no sporta el almacenamiento local de datos, la aplicación se detendrá.')
    throw new Error('LocalStorage is not supported.');
};

//Set the route
function router() {
    if (taskList.length === 0) {                        //List is empty
        inDisplay = 'empty';
        setAsInactive(taskBtns);
        renderWithoutTasks();
        document.title = 'Ninguna tarea creada. Crea una nueva tarea.';
    } else {                                            //List is not empty
        if(typeof(activeTask) === 'undefined') {        //No active task
            inDisplay = 'welcome';
            setAsInactive(taskBtns);
            renderWelcome();
            document.title = 'Selecciona o crea una tarea.';
        } else {                                        //Active task exists
            inDisplay = 'task';
            setAsActive(taskBtns);
            renderTask();
            document.title = activeTask.title !== '' ? activeTask.title : 'Tarea sin título';
        };        
    };
    renderTaskList();
};

//New task
function newTask() {    
    let currentDate = new Date().toISOString();
    activeTask = new Task('','','',currentDate);
    taskList.unshift(activeTask);
    localStorage.setItem('taskList',JSON.stringify(taskList));
    router();
};

//Save task
function saveTask() {    
    activeTask.getDataFrom();
    taskList[taskList.findIndex(task => task.creationDate === activeTask.creationDate)] = Object.assign({...activeTask});
    if(activeTask.isExpired) { alert('La fecha límite de la tarea es anterior a la actual, aparecerá como caducada.'); };
    localStorage.setItem('taskList',JSON.stringify(taskList));
    router();
}

//Delete single task
function deleteSingleTask() {    
    let taskName = activeTask.title === '' ? 'Tarea sin título' : activeTask.title;
    if (confirm(`¿Eliminar ${taskName}?`)) {
        taskList.splice(taskList.indexOf(taskList[taskList.findIndex(task => task.creationDate === activeTask.creationDate)]),1);
        localStorage.setItem('taskList',JSON.stringify(taskList));
        router();
    };
}

//Set listeners on headers's buttons
btnSave.addEventListener('click', () => { saveTask(); });
btnNew.addEventListener('click', () => { newTask(); });
btnDeleteSingle.addEventListener('click', () => { deleteSingleTask(); });

//Render tasklist
function renderTaskList() {
    let newList = document.createElement('div');
    
    taskList.forEach(task => {
        let listElementTpl = taskElementTpl.content.cloneNode(true);
        let listElement =  listElementTpl.querySelector('.tasklist-element');
        let listElementTitle = listElementTpl.querySelector('.title');
        let listElementDate = listElementTpl.querySelector('.date');

        listElement.setAttribute('title',task.title);
        listElement.setAttribute('date-id', `${task.creationDate}`);
        task.isExpired = isExpired(task.date);
        if (task.isExpired) { listElement.classList.add('expired') };
        listElementTitle.innerHTML = task.title === '' ? 'Tarea sin título' : task.title;
        listElementDate.innerHTML = task.date;
        newList.appendChild(listElementTpl);
    });    
    HTMLTaskList.innerHTML = newList.innerHTML;

    //Set listeners    
    let HTMLTasks = document.querySelectorAll('.tasklist-element');
    HTMLTasks.forEach(HTMLTask => {
        if(typeof(activeTask) !== 'undefined' && HTMLTask.getAttribute('date-id') === activeTask.creationDate) {
            HTMLTask.classList.add('selected');
        };
        HTMLTask.addEventListener('click', () => {            
            if(inDisplay === 'task') {
                let titleInDisplay = document.getElementById('title').value;
                let dateInDisplay = document.getElementById('date').value;
                let descriptionInDisplay = document.getElementById('description').value;
                //Check for unsaved changes
                if(activeTask.title !== titleInDisplay || activeTask.date !== dateInDisplay || activeTask.description !== descriptionInDisplay) {
                    let taskName = activeTask.title === '' ? 'Tarea sin título' : activeTask.title;
                    if(confirm(`¿Deseas guardar los cambios realizados en ${taskName}?`)) {
                        saveTask();
                    };
                };
            };
            HTMLTask.classList.remove('selected');
            selectedTask = taskList[taskList.findIndex(task => task.creationDate === HTMLTask.getAttribute('date-id'))];
            activeTask = Object.assign(new Task, {...selectedTask});
            router();
        });
        mobilejsHideSidebarOnClick(HTMLTask);
    });
};

//Render task
function renderTask() {
    mainHolder.innerHTML = taskTpl.innerHTML;

    let task = document.getElementById('task');
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let description = document.getElementById('description');
    let dateText = document.getElementById('date-picker-text');

    activeTask.putDataTo(title,date,description);
    dateText.innerHTML = activeTask.date === '' ? 'Sin fecha' : activeTask.date;
    task.setAttribute('main-date-id',activeTask.creationDate);
    if (activeTask.isExpired) { task.classList.add('expired'); };

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
        dateText.innerHTML = date.value === '' ? 'Sin fecha' : date.value;
        if (isExpired(date.value)) {
            task.classList.add('expired');
        } else 
        if (!isExpired(date.value) && task.classList.contains('expired')) {
            task.classList.remove('expired');
        };
    });
    
    //Save task on Enter key keydown on task HTML title input
    title.addEventListener('keydown', (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault();
            saveTask();
            router();
        };
    });
};

//Render 'without tasks' screen and set listeners
function renderWithoutTasks() {
    mainHolder.innerHTML = withoutTasksTpl.innerHTML;
    let btnNew = document.getElementsByClassName('new-task-btn');
    let btnNewArray = Array.from(btnNew);
    btnNewArray.forEach(btn => {
        btn.addEventListener('click', () => { newTask(); });
    });
};

//Render 'welcome' screen and set listeners
function renderWelcome() {
    mainHolder.innerHTML = welcomeTpl.innerHTML;
    let btnNew = document.getElementsByClassName('new-task-btn');
    let btnNewArray = Array.from(btnNew);
    btnNewArray.forEach(btn => {
        btn.addEventListener('click', () => { newTask(); });
    });
};

//Expiration checker
function isExpired(taskDate) {
    if(taskDate !== '') {
        let currentDate = new Date();
        let isoDate = parseInt(currentDate.toISOString().split('T')[0].replace(/-/g,''));
        let taskIsoDate = parseInt(taskDate.replace(/-/g,''))
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