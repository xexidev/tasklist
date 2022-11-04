<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css?ver=<?php echo filemtime(__DIR__.'/css/main.css') ?>">
    <link rel="stylesheet" href="./css/mobile.css?ver=<?php echo filemtime(__DIR__.'/css/mobile.css') ?>">
    <title>Tareas Pendientes</title>
</head>
<body>

    <!-- Templates -->
    <template id="tasklist-element-template">
        <li class="tasklist-element">
            <div class="task-check">
                <input type="checkbox">
            </div>
            <div class="task-data">
                <div class="title"></div>
                <div class="date"></div>
            </div>
            <div class="task-status">
                <svg x="0px" y="0px" viewBox="0 0 200 200" style="enable-background:new 0 0 200 200;" xml:space="preserve">
                    <path d="M86.2,153.8c-2.5,0-5.1-1-7-2.9c-3.9-3.9-3.9-10.2,0-14L116,100L79.2,63.2c-3.9-3.9-3.9-10.2,0-14c3.9-3.9,10.2-3.9,14,0 L137.1,93c3.9,3.9,3.9,10.2,0,14l-43.8,43.8C91.3,152.8,88.8,153.8,86.2,153.8z"/>
                </svg>
            </div>
        </li>
    </template>

    <template id="task-template">        
        <div id="task" class="display" main-date-id="">
            <form action="#" id="form">
                <textarea id="title" type="text" name="title" value="" placeholder="Tarea sin título" aria-label="Introduce el título de la tarea"></textarea>
                <div class="date-box">
                    <span>Límite: </span>
                    <div class="date-picker">
                        <div id="date-picker-text">Sin fecha</div>
                        <input id="date" type="date" name="date" value="" aria-label="Introduce la fecha límite de la tarea">
                    </div>
                </div>
                <textarea id="description" type="text" name="description" placeholder="Descripción de la tarea" aria-label="Introduce la descripción de la tarea"></textarea>
            </form>
        </div>
    </template>

    <template id="without-tasks-template">
        <div id="without-tasks" class="display">
            <div class="title">¡Sin tareas!</div>
            <div class="subtitle">Añade tu primera tarea</div>
            <div class="new-task-btn btn" aria-label="Crear nueva tarea">
                <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z"/>
                </svg>
                <span class="btn-txt">Nueva tarea</span>
            </div>
        </div>
    </template>

    <template id="welcome-template">
        <div id="welcome" class="display">
            <div class="title">Tienes tareas activas</div>
            <div class="subtitle">Selecciona una tarea de la lista o crea una nueva</div>
            <div class="new-task-btn btn" aria-label="Crear nueva tarea">
                <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z"/>
                </svg>
                <span class="btn-txt">Nueva tarea</span>
            </div>
        </div>
    </template>
    <!-- /Templates -->

    <div id="container" class="container">
        <div id="sidebar">
            <div class="header">
                <ul>
                    <li id="mobile-hide-sidebar" class="mobile-only">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165ZM116.5,57.5a9.67,9.67,0,0,0-14,0L74,86a19.92,19.92,0,0,0,0,28.5L102.5,143a9.9,9.9,0,0,0,14-14l-28-29L117,71.5C120.5,68,120.5,61.5,116.5,57.5Z"/>
                        </svg>
                    </li>
                    <li id="list-new" aria-label="Crear nueva tarea">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Zm30-72.5H110v-20a10,10,0,0,0-20,0v20H70a10,10,0,0,0,0,20H90v20a10,10,0,0,0,20,0v-20h20a10,10,0,0,0,0-20Z"/>
                        </svg>
                    </li>
                </ul>
            </div>
            <ul id="tasklist" role="navigation" aria-label="Lista de tareas"></ul>
        </div>
        <div id="main">
            <div class="header">
                <ul>
                    <li id="mobile-show-sidebar" class="mobile-only">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75,57.5h95a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Zm-35-20H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Zm35,70h75a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Zm-35-20H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Zm130,55H75a10,10,0,0,0,0,20h95a10,10,0,0,0,0-20Zm-130,0H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Z"/>
                        </svg>
                    </li>
                    <li id="task-save" class="" aria-label="Guardar tarea">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M171,51,148.5,28.5a29.47,29.47,0,0,0-21-8.5H50A30.09,30.09,0,0,0,20,50V150a30.09,30.09,0,0,0,30,30H150a30.09,30.09,0,0,0,30-30V72.5A29.89,29.89,0,0,0,171,51ZM120,40V50H80V40ZM80,160V125h40v35Zm80-10a10,10,0,0,1-10,10H140V125a20.06,20.06,0,0,0-20-20H80a20.06,20.06,0,0,0-20,20v35H50a10,10,0,0,1-10-10V50A10,10,0,0,1,50,40H60V50A20.06,20.06,0,0,0,80,70h40a20.06,20.06,0,0,0,20-20V48.5l17,17a9.87,9.87,0,0,1,3,7V150Z"/>
                        </svg>
                    </li>
                    <li id="task-delete" class="">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"/>
                            <path d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"/>
                        </svg>
                    </li>
                </ul>
            </div>          
        
            <div id="main-holder"></div>

        </div>
    </div>
    <footer id="footer">
        <div class="container">
            <div class="footer-text">
                <a href="https://www.xexi.es" target="_blank">xexi.es</a> · <a href="mailto:hola@xexi.es" target="_blank">hola@xexi.es</a> · xexi 2022
            </div>
        </div>
    </footer>
    <script src="./js/mobile.js?ver=<?php echo filemtime(__DIR__.'/js/mobile.js') ?>"></script>
    <script src="./js/app.js?ver=<?php echo filemtime(__DIR__.'/js/app.js') ?>"></script>
</body>
</html>