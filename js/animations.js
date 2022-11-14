//Scrolling title on tasklist
if (taskList.length !== 0) {
    let HTMLTasks = document.querySelectorAll('.tasklist-element');
    HTMLTasks.forEach(HTMLTask => {
        let title = HTMLTask.getElementsByClassName('title')[0];
        let titleBox = HTMLTask.getElementsByClassName('titlebox')[0];
        let titleBoxWidth = HTMLTask.getElementsByClassName('titlebox')[0].offsetWidth;
        let titleTextWidth = HTMLTask.getElementsByClassName('title')[0].scrollWidth;
        let margin = 0;
        let scroll;
        
        if (titleTextWidth > titleBoxWidth) {
            titleBox.addEventListener('mouseover', () => {
                scroll = setInterval(() => {
                    title.style.transition = 'all 300ms linear'
                    title.style.marginLeft = `-${margin}px`;
                    margin++;
                    if (margin > titleTextWidth) {                        
                        clearInterval(scroll);
                        margin = 0;
                        title.style.marginLeft = `-${margin}px`;
                        title.style.transition = 'all 300ms ease-in-out'
                    };
                },10);
            });
            titleBox.addEventListener('mouseout', () => {
                clearInterval(scroll);
                margin = 0;
                title.style.marginLeft = `-${margin}px`;
                title.style.transition = 'all 300ms ease-in-out';
            });
        };
    });
};