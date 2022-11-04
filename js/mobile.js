const showSidebar = document.getElementById('mobile-show-sidebar');
const hideSidebar = document.getElementById('mobile-hide-sidebar');
const body = document.body;


/*Show Sidebar Action*/
showSidebar.addEventListener('click', () => {
    if(!body.classList.contains('sidebar-visible')) {
        body.classList.add('sidebar-visible');
    };
});

/*Hide Sidebar Action*/
hideSidebar.addEventListener('click', () => {
    if(body.classList.contains('sidebar-visible')) {
        body.classList.remove('sidebar-visible');
    };
});

function mobilejsHideSidebarOnClick(element) {    
    element.addEventListener('click', () => {
        if(body.classList.contains('sidebar-visible')) {
            body.classList.remove('sidebar-visible');
        };
    })
}