const showSidebarBtn = document.getElementById('mobile-show-sidebar');
const hideSidebarBtn = document.getElementById('mobile-hide-sidebar');
const body = document.body;

//Button listeners
showSidebarBtn.addEventListener('click', () => { showSidebar(); });
hideSidebarBtn.addEventListener('click', () => { hideSidebar(); });

/*Show Sidebar Action*/
function showSidebar() {
    if(!body.classList.contains('sidebar-visible')) {
        body.classList.add('sidebar-visible');
    };
};

/*Hide Sidebar Actions*/
function hideSidebar() {
    if(body.classList.contains('sidebar-visible')) {
        body.classList.remove('sidebar-visible');
    };
};
function mobilejsHideSidebarOnClick(element) {    
    element.addEventListener('click', () => {
        hideSidebar();
    });
};