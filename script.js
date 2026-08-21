/* =========================================================
   GIRLS QUESTIONNAIRE
   JOSIE BIRTHDAY
   ========================================================= */


/* =========================================================
   FIREBASE IMPORTS
   ========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
   ========================================================= */

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBlZ2-rFjevSEGNWvOVedRLjOMhkS_iIVg",
    authDomain: "josie-questionnaire.firebaseapp.com",
    projectId: "josie-questionnaire",
    storageBucket: "josie-questionnaire.firebasestorage.app",
    messagingSenderId: "411146831445",
    appId: "1:411146831445:web:be0481f795d0cb129bb6dc",
    measurementId: "G-X65QHD83MW"
};


/* =========================================================
   FIREBASE INITIALIZATION
   ========================================================= */

const firebaseApp =
    initializeApp(
        firebaseConfig
    );


const auth =
    getAuth(
        firebaseApp
    );


const db =
    getFirestore(
        firebaseApp
    );


/* =========================================================
   FIREBASE USER
   ========================================================= */

let firebaseUser = null;

let firebaseReadyResolve;

const firebaseReady =
    new Promise(resolve => {

        firebaseReadyResolve =
            resolve;

    });


/* =========================================================
   FIREBASE AUTHENTICATION
   ========================================================= */

async function initializeFirebase() {

    try {

        /*
            Если Firebase уже восстановил
            пользователя — используем его.
        */

        if (auth.currentUser) {

            firebaseUser =
                auth.currentUser;

            firebaseReadyResolve(
                firebaseUser
            );

            console.log(
                "Firebase connected:",
                firebaseUser.uid
            );

            return;

        }


        /*
            Создаём анонимного пользователя.
        */

        const result =
            await signInAnonymously(
                auth
            );


        firebaseUser =
            result.user;


        firebaseReadyResolve(
            firebaseUser
        );


        console.log(
            "Firebase connected:",
            firebaseUser.uid
        );


        if (saveStatus) {

            saveStatus.textContent =
                "♥";

        }


    } catch (error) {

        console.error(
            "Что-то пошло не так",
            error
        );


        /*
            Даже если Firebase недоступен,
            сайт продолжит работать с localStorage.
        */

        firebaseReadyResolve(
            null
        );


        if (saveStatus) {

            saveStatus.textContent =
                "♥ ответы сохраняются на устройстве";

        }

    }

}


/* =========================================================
   QUESTIONS
   ========================================================= */

const questions = [

    {
        number: 1,
        title: "Имя",
        description: "Как тебя зовут?",
        type: "input",
        placeholder: "напиши здесь..."
    },

    {
        number: 2,
        title: "Возраст",
        description: "Сколько тебе сейчас лет?",
        type: "input",
        inputType: "number",
        placeholder: "сколько тебе лет?"
    },

    {
        number: 3,
        title: "Магическое сообщество",
        description: "Как ты думаешь, каким должно быть Министерство магии, чтобы ему действительно хотелось доверять? Каким, по-твоему, должно быть идеальное соотношение между безопасностью и свободой?",
        type: "textarea"
    },

    {
        number: 4,
        title: "Феминизм",
        description: "Какие идеи феминизма тебе близки? А с какими ты не согласна? Почему?",
        type: "textarea"
    },

    {
        number: 5,
        title: "Внутренние перемены",
        description: "Что сейчас особенно занимает твои мысли? Может быть, взросление, отношения, самооценка, давление окружающих, соцсети, поиск себя или что-то совершенно другое?",
        type: "textarea"
    },

    {
        number: 6,
        title: "Что тревожит в мире",
        description: "Какая проблема современного мира беспокоит тебя сильнее всего? Климат, неравенство, технологии, отношения с магглами, будущее магического сообщества и в целом общества или что-то ещё? Почему именно это?",
        type: "textarea"
    },

    {
        number: 7,
        title: "Самая несправедливая вещь",
        description: "Какую проблему (в мире или в твоей жизни) ты считаешь самой несправедливой? И что, по-твоему, можно сделать с ней хотя бы в пределах собственного маленького мира?",
        type: "textarea"
    },

    {
        number: 8,
        title: "Что для тебя важно",
        description: "Какие ценности тебе точно важны? А от чего могла бы отказаться, если жизнь сильно изменится?",
        type: "textarea"
    },

    {
        number: 9,
        title: "Ответственность",
        description: "Что для тебя ответственность: бремя, привилегия, необходимость, возможность влиять на что-то или что-то ещё? Вспомни какую-нибудь ситуацию из своей жизни, которая хорошо это показывает.",
        type: "textarea"
    },

    {
        number: 10,
        title: "Когда тебя не слышат",
        description: "Бывает ли, что с тобой не считаются только из-за возраста? В какие моменты ты это особенно чувствуешь и как обычно реагируешь?",
        type: "textarea"
    },

    {
        number: 11,
        title: "Что тебя сформировало",
        description: "Назови одну-две книги, фильма, песни, произведения искусства или даже чьи-то слова, которые значительно повлияли на твоё становление как личности.",
        type: "textarea"
    },

    {
        number: 12,
        title: "Я или Мы",
        description: "Что обычно перевешивает, когда твои желания не совпадают с ожиданиями окружающих: собственный выбор или желание соответствовать? Почему?",
        type: "textarea"
    },

    {
        number: 13,
        title: "Когда ты почувствовала себя взрослой",
        description: "Вспомни одну ситуацию за последний год, когда ты неожиданно поймала себя на мысли: «Я уже не ребёнок». Что произошло и что ты тогда чувствовала?",
        type: "textarea"
    },

    {
        number: 14,
        title: "Что ты можешь изменить",
        description: "Какие способы делать что-то полезное для других кажутся тебе действительно важными и реальными? Волонтёрство, творчество, помощь конкретным людям, участие в жизни Школы или что-то другое?",
        type: "textarea"
    },

    {
        number: 15,
        title: "Если бы тебя услышали взрослые",
        description: "Представь, что у тебя есть пять минут, чтобы обратиться ко всем взрослым вокруг. О чём ты сказала бы в первую очередь? И какой один конкретный шаг попросила бы их сделать?",
        type: "textarea"
    },

    {
        number: 16,
        title: "Письмо себе через пять лет",
        description: "Что бы ты хотела сказать себе будущей? Какие у тебя сейчас мечты, цели и надежды? Кем ты представляешь себя через пять лет?",
        type: "textarea"
    },

    {
        number: 17,
        title: "Пожелания хозяйке анкеты",
        description: "Здесь ты можешь оставить своё послание для Джози: может быть, то, что ты сама хотела бы услышать в её возрасте, или просто что-то, что хочется сказать именно ей.",
        type: "textarea"
    }

];


/* =========================================================
   BOOK CONFIGURATION
   ========================================================= */

const spreads = [

    {
        left: [1, 2, 3, 4],
        right: [5, 6, 7]
    },

    {
        left: [8, 9, 10],
        right: [11, 12, 13]
    },

    {
        left: [14, 15, 16],
        right: [17]
    }

];


const TOTAL_SPREADS =
    spreads.length;


/* =========================================================
   LOCAL STORAGE
   ========================================================= */

const STORAGE_KEY =
    "josie_questionnaire_answers";


/* =========================================================
   STATE
   ========================================================= */

let currentSpread = 0;

let answers = {};

let firebaseSaveTimeout = null;


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const coverScreen =
    document.getElementById(
        "coverScreen"
    );


const notebookScreen =
    document.getElementById(
        "notebookScreen"
    );


const openButton =
    document.getElementById(
        "openButton"
    );


const leftPage =
    document.getElementById(
        "leftPage"
    );


const rightPage =
    document.getElementById(
        "rightPage"
    );


const leftPageNumber =
    document.getElementById(
        "leftPageNumber"
    );


const rightPageNumber =
    document.getElementById(
        "rightPageNumber"
    );


const previousButton =
    document.getElementById(
        "previousButton"
    );


const nextButton =
    document.getElementById(
        "nextButton"
    );


const spreadNumber =
    document.getElementById(
        "spreadNumber"
    );


const totalSpreads =
    document.getElementById(
        "totalSpreads"
    );


const progressBar =
    document.getElementById(
        "progressBar"
    );


const saveStatus =
    document.getElementById(
        "saveStatus"
    );


const book =
    document.getElementById(
        "book"
    );


const finishScreen =
    document.getElementById(
        "finishScreen"
    );


const finishButton =
    document.getElementById(
        "finishButton"
    );


/* =========================================================
   LOAD ANSWERS FROM LOCAL STORAGE
   ========================================================= */

function loadAnswers() {

    const saved =
        localStorage.getItem(
            STORAGE_KEY
        );


    if (!saved) {

        return;

    }


    try {

        answers =
            JSON.parse(
                saved
            );

    } catch (error) {

        console.error(
            "Ошибка загрузки локальных ответов:",
            error
        );

        answers = {};

    }

}


/* =========================================================
   SAVE LOCAL ANSWERS
   ========================================================= */

function saveLocalAnswers() {

    try {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(
                answers
            )
        );

    } catch (error) {

        console.error(
            "Ошибка localStorage:",
            error
        );

    }

}


/* =========================================================
   GET DISPLAY NAME
   ========================================================= */

/*
    Имя для общей страницы ответов
    берём из вопроса №1.

    Если имя ещё не заполнено,
    используем временное название.
*/

function getDisplayName() {

    const name =
        answers[1];

    if (
        name &&
        String(name).trim()
    ) {

        return String(name).trim();

    }


    return "Анонимная анкета";

}


/* =========================================================
   SAVE TO FIREBASE
   ========================================================= */

async function saveToFirebase(
    completed = false
) {

    /*
        Ждём авторизации.
    */

    await firebaseReady;


    /*
        Если Firebase не смог
        авторизовать пользователя,
        ничего страшного — localStorage
        уже сохранил ответы.
    */

    if (!firebaseUser) {

        console.warn(
            "Firebase user отсутствует."
        );

        return false;

    }


    try {

        const questionnaireRef =
            doc(
                db,
                "questionnaires",
                firebaseUser.uid
            );


        /*
            Проверяем, существует ли
            документ уже.

            Это нужно для createdAt:
            мы не хотим менять дату
            создания при каждом вводе.
        */

        const existingDocument =
            await getDoc(
                questionnaireRef
            );


        const data = {

            answers: answers,

            displayName: getDisplayName(),

            completed: completed,

            updatedAt: serverTimestamp()

        };


        /*
            Если анкета сохраняется впервые,
            создаём createdAt.

            Если документ уже существует,
            createdAt не трогаем.
        */

        if (
            !existingDocument.exists()
        ) {

            data.createdAt =
                serverTimestamp();

        }


        console.log(
            "Firebase: сохраняем ответы...", {
                uid: firebaseUser.uid,

                displayName: getDisplayName(),

                completed: completed
            }
        );


        await setDoc(
            questionnaireRef,
            data, {
                merge: true
            }
        );


        console.log(
            "Firebase: ответы успешно сохранены ♥"
        );


        return true;

    } catch (error) {

        console.error(
            "Firebase: ОШИБКА СОХРАНЕНИЯ",
            error
        );


        console.error(
            "Firebase error code:",
            error.code
        );


        console.error(
            "Firebase error message:",
            error.message
        );


        return false;

    }

}


/* =========================================================
   SAVE ANSWERS
   ========================================================= */

/*
    Обычное автосохранение.

    Пользователь печатает →
    localStorage сохраняется сразу →
    Firebase получает изменения через 700 мс.
*/

function saveAnswers(
    completed = false
) {

    /*
        Локальное сохранение
        происходит мгновенно.
    */

    saveLocalAnswers();


    if (saveStatus) {

        saveStatus.textContent =
            "♥ сохраняем...";

    }


    /*
        Убираем предыдущий таймер.
    */

    clearTimeout(
        firebaseSaveTimeout
    );


    /*
        Ставим новый.

        Благодаря этому не будет
        запроса в Firebase на каждый
        отдельный символ.
    */

    firebaseSaveTimeout =
        setTimeout(
            async () => {

                const success =
                    await saveToFirebase(
                        completed
                    );


                if (
                    saveStatus
                ) {

                    if (success) {

                        saveStatus.textContent =
                            "♥ записано в тетрадочку";

                    } else {

                        saveStatus.textContent =
                            "♥ связь с космосом потеряна, но мы запомнили";

                    }


                    clearTimeout(
                        saveAnswers.statusTimeout
                    );


                    saveAnswers.statusTimeout =
                        setTimeout(
                            () => {

                                saveStatus.textContent =
                                    "♥ ответы сохраняются автоматически";

                            },
                            2000
                        );

                }

            },
            700
        );

}


/* =========================================================
   IMMEDIATE SAVE
   ========================================================= */

/*
    Используется перед перелистыванием
    и завершением анкеты.

    Здесь Firebase сохраняется
    немедленно, без ожидания 700 мс.
*/

async function saveAnswersImmediately(
    completed = false
) {

    saveLocalAnswers();


    clearTimeout(
        firebaseSaveTimeout
    );


    if (saveStatus) {

        saveStatus.textContent =
            "♥ сохраняем...";

    }


    const success =
        await saveToFirebase(
            completed
        );


    if (saveStatus) {

        if (success) {

            saveStatus.textContent =
                "♥ записано в тетрадочку";

        } else {

            saveStatus.textContent =
                "♥ связь с космосом потеряна, но мы запомнили";

        }

    }


    return success;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   FIND QUESTION
   ========================================================= */

function getQuestion(number) {

    return questions.find(
        question =>
            question.number === number
    );

}


/* =========================================================
   CREATE QUESTION
   ========================================================= */

function createQuestion(
    question
) {

    const value =
        answers[
            question.number
            ] || "";


    const description =
        question.description ?
            `
                <div class="question-description">
                    ${escapeHTML(
                question.description
            )}
                </div>
            ` :
            "";


    let field;


    if (
        question.type ===
        "input"
    ) {

        field = `
            <input
                class="answer"
                type="${
            question.inputType ||
            "text"
        }"
                data-question="${
            question.number
        }"
                value="${escapeHTML(
            value
        )}"
                placeholder="${escapeHTML(
            question.placeholder ||
            ""
        )}"
            >
        `;

    } else {

        field = `
            <textarea
                class="answer answer-long"
                data-question="${
            question.number
        }"
                placeholder="пиши здесь..."
            >${escapeHTML(
            value
        )}</textarea>
        `;

    }


    return `
        <div
            class="question"
            data-question="${
        question.number
    }"
        >

            <div class="question-title">

                <span class="question-number">

                    ${question.number}.

                </span>

                <span>
                    ${
        escapeHTML(
            question.title
        )
    }
                </span>

            </div>

            ${description}

            ${field}

        </div>
    `;

}


/* =========================================================
   CREATE PAGE
   ========================================================= */

function createPage(
    questionNumbers
) {

    /*
        Пустая страница.
    */

    if (
        !questionNumbers ||
        questionNumbers.length === 0
    ) {

        return `

            <div
                style="
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    text-align:center;
                "
            >

                <div>

                    <div
                        style="
                            font-size:48px;
                            margin-bottom:15px;
                        "
                    >
                        🎀
                    </div>

                    <div
                        style="
                            color:#a44070;
                            font-family:'DM Serif Display',serif;
                            font-size:28px;
                            line-height:1.1;
                        "
                    >
                        Ты дошла<br>
                        до конца!
                    </div>

                    <div
                        style="
                            margin-top:12px;
                            color:#b47792;
                            font-family:'Caveat',cursive;
                            font-size:18px;
                        "
                    >
                        осталось только закончить ♥
                    </div>

                </div>

            </div>

        `;

    }


    let html = "";


    questionNumbers.forEach(
        number => {

            const question =
                getQuestion(
                    number
                );


            if (question) {

                html +=
                    createQuestion(
                        question
                    );

            }

        }
    );


    return html;

}


/* =========================================================
   RENDER SPREAD
   ========================================================= */

function renderSpread(
    direction = null
) {

    const spread =
        spreads[
            currentSpread
            ];


    leftPage.innerHTML =
        createPage(
            spread.left
        );


    rightPage.innerHTML =
        createPage(
            spread.right
        );


    updatePageNumbers();


    updateNavigation();


    attachInputListeners();


    if (direction) {

        animateBook(
            direction
        );

    }

}


/* =========================================================
   PAGE NUMBERS
   ========================================================= */

function updatePageNumbers() {

    /*
        Нумерация именно физических страниц:

        Разворот 1:
        1 | 2

        Разворот 2:
        3 | 4
    */

    leftPageNumber.textContent =
        String(
            currentSpread * 2 + 1
        );


    rightPageNumber.textContent =
        String(
            currentSpread * 2 + 2
        );

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function updateNavigation() {

    spreadNumber.textContent =
        currentSpread + 1;


    totalSpreads.textContent =
        TOTAL_SPREADS;


    previousButton.disabled =
        currentSpread === 0;


    if (
        currentSpread ===
        TOTAL_SPREADS - 1
    ) {

        nextButton.innerHTML =
            `
                закончить
                <span>♥</span>
            `;

    } else {

        nextButton.innerHTML =
            `
                дальше
                <span>→</span>
            `;

    }


    const progress =
        (
            (
                currentSpread + 1
            ) /
            TOTAL_SPREADS
        ) * 100;


    progressBar.style.width =
        `${progress}%`;

}


/* =========================================================
   BOOK ANIMATION
   ========================================================= */

function animateBook(
    direction
) {

    book.classList.remove(
        "turn-next",
        "turn-prev"
    );


    void book.offsetWidth;


    book.classList.add(
        direction === "next" ?
            "turn-next" :
            "turn-prev"
    );


    setTimeout(
        () => {

            book.classList.remove(
                "turn-next",
                "turn-prev"
            );

        },
        550
    );

}


/* =========================================================
   INPUT LISTENERS
   ========================================================= */

function attachInputListeners() {

    const fields =
        document.querySelectorAll(
            ".answer"
        );


    fields.forEach(
        field => {

            field.addEventListener(
                "input",
                event => {

                    const number =
                        Number(
                            event.target
                                .dataset
                                .question
                        );


                    answers[
                        number
                        ] =
                        event.target.value;


                    /*
                        Сохраняем изменения.
                    */

                    saveAnswers();

                }
            );

        }
    );

}


/* =========================================================
   NEXT SPREAD
   ========================================================= */

async function nextSpread() {

    /*
        Перед перелистыванием
        гарантируем сохранение.
    */

    await saveAnswersImmediately(
        false
    );


    if (
        currentSpread <
        TOTAL_SPREADS - 1
    ) {

        currentSpread++;


        renderSpread(
            "next"
        );


        return;

    }


    /*
        Последняя страница.
    */

    await finishQuestionnaire();

}


/* =========================================================
   PREVIOUS SPREAD
   ========================================================= */

async function previousSpread() {

    if (
        currentSpread <= 0
    ) {

        return;

    }


    await saveAnswersImmediately(
        false
    );


    currentSpread--;


    renderSpread(
        "prev"
    );

}


/* =========================================================
   OPEN NOTEBOOK
   ========================================================= */

function openNotebook() {

    coverScreen.classList.add(
        "hidden"
    );


    setTimeout(
        () => {

            notebookScreen.classList.add(
                "visible"
            );

        },
        350
    );

}


/* =========================================================
   FINISH QUESTIONNAIRE
   ========================================================= */

async function finishQuestionnaire() {

    saveAnswers();


    /*
        Даём Firebase немного времени
        закончить сохранение.
    */

    await new Promise(
        resolve =>
            setTimeout(
                resolve,
                500
            )
    );


    /*
        Переходим в общую книгу ответов.
    */

    window.location.href =
        "answers.html";

}


/* =========================================================
   CLOSE FINISH SCREEN
   ========================================================= */

function closeFinish() {

    finishScreen.classList.remove(
        "visible"
    );


    notebookScreen.classList.remove(
        "visible"
    );


    setTimeout(
        () => {

            coverScreen.classList.remove(
                "hidden"
            );

        },
        400
    );

}


/* =========================================================
   BUTTONS
   ========================================================= */

openButton.addEventListener(
    "click",
    openNotebook
);


nextButton.addEventListener(
    "click",
    nextSpread
);


previousButton.addEventListener(
    "click",
    previousSpread
);


finishButton.addEventListener(
    "click",
    closeFinish
);


/* =========================================================
   KEYBOARD NAVIGATION
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !notebookScreen.classList.contains(
                "visible"
            )
        ) {

            return;

        }


        const activeTag =
            document
                .activeElement
                .tagName;


        /*
            Не листаем страницу стрелками,
            когда пользователь пишет ответ.
        */

        if (
            activeTag === "INPUT" ||
            activeTag === "TEXTAREA"
        ) {

            return;

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextSpread();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousSpread();

        }

    }
);


/* =========================================================
   TOUCH / SWIPE
   ========================================================= */

let touchStartX = 0;


notebookScreen.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event
                .changedTouches[0]
                .screenX;

    }, {
        passive: true
    }
);


notebookScreen.addEventListener(
    "touchend",
    event => {

        const touchEndX =
            event
                .changedTouches[0]
                .screenX;


        const difference =
            touchEndX -
            touchStartX;


        /*
            Слишком маленькое движение
            не считаем свайпом.
        */

        if (
            Math.abs(
                difference
            ) < 60
        ) {

            return;

        }


        if (
            difference < 0
        ) {

            nextSpread();

        } else {

            previousSpread();

        }

    }, {
        passive: true
    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

loadAnswers();

renderSpread();

initializeFirebase();