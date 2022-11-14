let lang;
let defaultLang = 'en';
const langCookie = document.cookie.replace(/(?:(?:^|.*;\s*)lang\s*\=\s*([^;]*).*$)|^.*$/, "$1");

if (langCookie !== '') {
    lang = langCookie;
} else
if (langCookie === '' && typeof(lang) === 'undefined') {
    lang = defaultLang;
};

//Buttons and listeners
const languageNodes = document.getElementById('language');
const languageBtn = document.getElementById('language-btn');
const languageList = document.getElementById('language-list');
const languageText = document.getElementById('language-text');
const langBtns = Array.from(document.getElementsByClassName('select-lang-btn'));
const esBtn = document.getElementById('esBtn');
const enBtn = document.getElementById('enBtn');

languageBtn.addEventListener('click', () => {
    if (languageList.classList.contains('visible')) {
        languageList.classList.remove('visible');
        languageList.classList.add('hidden');
    } else
    if (languageList.classList.contains('hidden')) {
        languageList.classList.remove('hidden');
        languageList.classList.add('visible');
    };
});

document.addEventListener('click', (e) => {
    if(!languageNodes.contains(e.target)) {
        languageList.classList.remove('visible');
        languageList.classList.add('hidden');
    }
})

esBtn.addEventListener('click', () => {
    lang = 'es';
    document.cookie = `lang=${lang};max-age=60*60*24*360`;
    translateDom(lang);
    translateJs(lang);
    if (languageList.classList.contains('visible')) {
        languageList.classList.remove('visible');
        languageList.classList.add('hidden');
    };
    langBtns.forEach(btn => {
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected')
        };
    });
    esBtn.classList.add('selected');
});
enBtn.addEventListener('click', () => {
    lang = 'en';
    document.cookie = `lang=${lang};max-age=60*60*24*360`;
    translateDom(lang);
    translateJs(lang);
    if (languageList.classList.contains('visible')) {
        languageList.classList.remove('visible');
        languageList.classList.add('hidden');
    };
    langBtns.forEach(btn => {
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected')
        };
    });
    enBtn.classList.add('selected');
});

//Translate JS
translateJs(lang);
function translateJs(language) {
    if (language === 'es') {
        jsText.es();
    };
    if (language === 'en') {
        jsText.en();
    };
};

//Translate DOM (Call this function after render)
function translateDom(language) {
    const allDom = Array.from(document.getElementsByTagName('*'));

    allDom.forEach(node => {
        if (language === 'es') {            
            //Texts
            Object.getOwnPropertyNames(domText.es).forEach(property => {
                if (property === node.getAttribute('txtkey')) {
                    node.innerHTML = domText.es[property];
                };
            });
            //Placeholders
            Object.getOwnPropertyNames(domPh.es).forEach(property => {
                if (property === node.getAttribute('phkey')) {
                    node.setAttribute('placeholder',domPh.es[property]);
                };
            });
            //Aria Labels
            Object.getOwnPropertyNames(domAria.es).forEach(property => {
                if (property === node.getAttribute('ariakey')) {
                    node.setAttribute('placeholder',domAria.es[property]);
                };
            });
            //Titles
            Object.getOwnPropertyNames(domTitle.es).forEach(property => {
                if (property === node.getAttribute('titlekey')) {
                    node.setAttribute('title',domTitle.es[property]);
                };
            });

            //Translate button
            languageText.innerHTML = 'Español';
            esBtn.classList.add('selected');
        };
        if (language === 'en') {
            //Texts
            Object.getOwnPropertyNames(domText.en).forEach(property => {
                if (property === node.getAttribute('txtkey')) {
                    node.innerHTML = domText.en[property];
                };
            });
            //Placeholders
            Object.getOwnPropertyNames(domPh.en).forEach(property => {
                if (property === node.getAttribute('phkey')) {
                    node.setAttribute('placeholder',domPh.en[property]);
                };
            });
            //Aria Labels
            Object.getOwnPropertyNames(domAria.en).forEach(property => {
                if (property === node.getAttribute('ariakey')) {
                    node.setAttribute('placeholder',domAria.en[property]);
                };
            });
            //Titles
            Object.getOwnPropertyNames(domTitle.en).forEach(property => {
                if (property === node.getAttribute('titlekey')) {
                    node.setAttribute('title',domTitle.en[property]);
                };
            });
            //Translate button
            languageText.innerHTML = 'English';
            enBtn.classList.add('selected');
        };
    });

    //Set date format
    const listDate = Array.from(document.getElementsByClassName('date'));
    const taskDate = document.getElementById('date-picker-text');
    const dateArray = [taskDate,...listDate];
    
    dateArray.forEach(date => {
        if(date) {
            let firstData = date.innerHTML.split('-')[0].length;
            if (language === 'es' && firstData > 2 && firstData !== 0) {
                let newDate = date.innerHTML.split('-').reverse().join('-');
                date.innerHTML = newDate;
            };
            if (language === 'en' && firstData < 4 && firstData !== 0) {
                let newDate = date.innerHTML.split('-').reverse().join('-');
                date.innerHTML = newDate;
            };
        };
    });
};