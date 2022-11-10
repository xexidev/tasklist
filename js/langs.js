//Texts in DOM
domText = {

    en : {
        dateLimit: 'Deadline: ',
        noDate: 'Undated',
        noTasks: 'You have no tasks',
        addFirstTask: 'Add your first task.',
        newTask: 'New task',
        activeTasks: 'You have active tasks',
        selectOrCreateTask: 'Select a task from the list or create a new one.'
    },

    es : {
        dateLimit: 'Límite: ',
        noDate: 'Sin fecha',
        noTasks: '¡Sin tareas!',
        addFirstTask: 'Añade tu primera tarea.',
        newTask: 'Nueva tarea',
        activeTasks: 'Tienes tareas activas',
        selectOrCreateTask: 'Selecciona una tarea de la lista o crea una nueva.',
    }

};

//Placeholders in DOM
domPh = {

    en : {
        untitledTask: 'Untitled task',
        taskDescription: 'Task description'
    },

    es : {
        untitledTask: 'Tarea sin título',
        taskDescription: 'Descripción de la tarea'
    }

};

//Aria labels in DOM
domAria = {

    en : {
    },

    es : {
    }

};

//Titles in DOM
domTitle = {

    en : {
        newTaskBtn: 'Create new task',
        deleteTasksBtn: 'Delete selected tasks',
        saveTaskBtn: 'Save task',
        activeTaskBtn: 'Toggle active task',
        importantTaskBtn: 'Toggle important task',
        completedTaskBtn : 'Toggle completed task',
        deleteTaskBtn: 'Delete current task',
        languageSelectBtn: 'Select language',
        languageSelectEnBtn: 'Select English language',
        languageSelectEsBtn: 'Seleccionar idioma español'
    },

    es : {
        newTaskBtn: 'Crear nueva tarea',
        deleteTasksBtn: 'Eliminar tareas seleccionadas',
        saveTaskBtn: 'Guardar tarea',
        activeTaskBtn: 'Activar o desactivar tarea',
        importantTaskBtn: 'Activar o desactivar tarea importante',
        completedTaskBtn : 'Activar o desactivar tarea completada',
        deleteTaskBtn: 'Eliminar tarea actual',
        languageSelectBtn: 'Seleccionar idioma',
        languageSelectEnBtn: 'Select English language',
        languageSelectEsBtn: 'Seleccionar idioma español'
    }

};

//Texts in .js file
jsText = {    

    en : () => {     
        txtkey_localStorageError = 'Your browser does not support local data storage, the application will now stop.';
        txtkey_docTitleNoTasks = 'No task created. Create a new task.';
        txtkey_docTitleSelectTask = 'Select or create a new task';
        txtkey_docTitleUntitledTask = 'Untitled task';
        txtkey_taskIsExpired = 'Task deadline is before the current date, task will be shown as expired.';
        txtkey_untitledTask = 'Untitled task';
        txtkey_delete = 'Delete';
        txtkey_deleteSelected = 'Delete selected tasks?';
        txtkey_save = 'Save the changes made to';
        txtkey_undated = 'Undated';
    },
    
    es : () => {
        txtkey_localStorageError = 'Tu navegador no sporta el almacenamiento local de datos, la aplicación se detendrá.';
        txtkey_docTitleNoTasks = 'Ninguna tarea creada. Crea una nueva tarea.';
        txtkey_docTitleSelectTask = 'Selecciona o crea una tarea';
        txtkey_docTitleUntitledTask = 'Tarea sin título';
        txtkey_taskIsExpired = 'La fecha límite de la tarea es anterior a la actual, aparecerá como caducada.';
        txtkey_untitledTask = 'Tarea sin título';
        txtkey_delete = '¿Eliminar';
        txtkey_deleteSelected = '¿Eliminar las tareas seleccionadas?';
        txtkey_save = '¿Deseas guardar los cambios realizados en';
        txtkey_undated = 'Sin fecha';
    }

};