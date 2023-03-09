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

//Language dropwdown
languageBtn.addEventListener('click', () => {
    toggleLangDropdown();
});

//Close dropdown on click outside
document.addEventListener('click', (e) => {
    if(!languageNodes.contains(e.target)) {
        languageList.classList.remove('visible');
        languageList.classList.add('hidden');
    }
})

//Language buttons
esBtn.addEventListener('click', (e) => {
    lang = 'es';
    selectLanguage(e);
});
enBtn.addEventListener('click', (e) => {
    lang = 'en';
    selectLanguage(e);
});

function selectLanguage(e) {
    document.cookie = `lang=${lang};max-age=60*60*24*360`;
    translateDom(lang);
    translateJs(lang);
    toggleLangDropdown();
    langBtns.forEach(btn => {
        if (btn.classList.contains('selected')) {
            btn.classList.remove('selected')
        };
    });
    e.target.classList.add('selected');
}

//Translate JS and set HTML TAG lang attribute
translateJs(lang);
function translateJs(language) {
    if (language === 'es') {
        document.getElementsByTagName('html')[0].setAttribute('lang','es');
        jsText.es();
    };
    if (language === 'en') {
        document.getElementsByTagName('html')[0].setAttribute('lang','en');
        jsText.en();
    };
};

//Translate DOM (Call this function after renders)
function translateDom(language) {
    const allDom = Array.from(document.getElementsByTagName('*'));

    allDom.forEach(node => {
            //Texts
            Object.getOwnPropertyNames(domText[language]).forEach(property => {
                if (property === node.getAttribute('txtkey')) {
                    node.innerHTML = domText[language][property];
                };
            });
            //Placeholders
            Object.getOwnPropertyNames(domPh[language]).forEach(property => {
                if (property === node.getAttribute('phkey')) {
                    node.setAttribute('placeholder',domPh[language][property]);
                };
            });
            //Aria Labels
            Object.getOwnPropertyNames(domAria[language]).forEach(property => {
                if (property === node.getAttribute('ariakey')) {
                    node.setAttribute('aria-label',domAria[language][property]);
                };
            });
            //Titles
            Object.getOwnPropertyNames(domTitle[language]).forEach(property => {
                if (property === node.getAttribute('titlekey')) {
                    node.setAttribute('title',domTitle[language][property]);
                };
            });

            //Translate button
            setDropdown(lang);
    });

    //Set date format when displayed
    const listDates = Array.from(document.getElementsByClassName('date'));
    const taskDate = document.getElementById('date-picker-text');
    const dateArray = [taskDate,...listDates];
    
    dateArray.forEach(element => {
        if(element && element.innerHTML) {
            let dateText = element.innerHTML;
            element.innerHTML = getFormattedDate(dateText);
        };
    });
};

//Date formatter
function getFormattedDate(date) {
    let newDate;
    if(date) {
        let firstData = date.split('-')[0].length;
        if (lang === 'es' && firstData > 2 && firstData !== 0) {
            newDate = date.split('-').reverse().join('-');
        } else
        if (lang === 'en' && firstData <= 2 && firstData !== 0) {
            newDate = date.split('-').reverse().join('-');        
        } else {
            newDate = date;
        };
    };
    return newDate;
};

//Dropdown text and selected option
function setDropdown(language) {
    if (language === 'es') {
        languageText.innerHTML = 'Español';
        esBtn.classList.add('selected');
    } else
    if (language === 'en') {
        languageText.innerHTML = 'English';
        enBtn.classList.add('selected');
    };
};

//Toggle language dropdown visibility
function toggleLangDropdown() {    
    if (languageList.classList.contains('visible')) {
        languageList.classList.remove('visible');
        languageList.classList.add('hidden');
    } else
    if (languageList.classList.contains('hidden')) {
        languageList.classList.remove('hidden');
        languageList.classList.add('visible');
    } else {
        languageList.classList.add('visible');
    };
};