//Texts in DOM
domText = {

    en : {
        noDate: 'Undated',
        noTasks: 'You have no tasks',
        addFirstTask: 'Add your first task.',
        newTask: 'New task',
        activeTasks: 'You have active tasks',
        selectOrCreateTask: 'Select a task from the list or create a new one.',
        taskTitleLabel: 'Task title',
        taskDateLabel: 'Deadline: ',
        taskDescriptionLabel: 'Task description',
        untitledTask: 'Untitled Task',
        undated: 'Undated',
        docTitleSelectTask: 'Select or create a new task',
        docTitleNoTasks: 'No task created. Create a new task.'
    },

    es : {
        noDate: 'Sin fecha',
        noTasks: '¡Sin tareas!',
        addFirstTask: 'Añade tu primera tarea.',
        newTask: 'Nueva tarea',
        activeTasks: 'Tienes tareas activas',
        selectOrCreateTask: 'Selecciona una tarea de la lista o crea una nueva.',
        taskTitleLabel: 'Título de la tarea',
        taskDateLabel: 'Límite: ',
        taskDescriptionLabel: 'Descripción de la tarea',
        untitledTask: 'Tarea sin título',
        undated: 'Sin fecha',
        docTitleSelectTask: 'Selecciona o crea una tarea',
        docTitleNoTasks: 'Ninguna tarea creada. Crea una nueva tarea.'
    }

};

//Placeholders in DOM
domPh = {

    en : {
        taskTitle: 'Task title',
        taskDescription: 'Task description'
    },

    es : {
        taskTitle: 'Nombre de la tarea',
        taskDescription: 'Descripción de la tarea'
    }

};

//Aria labels in DOM
domAria = {

    en : {
        taskBarMenu: 'Task list Menu',
        taskBarList: 'List of tasks',
        taskMenu: 'Active task menu',
        taskArea: 'Active task area',
        taskAreaTitle: 'Active task title',
        taskAreaDate: 'Active task deadline',
        taskAreaDescription: 'Active task description'
    },

    es : {
        taskBarMenu: 'Menú de la lista de tareas',
        taskBarList: 'Listado de tareas',
        taskMenu: 'Menú de la tarea activa',
        taskArea: 'Área de la tarea activa',
        taskAreaTitle: 'Título de la tarea activa',
        taskAreaDate: 'Fecha límite de la tarea activa',
        taskAreaDescription: 'Descripción de la tarea activa'
    }

};

//Titles in DOM
domTitle = {

    en : {
        newTaskBtn: 'Create new task',
        deleteTasksBtn: 'Delete selected tasks',
        showSidebar: 'Show task list',
        saveTaskBtn: 'Save task',
        activeTaskBtn: 'Toggle active task',
        importantTaskBtn: 'Toggle important',
        completedTaskBtn : 'Toggle completed',
        deleteTaskBtn: 'Delete current task',
        languageSelectBtn: 'Select language',
        languageSelectEnBtn: 'Select English language',
        languageSelectEsBtn: 'Seleccionar idioma español',
        untitledTask: 'Untitled Task'
    },

    es : {
        newTaskBtn: 'Crear nueva tarea',
        deleteTasksBtn: 'Eliminar tareas seleccionadas',
        showSidebar: 'Mostrar listado de tareas',
        saveTaskBtn: 'Guardar tarea',
        activeTaskBtn: 'Activar o desactivar tarea',
        importantTaskBtn: 'Tarea importante',
        completedTaskBtn : 'Tarea completada',
        deleteTaskBtn: 'Eliminar tarea actual',
        languageSelectBtn: 'Seleccionar idioma',
        languageSelectEnBtn: 'Select English language',
        languageSelectEsBtn: 'Seleccionar idioma español',
        untitledTask: 'Tarea sin título'
    }

};

//Texts in .js file
jsText = {    

    en : () => {     
        txtkey_localStorageError = 'Your browser does not support local data storage, the application will now stop.';
        txtkey_taskIsExpired = 'Task deadline is before the current date, task will be shown as expired.';
        txtkey_untitledTask = 'Untitled task';
        txtkey_delete = 'Delete';
        txtkey_deleteSelected = 'Delete selected tasks?';
        txtkey_save = 'Save changes made to';
        txtkey_undated = 'Undated';
        txtkey_taskName = 'Title task: ';
    },
    
    es : () => {
        txtkey_localStorageError = 'Tu navegador no sporta el almacenamiento local de datos, la aplicación se detendrá.';
        txtkey_taskIsExpired = 'La fecha límite de la tarea es anterior a la actual, aparecerá como caducada.';
        txtkey_untitledTask = 'Tarea sin título';
        txtkey_delete = '¿Eliminar';
        txtkey_deleteSelected = '¿Eliminar las tareas seleccionadas?';
        txtkey_save = '¿Deseas guardar los cambios realizados en';
        txtkey_undated = 'Sin fecha';
        txtkey_taskName = 'Nombre de la tarea: ';
    }

};