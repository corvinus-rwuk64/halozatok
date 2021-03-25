var kérdések;
var léptetés = 0;
window.onload(letöltés());
function letöltés() {
    fetch('/questions.json')
        .then(r => r.json())
        .then(d => letöltésBefejeződött(d)
        );
}
function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(0);
}
function kérdésMegjelenítés(kérdés) {

    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdés].questionText;

    document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    document.getElementById("válasz1").classList.add("rossz");
    document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    document.getElementById("válasz2").classList.add("rossz");
    document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    document.getElementById("válasz3").classList.add("rossz");

    document.getElementById("válasz" + kérdések[kérdés].correctAnswer).classList.add("jó");
    document.getElementById("válasz" + kérdések[kérdés].correctAnswer).classList.remove("rossz");

    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
}
function következőKérdésMegjelenítés() {

    léptetés++;
    if (léptetés == 3) { léptetés = 0 }
    kérdés = léptetés;
    
    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdés].questionText;

    document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    document.getElementById("válasz1").classList.add("rossz");
    document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    document.getElementById("válasz2").classList.add("rossz");
    document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    document.getElementById("válasz3").classList.add("rossz");

    document.getElementById("válasz" + kérdések[kérdés].correctAnswer).classList.add("jó");
    document.getElementById("válasz" + kérdések[kérdés].correctAnswer).classList.remove("rossz");

    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
}
function előzőKérdésMegjelenítés() {

    léptetés--;
    if (léptetés == -1) { léptetés = 2 }
    kérdés = léptetés;

    document.getElementById("kérdés_szöveg").innerHTML = kérdések[kérdés].questionText;

    document.getElementById("válasz1").innerHTML = kérdések[kérdés].answer1;
    document.getElementById("válasz1").classList.add("rossz");
    document.getElementById("válasz2").innerHTML = kérdések[kérdés].answer2;
    document.getElementById("válasz2").classList.add("rossz");
    document.getElementById("válasz3").innerHTML = kérdések[kérdés].answer3;
    document.getElementById("válasz3").classList.add("rossz");

    document.getElementById("válasz" + kérdések[kérdés].correctAnswer).classList.add("jó");
    document.getElementById("válasz" + kérdések[kérdés].correctAnswer).classList.remove("rossz");

    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[kérdés].image;
}

