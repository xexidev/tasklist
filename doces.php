<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css?ver=<?php echo filemtime(__DIR__.'/css/main.css') ?>">
    <link rel="stylesheet" href="./css/mobile.css?ver=<?php echo filemtime(__DIR__.'/css/mobile.css') ?>">
    <link rel="stylesheet" href="./css/document.css?ver=<?php echo filemtime(__DIR__.'/css/document.css') ?>">
    <link rel="icon" type="image/x-icon" href="favicon.png">
    <title>Xexi TaskList · Documentación</title>
</head>
<body>    
    <div id="container" class="container document" role="main">
        <div id="sidebar">
            <ul id="listToolbar" class="toolbar" role="toolbar">
                <li class="mobile-only">
                    <button id="mobile-hide-sidebar">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165ZM116.5,57.5a9.67,9.67,0,0,0-14,0L74,86a19.92,19.92,0,0,0,0,28.5L102.5,143a9.9,9.9,0,0,0,14-14l-28-29L117,71.5C120.5,68,120.5,61.5,116.5,57.5Z"/>
                        </svg>
                    </button>
                </li>
            </ul>
            <nav>
                <ul id="tasklist" role="list">
                    <li><a href="#ui-section">Las áreas del interfaz</a></li>
                    <li>
                        <ul>
                            <li><a href="#main-section">Zona principal #main</a></li>
                            <li><a href="#sidebar-section">Barra lateral #sidebar</a></li>
                        </ul>
                    </li>
                    <li><a href="#code-section">El código</a></li>
                    <li>
                        <ul>
                            <li><a href="#task-section">La clase Task, el objeto activeTask y el array de tareas taskList</a></li>
                            <li><a href="#render-section">Los renderizados</a></li>
                            <li><a href="#translator-section">El traductor</a></li>
                            <li><a href="#aria-section">WEI-ARIA</a></li>
                            <li><a href="#extras-section">Extras</a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
        <div id="main">
            <ul id="taskToolbar" class="toolbar" role="toolbar">
                <li class="mobile-only">
                    <button id="mobile-show-sidebar" class="main-btn">
                        <svg data-name="Layer 1" height="200" id="Layer_1" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75,57.5h95a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Zm-35-20H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Zm35,70h75a10,10,0,0,0,0-20H75a10,10,0,0,0,0,20Zm-35-20H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Zm130,55H75a10,10,0,0,0,0,20h95a10,10,0,0,0,0-20Zm-130,0H30a10,10,0,0,0,0,20H40a10,10,0,0,0,0-20Z"/>
                        </svg>
                    </button>
                </li>
                <li>
                    <a href="index.php" class="main-btn" title="Xexi Tasklist">
                        <svg data-name="Layer 1" height="200" width="200" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1024 1024">
                            <path class="st0" d="M21.12,366l137.78-63.55l-49.35-106.99C70.07,245.59,39.75,303.28,21.12,366z"/>
                            <path class="st0" d="M215.01,424.11L0.13,523.21c5.82,270.76,221.82,489.77,491.38,500.38L215.01,424.11z"/>
                            <path class="st0" d="M280.56,246.34L719.6,43.85C656.15,15.67,585.9,0,512,0C399.85,0,296.13,36.06,211.78,97.22L280.56,246.34z"/>
                            <path class="st0" d="M852.83,129.93L336.67,368l295.97,641.7C857.19,955.47,1024,753.22,1024,512
                                C1024,360.12,957.87,223.7,852.83,129.93z M872.78,392.34c-3.64,13.46-80.13,296.52-80.13,296.52
                                c-4.25,15.71-15.23,28.69-29.93,35.49c-0.64,0.29-1.28,0.58-1.93,0.85c-15.67,6.53-33.48,5.44-48.24-2.96l-164.07-93.38
                                c-26.33-14.99-35.53-48.49-20.54-74.82c14.99-26.34,48.49-35.53,74.82-20.54l102.46,58.32c62.41-230.94,62.48-231.13,63.27-233.29
                                c10.46-28.44,41.99-43.01,70.43-32.57C866.01,335.91,880.53,365.02,872.78,392.34z"/>
                        </svg>
                    </a>
                </li>
                <!--
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
                -->
            </ul>
        
            <article id="display-holder">
                <div class="display">
                    <section id="what-is-this">
                        <head>
                            <h1 class="title">Xexi Tasklist · Documentación</h1>
                        </head>
                        <div class="subtitle">
                            <p>
                                <strong>Xexi tasklist es una SPA (aplcación de página única) de lista de tareas.</strong>
                            </p>
                            <p>
                                Permite crear tareas asignándoles un <strong>título</strong>, una <strong>fecha límite</strong> de completación y una <strong>descripción</strong>.<br>
                                Se puede cambiar el estado de las tareas marcándolas como <strong>inactivas</strong>, <strong>importantes</strong> o <strong>completadas</strong>.
                            </p>
                            <p>
                                Una vez guardada, la tarea se almacena en una lista de tareas mostrando un marcador de color dependiendo del estado en el que se encuentra.<br>
                            </p>
                            <p>
                                Además de los estados asignados por los marcadores, existe el estado <strong>caducada</strong> que se activa de manera automática cuando la fecha actual ha superado la fecha límite que establecimos en la tarea.<br>
                            </p>
                            <p>
                                La lista de tareas queda almacenada en el navegador y las tareas pueden ser seleccionadas para modificarlas o para ser eliminarlas, tanto de manera <strong>individual</strong> como <strong>en masa</strong>.
                            </p>
                        </div>
                    </section>
                    <section id="ui-section">
                        <head>
                            <h2 id="interface" class="title">Las áreas del interfaz</h2>
                        </head>
                        El interfaz se compone de:
                                <p id="main-section">
                                    <strong class="titmark">Zona principal <span class="code">#main</span></strong><br>
                                    En el formato de escritorio la zona principal aparece a la derecha, mientras que en móvil ocupa toda la pantalla.<br>
                                    Se compone de la barra de herramientas de edición de la tarea <span class="code">#taskToolbar</span> y la zona del contenedor de display <span class="code">#display-holder</span> donde se rendeiza la tarea que estamos editando y también las vistas cuando no existe una tarea seleccionada o cuando no existen tareas en la lista de tareas.
                                </p>
                                <p id="sidebar-section">
                                    <strong class="titmark">Barra lateral <span class="code">#sidebar</span></strong><br>
                                    En formato escritorio la barra lateral es siempre visible mientras que en formato móvil queda oculta.<br>
                                    También cuenta con una barra de herramientas <span class="code">#listToolbar</span> y luego tiene la zona en la que se renderiza la lista de tareas <span class="code">#tasklist</span>.
                                </p>
                    </section>
                    <section id="code-section">
                        <head>
                            <h2 class="title">El código</h2>
                        </head>
                        <p>
                            A grandes rasgos, el tronco principal es una función llamada <i class="code">app()</i>, que es la que dispara las funciones que renderizan el contenido según las condiciones de la lista de tareas <i class="code">taskList</i> (si tiene contenido o no) y de si existe o no una tarea activa <i class="code">activeTask</i>.<br>
                        </p>
                        <p>
                            En caso de que la lista esté vacía se muestra una pantalla de bienvenida con <i class="code">renderWithoutTasks()</i>, y si la lista contiene tareas comprobará si existe una tarea activa <i class="code">activeTask</i>. Si no existe disparará <i class="code">renderWelcome()</i> que renderiza una pantalla de bienvenida distinta y en caso de que exista renderizará la tarea con <i class="code">renderTask()</i>.
                        </p>
                        <p id="task-section">
                            <strong class="titmark">La clase <i class="code">Task</i>, el objeto <i class="code">activeTask</i> y el array de tareas <i class="code">taskList</i></strong>
                        </p>
                        <p>                            
                            La clase <i class="code">Task</i> tiene como propiedades las de una tarea (contenidos y estados) y tres métodos: uno para recuperar datos <i class="code">getDataFrom()</i>, otro para volcar datos <i class="code">putDataTo()</i> y un tercero <i class="code">checkIfExpired()</i>, que comprueba si la tarea está caducada.
                        </p> 
                        <p>
                            <i class="code">activeTask</i> es un objeto de la clase <i class="code">Task</i> que actúa como intermediario entre el DOM y el array de la lista de tareas <i class="code">taskList</i>.
                        </p> 
                        <p>
                            Al crear una nueva tarea se inicializa una <i class="code">activeTask</i> con los estados por defecto y los contenidos vacíos excepto por la propiedad <i class="code">creationDate</i>, que más tarde servirá para identificar la tarea dentro de la lista de tareas.<br>
                            Una vez editado el DOM y al guardar la tarea, <i class="code">activeTask</i> recoge el contenido y los estados y se añade al array <i class="code">taskList</i> que es almacenado en el <i class="code">localStorage</i>.
                        </p>
                        <p>
                            Al renderizar la lista de tareas, a cada elemento <i class="code">&#60;li&#62;</i> se le asigna el atributo <i class="code">[date-id]</i> con su valor de <i class="code">creationDate</i> para, al seleccionarlo, identificar el objeto dentro del array <i class="code">taskList</i> y asignarlo a <i class="code">activeTask</i>, que vuelca los datos y los estados en el renderizado de la tarea.
                        </p>
                        <p>
                            En dicho renderizado, los datos de texto y de fecha se vuelcan en los input mientras que los estados se establecen como atributos en el contenedor <span class="code">#display-holder</span> para que luego, mediante CSS, se asignen los estilos a los elementos según esos atributos.<br>
                            Alternar los botones de estado tan solo añade o elimina el atributo del contenedor <span class="code">displayHolder</span> (también alterna el atributo <span class="code">[aria-checked]</span> del mismo botón), es luego el método <i class="code">getDataFrom()</i> de la clase <i class="code">Task</i> el que se encarga de comprobar que existan esos atributos para definir las propiedades de la tarea al guardarla.
                        </p>
                        <p>
                            Estos mismos atributos son también añadidos a cada <i class="code">&#60;li&#62;</i> el renderizar la lista de tareas para, de nuevo con CSS, dar estilos a los elementos de cada tarea según su estado.
                        </p>
                        <p id="render-section">
                            <strong class="titmark">Los renderizados</strong>
                        </p>
                        <p>
                            Con la intención de conseguir mantener de manera independiente el contenido HTML del código JS, se hace uso de las etiquetas <i class="code">&#60;template&#62;</i> para generar las plantillas del contenido en el mismo HTML en lugar de construirlas en JS.
                        </p>
                        <p>
                            Esos nodos son clonados y almacenados con JS, y se renderizan cada vez que se necesitan. Para la vista de tarea, primero se incluye el template vacío en el DOM y luego se vuelca la información en él, mientras que para la lista de tareas se construye el contenido de cada elemento en un clon y se van añadiendo en un elemento HTML para, una vez recorrida la lista, incluirlo en el DOM.
                        </p>
                        <p>
                            ***Mientras lo construía descubrí que existe <i class="code">route()</i> que posiblemente sería una mejor solución (tengo que investigar más sobre esto), pero puesto que solo estaba renderizando las vistas en la zona de display y de la lista de tareas decidí seguir con mi método y aplazar el uso de <i class="code">router()</i> para otro proyecto con más "páginas". Tampoco he querido utilizar ningún sistema de templates de terceros por similares razones: no creo que esta SPA sea tan compleja como para necesitarlo y quería resolverlo por mi cuenta.
                        </p>
                        <p id="translator-section">
                            <strong class="titmark">El traductor</strong>
                        </p>
                        <p>
                            Consta de dos archivos: <strong>lang.js</strong> que contiene los namespaces y <strong>translate.js</strong> en el que se encuentran las funciones del traductor.
                        </p>
                        <p>
                            <strong>translate.js</strong> se inicia antes de <strong>app.js</strong> y establece un idioma por defecto en caso de no exista uno definido en las cookies.
                        </p>
                        <p>
                            En <strong>translate.js</strong> existen dos funciones principales: <i class="code">translateJs()</i> que se dispara antes de <i class="code">app.js</i> para asignar los valores a las variables que se usan para los <i class="code">alert()</i> y los <i class="code">confirm()</i>, y <i class="code">translateDom()</i> que debe ser disparada después de cada renderizado, que se encarga de recorrer el DOM en busca de elementos que contengan el atributo que especifica si su <i class="code">innerHTML</i>, <i class="code">[title]</i>, <i class="code">[placeholder]</i> o <i class="code">[aria-label]</i> debe ser traducido.
                        </p>
                        <p>
                            ***De nuevo, no he querido utilizar ningún sistema de templating para el traductor porque quería ver los problemas con los que me encontraba. De hecho he reesctiro el traductor varias veces buscando soluciones para evitar el uso de atributos para marcar las traducciones que hay que realizar. Una idea era utilizar una formato para los textos a traducir (como por ejemplo {*key*}), recorrer el DOM como string en busca de esos formatos y reemplazarlos. Funcionaba bien, pero el problema estaba en que una vez reemplazado el DOM, perdía todos los listeners, así que hice un <strong>git reset hard</strong> y seguí con la versión de los atributos. LUEGO descubrí el <strong>Event delegation</strong> pero decidí terminar el proyecto, investigarlo de manera independiente y luego aplicarlo.
                        </p>
                        <p id="aria-section">
                            <strong class="titmark">WEI-ARIA</strong>
                        </p>
                        <p>
                            De cara al uso de lectores de pantalla, se han aplicado atributos <span class="code">[title]</span>, <span class="code">[role]</span> y <span class="code">[aria-label]</span> a las áreas principales y a los elementos importantes y <span class="code">[aria-checked]</span> a los botones de estado de las tareas.
                        </p>
                        <p>
                            Además se ha establecido un orden natural de tabulación con <span class="code">[tabindex]</span> y se han redirigido los <i class="code">focus()</i> a sus destinos según las acciones efectuadas.
                        </p>
                        <p>
                            Testeado con el software NVDA.
                        </p>
                        <p id="extra-section">
                            <strong class="titmark">Funciones extra</strong>
                        </p>
                        <p>
                            <ul>
                                <li>Comprobación de cambios no guardados al seleccionar o crear una nueva tarea.</li>
                                <li>Texto animado al <i class="code">mouseover</i> sobre el título de la tarea en el listado de la tarea si este es más largo que el contenedor.</li>
                                <li>Guardar cambios al pulsar Intro mientras se edita el título de una tarea.</li>
                                <li>Cambio del formato de la fecha mostrado según el idioma.</li>
                            </ul>
                        </p>
                    </section>
                </div>
            </article>

        </div>
    </div>
    <?php require('./template-parts/footer.php');?>
    <script src="./js/sidebar.js?ver=<?php echo filemtime(__DIR__.'/js/sidebar.js') ?>"></script>
    <script src="./js/document.js?ver=<?php echo filemtime(__DIR__.'/js/document.js') ?>"></script>
</body>
</html>