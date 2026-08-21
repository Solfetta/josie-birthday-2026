/* =========================================================
   JOSIE QUESTIONNAIRE
   ANSWERS PAGE
   ========================================================= */


/* =========================================================
   FIREBASE IMPORTS
   ========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
   ========================================================= */

/*
    ВСТАВЬ СЮДА ТОТ ЖЕ CONFIG,
    КОТОРЫЙ ИСПОЛЬЗУЕШЬ В script.js
*/

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

const app =
    initializeApp(
        firebaseConfig
    );


const db =
    getFirestore(
        app
    );


/* =========================================================
   QUESTIONS
   ========================================================= */

const questions = [

    {
        number: 1,

        title:
            "Имя",

        description:
            "Как тебя зовут?"
    },

    {
        number: 2,

        title:
            "Возраст:",

        description:
            "Сколько тебе сейчас лет?"
    },

    {
        number: 3,

        title:
            "Магическое сообщество",

        description:
            "Как ты думаешь, каким должно быть Министерство магии, чтобы ему действительно хотелось доверять? Каким, по-твоему, должно быть идеальное соотношение между безопасностью и свободой?"
    },

    {
        number: 4,

        title:
            "Феминизм",

        description:
            "Какие идеи феминизма тебе близки? А с какими ты не согласна? Почему?"
    },

    {
        number: 5,

        title:
            "Внутренние перемены",

        description:
            "Что сейчас особенно занимает твои мысли? Может быть, взросление, отношения, самооценка, давление окружающих, соцсети, поиск себя или что-то совершенно другое?"
    },

    {
        number: 6,

        title:
            "Что тревожит в мире",

        description:
            "Какая проблема современного мира беспокоит тебя сильнее всего? Климат, неравенство, технологии, отношения с магглами, будущее магического сообщества и в целом общества или что-то ещё? Почему именно это?"
    },

    {
        number: 7,

        title:
            "Самая несправедливая вещь",

        description:
            "Какую проблему (в мире или в твоей жизни) ты считаешь самой несправедливой? И что, по-твоему, можно сделать с ней хотя бы в пределах собственного маленького мира?"
    },

    {
        number: 8,

        title:
            "Что для тебя важно",

        description:
            "Какие ценности тебе точно важны? А от чего могла бы отказаться, если жизнь сильно изменится?"
    },

    {
        number: 9,

        title:
            "Ответственность",

        description:
            "Что для тебя ответственность: бремя, привилегия, необходимость, возможность влиять на что-то или что-то ещё?\n" +
            "Вспомни какую-нибудь ситуацию из своей жизни, которая хорошо это показывает."
    },

    {
        number: 10,

        title:
            "Когда тебя не слышат",

        description:
            "Бывает ли, что с тобой не считаются только из-за возраста? В какие моменты ты это особенно чувствуешь и как обычно реагируешь?"
    },

    {
        number: 11,

        title:
            "Что тебя сформировало",

        description:
            "Назови одну-две книги, фильма, песни, произведения искусства или даже чьи-то слова, которые значительно повлияли на твоё становление как личности."
    },

    {
        number: 12,

        title:
            "Я или Мы",

        description:
            "Что обычно перевешивает, когда твои желания не совпадают с ожиданиями окружающих: собственный выбор или желание соответствовать? Почему?"
    },

    {
        number: 13,

        title:
            "Когда ты почувствовала себя взрослой",

        description:
            "Вспомни одну ситуацию за последний год, когда ты неожиданно поймала себя на мысли: «Я уже не ребёнок».\n" +
            "Что произошло и что ты тогда чувствовала?"
    },

    {
        number: 14,

        title:
            "Что ты можешь изменить",

        description:
            "Какие способы делать что-то полезное для других кажутся тебе действительно важными и реальными? Волонтёрство, творчество, помощь конкретным людям, участие в жизни Школы или что-то другое?"
    },

    {
        number: 15,

        title:
            "Если бы тебя услышали взрослые",

        description:
            "Представь, что у тебя есть пять минут, чтобы обратиться ко всем взрослым вокруг. О чём ты сказала бы в первую очередь? И какой один конкретный шаг попросила бы их сделать?"
    },

    {
        number: 16,

        title:
            "Письмо себе через пять лет",

        description:
            "Что бы ты хотела сказать себе будущей? Какие у тебя сейчас мечты, цели и надежды? Кем ты представляешь себя через пять лет?"
    },

    {
        number: 17,

        title:
            "Пожелания хозяйке анкеты",

        description:
            "Здесь ты можешь оставить своё послание для Джози: может быть, то, что ты сама хотела бы услышать в её возрасте, или просто что-то, что хочется сказать именно ей."
    }

];

/* =========================================================
   STATE
   ========================================================= */

let people = [];

let currentPerson = 0;


/* =========================================================
   DOM
   ========================================================= */

const listView =
    document.getElementById(
        "listView"
    );


const singleView =
    document.getElementById(
        "singleView"
    );


const answersGrid =
    document.getElementById(
        "answersGrid"
    );


const loading =
    document.getElementById(
        "loading"
    );


const errorMessage =
    document.getElementById(
        "errorMessage"
    );


const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );


const answerCount =
    document.getElementById(
        "answerCount"
    );


const retryButton =
    document.getElementById(
        "retryButton"
    );


const backButton =
    document.getElementById(
        "backButton"
    );


const singleName =
    document.getElementById(
        "singleName"
    );


const singleMeta =
    document.getElementById(
        "singleMeta"
    );


const singleAnswers =
    document.getElementById(
        "singleAnswers"
    );


const previousPerson =
    document.getElementById(
        "previousPerson"
    );


const nextPerson =
    document.getElementById(
        "nextPerson"
    );


const personPosition =
    document.getElementById(
        "personPosition"
    );


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
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
   GET ANSWER
   ========================================================= */

function getAnswer(
    person,
    number
) {

    if (
        !person ||
        !person.answers
    ) {

        return "";

    }


    /*
        Поддерживаем как:

        answers[1]

        так и:

        answers["1"]
    */

    return (
        person.answers[number] ??
        person.answers[String(number)] ??
        ""
    );

}


/* =========================================================
   AGE WORD
   ========================================================= */

function getAgeWord(
    age
) {

    const number =
        Number(age);


    if (
        Number.isNaN(number)
    ) {

        return "лет";

    }


    const lastTwo =
        number % 100;


    const lastOne =
        number % 10;


    if (
        lastTwo >= 11 &&
        lastTwo <= 14
    ) {

        return "лет";

    }


    if (
        lastOne === 1
    ) {

        return "год";

    }


    if (
        lastOne >= 2 &&
        lastOne <= 4
    ) {

        return "года";

    }


    return "лет";

}


/* =========================================================
   GET AGE
   ========================================================= */

function getAge(
    person
) {

    const age =
        getAnswer(
            person,
            2
        );


    if (
        age === "" ||
        age === null ||
        age === undefined
    ) {

        return "";

    }


    return `${age} ${getAgeWord(age)}`;

}


/* =========================================================
   TIMESTAMP TO MILLISECONDS
   ========================================================= */

function timestampToMillis(
    timestamp
) {

    if (
        !timestamp
    ) {

        return 0;

    }


    /*
        Firebase Timestamp
    */

    if (
        typeof timestamp.toMillis ===
        "function"
    ) {

        return timestamp.toMillis();

    }


    /*
        JS Date
    */

    if (
        timestamp instanceof Date
    ) {

        return timestamp.getTime();

    }


    /*
        Если вдруг сохранилось
        число
    */

    if (
        typeof timestamp ===
        "number"
    ) {

        return timestamp;

    }


    return 0;

}


/* =========================================================
   FORMAT DATE
   ========================================================= */

function formatDate(
    timestamp
) {

    const milliseconds =
        timestampToMillis(
            timestamp
        );


    if (
        !milliseconds
    ) {

        return "";

    }


    const date =
        new Date(
            milliseconds
        );


    return date.toLocaleDateString(
        "ru-RU",
        {
            day:
                "numeric",

            month:
                "long",

            year:
                "numeric"
        }
    );

}


/* =========================================================
   GET DISPLAY NAME
   ========================================================= */

function getDisplayName(
    data
) {

    /*
        Сначала пробуем отдельное поле
        displayName.
    */

    if (
        data.displayName
    ) {

        return String(
            data.displayName
        );

    }


    /*
        Затем имя из ответа №1.
    */

    if (
        data.answers &&
        data.answers[1]
    ) {

        return String(
            data.answers[1]
        );

    }


    if (
        data.answers &&
        data.answers["1"]
    ) {

        return String(
            data.answers["1"]
        );

    }


    return "Анонимная анкета";

}


/* =========================================================
   CHECK ANSWERS
   ========================================================= */

function hasAnswers(
    answers
) {

    if (
        !answers ||
        typeof answers !==
        "object"
    ) {

        return false;

    }


    return (
        Object.keys(
            answers
        ).length > 0
    );

}


/* =========================================================
   LOAD PEOPLE
   ========================================================= */

async function loadPeople() {

    showLoading();


    try {

        /*
            ВАЖНО:

            Мы НЕ используем where().
            Мы НЕ используем orderBy().

            Поэтому Firestore не требует
            composite index.
        */

        const questionnairesRef =
            collection(
                db,
                "questionnaires"
            );


        const snapshot =
            await getDocs(
                questionnairesRef
            );


        people = [];


        snapshot.forEach(
            documentSnapshot => {

                const data =
                    documentSnapshot.data();


                const answers =
                    data.answers ||
                    {};


                /*
                    Если в документе нет ответов,
                    пропускаем его.
                */

                if (
                    !hasAnswers(
                        answers
                    )
                ) {

                    return;

                }


                people.push({

                    id:
                    documentSnapshot.id,

                    answers:
                    answers,

                    displayName:
                        getDisplayName(
                            data
                        ),

                    completed:
                        data.completed === true,

                    createdAt:
                        data.createdAt ||
                        null,

                    updatedAt:
                        data.updatedAt ||
                        null

                });

            }
        );


        /*
            Сортировка новых анкет
            сверху.

            Если updatedAt нет,
            используем createdAt.
        */

        people.sort(
            (
                a,
                b
            ) => {

                const dateA =
                    timestampToMillis(
                        a.updatedAt
                    ) ||
                    timestampToMillis(
                        a.createdAt
                    );


                const dateB =
                    timestampToMillis(
                        b.updatedAt
                    ) ||
                    timestampToMillis(
                        b.createdAt
                    );


                return (
                    dateB -
                    dateA
                );

            }
        );


        hideLoading();


        renderList();

    } catch (
        error
        ) {

        console.error(
            "Ошибка загрузки анкет:",
            error
        );


        showError();

    }

}


/* =========================================================
   SHOW LOADING
   ========================================================= */

function showLoading() {

    loading.style.display =
        "flex";


    errorMessage.classList.remove(
        "visible"
    );


    emptyMessage.classList.remove(
        "visible"
    );


    answersGrid.innerHTML =
        "";

}


/* =========================================================
   HIDE LOADING
   ========================================================= */

function hideLoading() {

    loading.style.display =
        "none";

}


/* =========================================================
   SHOW ERROR
   ========================================================= */

function showError() {

    loading.style.display =
        "none";


    answersGrid.innerHTML =
        "";


    errorMessage.classList.add(
        "visible"
    );


    answerCount.textContent =
        "";

}


/* =========================================================
   RENDER LIST
   ========================================================= */

function renderList() {

    errorMessage.classList.remove(
        "visible"
    );


    answersGrid.innerHTML =
        "";


    if (
        people.length === 0
    ) {

        emptyMessage.classList.add(
            "visible"
        );


        answerCount.textContent =
            "пока никого";


        return;

    }


    emptyMessage.classList.remove(
        "visible"
    );


    answerCount.textContent =
        `${people.length} ${
            pluralize(
                people.length,
                "анкета",
                "анкеты",
                "анкет"
            )
        }`;


    people.forEach(
        (
            person,
            index
        ) => {

            const card =
                createPersonCard(
                    person,
                    index
                );


            answersGrid.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   CREATE PERSON CARD
   ========================================================= */

function createPersonCard(
    person,
    index
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "person-card";


    const age =
        getAge(
            person
        );


    const date =
        formatDate(
            person.updatedAt
        ) ||
        formatDate(
            person.createdAt
        );


    card.innerHTML = `

        <div class="card-top">

            <div class="card-number">

                #${index + 1}

            </div>


            <div class="card-heart">

                ♥

            </div>

        </div>


        <div class="person-name">

            ${escapeHTML(
        person.displayName
    )}

        </div>


        ${
        age
            ? `
                    <div class="person-age">

                        ${escapeHTML(
                age
            )}

                    </div>
                `
            : ""
    }


        <div class="card-divider"></div>


        <div class="card-bottom">

            <div class="card-date">

                ${
        date
            ? escapeHTML(date)
            : "анкета"
    }

            </div>


            <button
                class="read-button"
                type="button"
            >

                читать →

            </button>

        </div>

    `;


    card.addEventListener(
        "click",
        () => {

            openPerson(
                index
            );

        }
    );


    return card;

}


/* =========================================================
   PLURALIZE
   ========================================================= */

function pluralize(
    number,
    one,
    few,
    many
) {

    const n =
        Math.abs(
            number
        ) % 100;


    const n1 =
        n % 10;


    if (
        n >= 11 &&
        n <= 19
    ) {

        return many;

    }


    if (
        n1 === 1
    ) {

        return one;

    }


    if (
        n1 >= 2 &&
        n1 <= 4
    ) {

        return few;

    }


    return many;

}


/* =========================================================
   OPEN PERSON
   ========================================================= */

function openPerson(
    index
) {

    if (
        index < 0 ||
        index >= people.length
    ) {

        return;

    }


    currentPerson =
        index;


    renderPerson();


    listView.classList.remove(
        "active"
    );


    singleView.classList.add(
        "active"
    );


    window.scrollTo(
        {
            top:
                0,

            behavior:
                "smooth"
        }
    );

}


/* =========================================================
   CLOSE PERSON
   ========================================================= */

function closePerson() {

    singleView.classList.remove(
        "active"
    );


    listView.classList.add(
        "active"
    );


    window.scrollTo(
        {
            top:
                0,

            behavior:
                "smooth"
        }
    );

}


/* =========================================================
   RENDER PERSON
   ========================================================= */

function renderPerson() {

    const person =
        people[
            currentPerson
            ];


    if (
        !person
    ) {

        return;

    }


    /*
        NAME
    */

    singleName.textContent =
        person.displayName;


    /*
        AGE
    */

    const age =
        getAge(
            person
        );


    /*
        DATE
    */

    const date =
        formatDate(
            person.updatedAt
        ) ||
        formatDate(
            person.createdAt
        );


    if (
        age &&
        date
    ) {

        singleMeta.textContent =
            `${age} · заполнено ${date}`;

    } else if (
        age
    ) {

        singleMeta.textContent =
            age;

    } else if (
        date
    ) {

        singleMeta.textContent =
            `заполнено ${date}`;

    } else {

        singleMeta.textContent =
            "";

    }


    /*
        QUESTIONS
    */

    singleAnswers.innerHTML =
        "";


    questions.forEach(
        question => {

            const item =
                createAnswerItem(
                    question,
                    person
                );


            singleAnswers.appendChild(
                item
            );

        }
    );


    /*
        NAVIGATION
    */

    personPosition.textContent =
        `${currentPerson + 1} / ${people.length}`;


    previousPerson.disabled =
        currentPerson === 0;


    nextPerson.disabled =
        currentPerson ===
        people.length - 1;

}


/* =========================================================
   CREATE ANSWER ITEM
   ========================================================= */

function createAnswerItem(
    question,
    person
) {

    const item =
        document.createElement(
            "div"
        );


    item.className =
        "answer-item";


    const value =
        getAnswer(
            person,
            question.number
        );


    const description =
        question.description
            ? `
                <div class="answer-description">

                    ${escapeHTML(
                question.description
            )}

                </div>
            `
            : "";


    let answerHTML;


    if (
        String(
            value
        ).trim()
    ) {

        answerHTML = `

            <div class="answer-text">

                ${escapeHTML(
            value
        )}

            </div>

        `;

    } else {

        answerHTML = `

            <div class="answer-empty">

                ответа нет...

            </div>

        `;

    }


    item.innerHTML = `

        <div class="answer-question">

            <span class="answer-number">

                ${
        String(
            question.number
        ).padStart(
            2,
            "0"
        )
    }.

            </span>


            <span>

                ${escapeHTML(
        question.title
    )}

            </span>

        </div>


        ${description}


        ${answerHTML}

    `;


    return item;

}


/* =========================================================
   PREVIOUS PERSON
   ========================================================= */

function showPreviousPerson() {

    if (
        currentPerson <= 0
    ) {

        return;

    }


    currentPerson--;


    renderPerson();


    window.scrollTo(
        {
            top:
                0,

            behavior:
                "smooth"
        }
    );

}


/* =========================================================
   NEXT PERSON
   ========================================================= */

function showNextPerson() {

    if (
        currentPerson >=
        people.length - 1
    ) {

        return;

    }


    currentPerson++;


    renderPerson();


    window.scrollTo(
        {
            top:
                0,

            behavior:
                "smooth"
        }
    );

}


/* =========================================================
   BUTTONS
   ========================================================= */

if (
    backButton
) {

    backButton.addEventListener(
        "click",
        closePerson
    );

}


if (
    retryButton
) {

    retryButton.addEventListener(
        "click",
        loadPeople
    );

}


if (
    previousPerson
) {

    previousPerson.addEventListener(
        "click",
        showPreviousPerson
    );

}


if (
    nextPerson
) {

    nextPerson.addEventListener(
        "click",
        showNextPerson
    );

}


/* =========================================================
   KEYBOARD
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            !singleView.classList.contains(
                "active"
            )
        ) {

            return;

        }


        /*
            Не реагируем на стрелки,
            если пользователь вдруг
            находится в поле ввода.
        */

        const tag =
            document.activeElement?.tagName;


        if (
            tag === "INPUT" ||
            tag === "TEXTAREA"
        ) {

            return;

        }


        if (
            event.key === "ArrowLeft"
        ) {

            showPreviousPerson();

        }


        if (
            event.key === "ArrowRight"
        ) {

            showNextPerson();

        }


        if (
            event.key === "Escape"
        ) {

            closePerson();

        }

    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

loadPeople();
