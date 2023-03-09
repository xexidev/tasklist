const links = Array.from(document.getElementById('tasklist').getElementsByTagName('a'));
links.forEach(link => {
    link.addEventListener('click', (e) => {
        if (document.body.classList.contains('sidebar-visible')) {
            document.body.classList.remove('sidebar-visible');
        };
    });
});