var léptetés = 0;

fetch('questions/4')
    .then(response => response.json())
    .then(data => console.log(data));

function kérdésMegjelenítés(kérdés) {

    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText

    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz1").classList.add("rossz")
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz2").classList.add("rossz")
    document.getElementById("válasz3").innerText = kérdés.answer3
    document.getElementById("válasz3").classList.add("rossz")

    document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó");
    document.getElementById("válasz" + kérdés.correctAnswer).classList.remove("rossz");

    document.getElementById("kép").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
}

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        }).then(data => kérdésMegjelenítés(data));
}

function következőKérdés() {
    léptetés++;
    kérdésBetöltés(léptetés);
}

function előzőKérdés() {
    léptetés--;
    kérdésBetöltés(léptetés);
}