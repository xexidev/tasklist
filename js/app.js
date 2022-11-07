const mainHolder = document.getElementById('display-holder');
const main = document.getElementById('main');

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
const btnImportant = document.getElementById('task-important');
const btnDeleteSingle = document.getElementById('task-delete');
const btnNew = document.getElementById('list-new');
const taskBtns = [btnSave,btnImportant,btnDeleteSingle];

const HTMLTaskList = document.getElementById('tasklist');

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
        this.title = title;
        this.date = date;
        this.description = description;
        this.modificationDate = new Date().toISOString();
        this.checkIfExpired(this.date);
        if (container.hasAttribute("important")) {
            this.isImportant = true;
        } else {
            this.isImportant = false;
        }
    };
    putDataTo(container,title,date,description) {
        this.checkIfExpired(this.date);
        container.removeAttribute("important");
        container.removeAttribute("expired");
        container.removeAttribute("completed");
        if(this.isImportant) { container.setAttribute("important",""); };
        if(this.isCompleted) { container.setAttribute("completed",""); };
        if(this.isExpired) { container.setAttribute("expired",""); };
        container.setAttribute('date-id',this.creationDate); //Not used
        if(title) { title.value = this.title; };
        if(date) { date.value = this.date; };
        if(description) { description.value = this.description; };
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
    renderTaskList();
    if (taskList.length === 0) {                        //List is empty        
        renderWithoutTasks();
        document.title = 'Ninguna tarea creada. Crea una nueva tarea.';
    } else {                                            //List is not empty
        if(typeof(activeTask) === 'undefined') {        //No active task
            renderWelcome();
            document.title = 'Selecciona o crea una tarea.';
        } else {                                        //Active task exists
            renderTask();
            document.title = activeTask.title !== '' ? activeTask.title : 'Tarea sin título';
        };        
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
};

//Save task
function saveTask() {
    let title = document.getElementById('title').value;
    let date = document.getElementById('date').value;
    let description = document.getElementById('description').value;
    activeTask.getDataFrom(main,title,date,description);
    taskList[taskList.findIndex(task => task.creationDate === activeTask.creationDate)] = Object.assign({...activeTask});
    if(activeTask.isExpired) { alert('La fecha límite de la tarea es anterior a la actual, aparecerá como caducada.'); };
    localStorage.setItem('taskList',JSON.stringify(taskList));    
};

//Set task as important
function toggleImportant() {
    if(main.hasAttribute("important")) {
        main.removeAttribute("important");
    } else {
        main.setAttribute("important","");
    };
};

//Delete single task
function deleteSingleTask() {    
    let taskName = activeTask.title === '' ? 'Tarea sin título' : activeTask.title;
    if (confirm(`¿Eliminar ${taskName}?`)) {
        taskList.splice(taskList.indexOf(taskList[taskList.findIndex(task => task.creationDate === activeTask.creationDate)]),1);
        localStorage.setItem('taskList',JSON.stringify(taskList));
        delete activeTask;
        router();
    };
};

//Set listeners on headers's buttons
btnNew.addEventListener('click', () => {    
    if (unsavedChanges()) {
        let taskName = activeTask.title === '' ? 'Tarea sin título' : activeTask.title;
        if(confirm(`¿Deseas guardar los cambios realizados en ${taskName}?`)) {
            saveTask();
        };
    };
    newTask();
});
btnSave.addEventListener('click', () => { saveTask(); renderTaskList(); });
btnImportant.addEventListener('click', () => { toggleImportant(); });
btnDeleteSingle.addEventListener('click', () => { deleteSingleTask(); });

//Render tasklist
function renderTaskList() {
    let newList = document.createElement('div');
    
    taskList.forEach(task => {
        task = Object.assign(new Task, {...task});

        //Render elements
        let listElementTpl = taskElementTpl.content.cloneNode(true);
        let listElement =  listElementTpl.querySelector('.tasklist-element');
        let listElementTitle = listElementTpl.querySelector('.title');
        let listElementDate = listElementTpl.querySelector('.date');
        
        task.putDataTo(listElement,listElementTitle,listElementDate);
        listElement.setAttribute('title',task.title);
        listElementTitle.innerHTML = task.title === '' ? 'Tarea sin título' : task.title;

        newList.appendChild(listElementTpl);
    });    
    HTMLTaskList.innerHTML = newList.innerHTML;

    //Set listeners    
    let HTMLTasks = document.querySelectorAll('.tasklist-element');
    HTMLTasks.forEach(HTMLTask => {        
        HTMLTask.classList.remove('selected');
        if(typeof(activeTask) !== 'undefined' && HTMLTask.getAttribute('date-id') === activeTask.creationDate) {
            HTMLTask.classList.add('selected');
        };
        HTMLTask.addEventListener('click', () => {
            if (unsavedChanges()) {
                let taskName = activeTask.title === '' ? 'Tarea sin título' : activeTask.title;
                if(confirm(`¿Deseas guardar los cambios realizados en ${taskName}?`)) {
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
        });
        mobilejsHideSidebarOnClick(HTMLTask);
    });
};

//Render task
function renderTask() {
    setButtons(taskBtns);

    //Render
    mainHolder.innerHTML = taskTpl.innerHTML;

    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let description = document.getElementById('description');
    let dateText = document.getElementById('date-picker-text');

    activeTask.putDataTo(main,title,date,description);
    dateText.innerHTML = activeTask.date === '' ? 'Sin fecha' : activeTask.date;

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
};

//Render 'without tasks' screen and set listeners
function renderWithoutTasks() {
    unsetButtons(taskBtns);
    mainHolder.innerHTML = withoutTasksTpl.innerHTML;
    let btnNew = document.getElementsByClassName('new-task-btn');
    let btnNewArray = Array.from(btnNew);
    btnNewArray.forEach(btn => {
        btn.addEventListener('click', () => { 
            newTask();
        });
    });
};

//Render 'welcome' screen and set listeners
function renderWelcome() {
    unsetButtons(taskBtns);
    mainHolder.innerHTML = welcomeTpl.innerHTML;
    let btnNew = document.getElementsByClassName('new-task-btn');
    let btnNewArray = Array.from(btnNew);
    btnNewArray.forEach(btn => {
        btn.addEventListener('click', () => { 
            newTask();
        });
    });
};

//Check for unsaved changes
unsavedChanges = () => {
    if(typeof(activeTask) !== 'undefined') {
        let titleInDisplay = document.getElementById('title').value;
        let dateInDisplay = document.getElementById('date').value;
        let descriptionInDisplay = document.getElementById('description').value;
        if(activeTask.title !== titleInDisplay || 
            activeTask.date !== dateInDisplay || 
            activeTask.description !== descriptionInDisplay || 
            (!activeTask.isImportant && main.hasAttribute("important")) ||
            (activeTask.isImportant && !main.hasAttribute("important"))) {
            return true;
        } else {
            return false;
        };
    };
};

//Set / Unset buttons
function unsetButtons(btnArray) {
    btnArray.forEach(btn => {
        if(btn.classList.contains('inactive')) {
        } else {
            btn.classList.add('inactive');
        };
    });
};
function setButtons(btnArray) {
    btnArray.forEach(btn => {
        if(btn.classList.contains('inactive')) {
            btn.classList.remove('inactive');
        };
    });
};