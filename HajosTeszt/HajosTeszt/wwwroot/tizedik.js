var hotList = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

document.addEventListener("DOMContentLoaded", init)

function init() {
    for (let i = 0; i < questionsInHotList; i++) {

        let q = {
            question: {},
            goodAnswers: 0,
        }

        hotList[i] = q;
    }

    fetch("questions/count")
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) });

    document.getElementById("előre_gomb").addEventListener("click", előre);
    document.getElementById("hátra_gomb").addEventListener("click", hátra);

    localStorage.getItem("hotList");
    localStorage.getItem("displayedQuestion");
    localStorage.getItem("nextQuestion");

    if (localStorage.getItem("hotList")) {
        hotList = JSON.Parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        hotList = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        hotList = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (hotList.length === 0) {
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        kérdésMegjelenítés();
        console.log("A localStorage-ból kiolvasott kérdésekkel dolgozunk");
    }
        
}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`questions/${questionNumber}`)
        .then(x => {
            if (!x.ok) {
                console.error(`Hibás letöltés: ${x.status}`);
                return null;
            }
            return x.json();
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltésre került a hotList ${destination}. helyére`);
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;

    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;

    if (kérdés.image) {
        document.getElementById("kép").src = kérdés.image;
        document.getElementById("kép").style.display = "block";
    }
    else {
        document.getElementById("kép").style.display = "none";
    }

    for (var i = 1; i < 4; i++) document.getElementById("válasz" + i).classList.remove("jó", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";
}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function hátra() {
    displayedQuestion--;
    if (displayedQuestion < 0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;

    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    else {
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó");
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById("válaszok").style.pointerEvents = "none";

    timerHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", JSON.stringify(displayedQuestion));
    localStorage.setItem("nextQuestion", JSON.stringify(nextQuestion));
}