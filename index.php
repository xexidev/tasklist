<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css?ver=<?php echo filemtime(__DIR__.'/css/main.css') ?>">
    <link rel="stylesheet" href="./css/mobile.css?ver=<?php echo filemtime(__DIR__.'/css/mobile.css') ?>">
    <link rel="icon" type="image/x-icon" href="favicon.png">
    <title>Xexi TaskList</title>
</head>
<body>

    <!-- Templates -->
    <template id="tasklist-element-template">
        <li class="tasklist-element" role="listitem">
            <div class="task-check">
                <input class="task-checkbox" type="checkbox">
            </div>
            <div class="task-selectable" role="button">
                <div class="task-data">
                    <div class="titlebox">
                        <h2 class="title"></h2>
                    </div>
                    <div class="date"></div>
                </div>
                <div class="task-status">
                    <svg x="0px" y="0px" viewBox="0 0 200 200" xml:space="preserve">
                        <path d="M86.2,153.8c-2.5,0-5.1-1-7-2.9c-3.9-3.9-3.9-10.2,0-14L116,100L79.2,63.2c-3.9-3.9-3.9-10.2,0-14c3.9-3.9,10.2-3.9,14,0 L137.1,93c3.9,3.9,3.9,10.2,0,14l-43.8,43.8C91.3,152.8,88.8,153.8,86.2,153.8z"/>
                    </svg>
                </div>
            </div>
        </li>
    </template>

    <template id="task-template">
        <div id="task" class="display">
            <ul id="task-status-btns" class="mobile-only toolbar" role="toolbar">
                <li>
                    <button id="task-active-mobile" role="switch" titlekey="activeTaskBtn" title="Toggle active" aria-checked="true">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M156.31,43.63a9.9,9.9,0,0,0-14,14,60.1,60.1,0,1,1-85,0,9.9,9.9,0,0,0-14-14c-31,31-31,82,0,113s82,31,113,0A79.37,79.37,0,0,0,156.31,43.63Zm-56.5,66.5a10,10,0,0,0,10-10v-70a10,10,0,0,0-20,0v70A10,10,0,0,0,99.81,110.13Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button id="task-important-mobile" role="switch" titlekey="importantTaskBtn" title="Toggle important" aria-checked="false">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"/>
                            <path d="M100,125a10,10,0,0,0-10,10v7.5a10,10,0,0,0,20,0V135A10,10,0,0,0,100,125Z"/>
                            <path d="M100,50A10,10,0,0,0,90,60v45a10,10,0,0,0,20,0V60A10,10,0,0,0,100,50Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button id="task-completed-mobile" role="switch" titlekey="completedTaskBtn" title="Toggle completed" aria-checked="false">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M177.6,80.43a10,10,0,1,0-19.5,4.5,60.76,60.76,0,0,1-6,44.5c-16.5,28.5-53.5,38.5-82,22-28.5-16-38.5-53-22-81.5s53.5-38.5,82-22a9.86,9.86,0,1,0,10-17c-38.5-22.5-87-9.5-109.5,29a80.19,80.19,0,1,0,147,20.5Zm-109.5,11a10.12,10.12,0,0,0-11,17l40,25a10.08,10.08,0,0,0,5.5,1.5,10.44,10.44,0,0,0,8-4l52.5-67.5c3.5-4.5,2.5-10.5-2-14s-10.5-2.5-14,2l-47,60Z"/>
                        </svg>
                    </button>
                </li>
            </ul>
            <form action="#" id="form" tabindex="5000" ariaKey="taskArea" aria-label="Active Task Area">
                <label for="title" txtkey="taskTitleLabel">Task title</label>
                <h1>
                    <textarea id="title" type="text" name="title" value="" phkey="taskTitle" placeholder="" spellcheck="false" ariaKey="taskAreaTitle" aria-label="Active Task Title" tabindex="5001"></textarea>
                </h1>
                <div class="date-box" tabindex="5002" ariaKey="taskAreaDate" aria-label="Active Task Deadline">
                <label for="date" txtkey="taskDateLabel">Deadline: </label>
                    <div class="date-picker">
                        <div id="date-picker-text" aria-hidden="true"></div>
                        <input id="date" type="date" name="date" value="" tabindex="5003">
                    </div>
                </div>
                <label for="description" txtkey="taskDescriptionLabel">Task Description</label>
                <textarea id="description" type="text" name="description" phkey="taskDescription" placeholder="Task description" ariaKey="taskAreaDescription" aria-label="Active Task Description" spellcheck="false" tabindex="5004"></textarea>
            </form>
        </div>
    </template>

    <template id="without-tasks-template">
        <div id="without-tasks" class="display" tabindex="5000">
            <h1 class="title" txtkey="noTasks">You have no tasks</h1>
            <div class="subtitle" txtkey="addFirstTask">Add your first task.</div>
            <div class="new-task-btn btn">
                <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z"/>
                </svg>
                <a class="btn-txt" txtkey="newTask">New task</a>
            </div>
        </div>
    </template>

    <template id="welcome-template">
        <div id="welcome" class="display" tabindex="5000">
            <h1 class="title" txtkey="activeTasks">You have active tasks</h1>
            <div class="subtitle" txtkey="selectOrCreateTask">Select a task from the list or create a new one.</div>
            <div class="new-task-btn btn">
                <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z"/>
                </svg>
                <a class="btn-txt" txtkey="newTask">New task</a>
            </div>
        </div>
    </template>
    <!-- /Templates -->
    
    <div id="container" class="container" role="main">
        <div id="sidebar">
            <ul id="listToolbar" class="toolbar" role="toolbar" ariakey="taskBarMenu" aria-label="Task List Menu" tabindex="2000">
                <li class="mobile-only">
                    <button id="mobile-hide-sidebar">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165ZM116.5,57.5a9.67,9.67,0,0,0-14,0L74,86a19.92,19.92,0,0,0,0,28.5L102.5,143a9.9,9.9,0,0,0,14-14l-28-29L117,71.5C120.5,68,120.5,61.5,116.5,57.5Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button id="list-new" class="list-btn" titlekey="newTaskBtn" title="Create new task" tabindex="2001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button id="list-delete-bulk" class="list-btn" titlekey="deleteTasksBtn" title="Delete selected tasks" tabindex="2001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"/>
                            <path d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"/>
                        </svg>
                    </button>
                </li>
            </ul>
            <nav>
                <ul id="tasklist" role="list" ariakey="taskBarList" aria-label="List of Tasks" tabindex="3000" aria-live="polite"></ul>
            </nav>
        </div>
        <div id="main">
            <ul id="taskToolbar" class="toolbar" role="toolbar" ariakey="taskMenu" aria-label="Active task menu" tabindex="4000">
                <li class="mobile-only">
                    <button id="mobile-show-sidebar" class="main-btn" titlekey="showSidebar" title="Show task list" tabindex="4001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75,57.5h95a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Zm-35-20H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Zm35,70h75a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Zm-35-20H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Zm130,55H75a10,10,0,0,0,0,20h95a10,10,0,0,0,0-20Zm-130,0H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Z"/>
                        </svg>
                    </button>
                </li>
                <li class="mobile-only">
                    <button id="task-new" class="main-btn" titlekey="newTaskBtn" title="New task" tabindex="4001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button id="task-save" class="main-btn" titlekey="saveTaskBtn" title="Save task" tabindex="4001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M171,51,148.5,28.5a29.47,29.47,0,0,0-21-8.5H50A30.09,30.09,0,0,0,20,50V150a30.09,30.09,0,0,0,30,30H150a30.09,30.09,0,0,0,30-30V72.5A29.89,29.89,0,0,0,171,51ZM120,40V50H80V40ZM80,160V125h40v35Zm80-10a10,10,0,0,1-10,10H140V125a20.06,20.06,0,0,0-20-20H80a20.06,20.06,0,0,0-20,20v35H50a10,10,0,0,1-10-10V50A10,10,0,0,1,50,40H60V50A20.06,20.06,0,0,0,80,70h40a20.06,20.06,0,0,0,20-20V48.5l17,17a9.87,9.87,0,0,1,3,7V150Z"/>
                        </svg>
                    </button>
                </li>
                <li class="desktop-only">
                    <button id="task-active" class="main-btn" role="switch" titlekey="activeTaskBtn" title="Toggle active" aria-checked="true" tabindex="4001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M156.31,43.63a9.9,9.9,0,0,0-14,14,60.1,60.1,0,1,1-85,0,9.9,9.9,0,0,0-14-14c-31,31-31,82,0,113s82,31,113,0A79.37,79.37,0,0,0,156.31,43.63Zm-56.5,66.5a10,10,0,0,0,10-10v-70a10,10,0,0,0-20,0v70A10,10,0,0,0,99.81,110.13Z"/>
                        </svg>
                    </button>
                </li>
                <li class="desktop-only">
                    <button id="task-important" class="main-btn" role="switch" titlekey="importantTaskBtn" title="Toggle important" aria-checked="false" tabindex="4001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"/>
                            <path d="M100,125a10,10,0,0,0-10,10v7.5a10,10,0,0,0,20,0V135A10,10,0,0,0,100,125Z"/>
                            <path d="M100,50A10,10,0,0,0,90,60v45a10,10,0,0,0,20,0V60A10,10,0,0,0,100,50Z"/>
                        </svg>
                    </button>
                </li>
                <li class="desktop-only">
                    <button id="task-completed" class="main-btn" role="switch" titlekey="completedTaskBtn" title="Toggle completed" aria-checked="false" tabindex="4001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M177.6,80.43a10,10,0,1,0-19.5,4.5,60.76,60.76,0,0,1-6,44.5c-16.5,28.5-53.5,38.5-82,22-28.5-16-38.5-53-22-81.5s53.5-38.5,82-22a9.86,9.86,0,1,0,10-17c-38.5-22.5-87-9.5-109.5,29a80.19,80.19,0,1,0,147,20.5Zm-109.5,11a10.12,10.12,0,0,0-11,17l40,25a10.08,10.08,0,0,0,5.5,1.5,10.44,10.44,0,0,0,8-4l52.5-67.5c3.5-4.5,2.5-10.5-2-14s-10.5-2.5-14,2l-47,60Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button id="task-delete" class="main-btn" titlekey="deleteTaskBtn" title="Delete current task" tabindex="4001">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"/>
                            <path d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <button id="language" titlekey="languageSelectBtn" title="Select language">
                        <div id="language-btn">
                            <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,20a65.64,65.64,0,0,1,32.5,8.5c-1.5,2-3,4-4,5.5-3,4-4.5,6.5-6.5,7.5-2,1.5-3.5,1.5-9,2a19.23,19.23,0,0,0-9.5,2.5,25.94,25.94,0,0,0-11,11c-1.5,3-2,6.5-3.5,10-1,2.5-2,5-4,7-3,3-3-2.5-3.5-5A59.5,59.5,0,0,0,73,66a17.25,17.25,0,0,0-4-4.5c-4-3-9-1.5-13.5-.5-1.5.5-8.5,1-9.5,2C58,46.5,77.5,35,100,35Zm0,130a64.87,64.87,0,0,1-65-65,58.79,58.79,0,0,1,1.5-13.5l23-5.5c2.5,5,4,9,4.5,14a15.3,15.3,0,0,0,1.5,7.5,15.57,15.57,0,0,0,7,8c4,2.5,8.5,3,13,2.5a17.34,17.34,0,0,0,9.5-5c4.5-4,8.5-9.5,11-13,3-4.5,3.5-8.5,4-11.5.5-4,2-5.5,6-6A28,28,0,0,0,133.5,72c5-3.5,8.5-8.5,11-12a35,35,0,0,1,4-5,65.16,65.16,0,0,1,17,44,64,64,0,0,1-4.5,24,79.36,79.36,0,0,1-10-3.5c-5-1.5-10.5-4.5-16-4.5-8.5-.5-18,2-26.5,3-9.5,1-9,12.5-7,19.5,1,4,3,10.5,6.5,15a38.45,38.45,0,0,0,9,9A39.87,39.87,0,0,1,100,165Zm41.5-15.5c-3,1.5-7,0-10-1.5a20.15,20.15,0,0,1-7-6.5,29.69,29.69,0,0,1-2-4L134,136c2.5,1,4.5,1.5,7,2.5s7,1.5,9,3.5C151,142,142.5,149,141.5,149.5Z"/>
                            </svg>
                            <span id="language-text">Select</span>
                        </div>
                        <ul id="language-list">
                            <li class="select-lang-btn" titlekey="languageSelectEnBtn" title="Select English language" id="enBtn">English</li>
                            <li class="select-lang-btn" titlekey="languageSelectEsBtn" title="Seleccionar idioma español" id="esBtn">Español</li>
                        </ul>
                    </button>
                </li>
            </ul>
        
            <article id="display-holder"></article>

        </div>
    </div>
    <?php require('./template-parts/footer.php');?>
    <script src="./js/langs.js?ver=<?php echo filemtime(__DIR__.'/js/langs.js') ?>"></script>
    <script src="./js/translate.js?ver=<?php echo filemtime(__DIR__.'/js/translate.js') ?>"></script>
    <script src="./js/sidebar.js?ver=<?php echo filemtime(__DIR__.'/js/sidebar.js') ?>"></script>
    <script src="./js/app.js?ver=<?php echo filemtime(__DIR__.'/js/app.js') ?>"></script>
</body>
</html>