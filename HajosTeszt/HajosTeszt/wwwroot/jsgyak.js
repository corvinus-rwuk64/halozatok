var faktoriálisR = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktoriálisR(n - 1);
    }
}

function sorKirakó() {
    let hova = document.getElementById("pascal");
    var sorSzám = document.getElementById("sorSzámTb").value;
    if (sorSzám > 13) {
        alert("Túl nagy a szám (összecsúsznak a háromszögben)");
        return;
    }
    for (var s = 0; s < sorSzám; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);

        for (var o = 0; o <= s; o++) {
            let elem = document.createElement("div");
            elem.innerText = faktoriálisR(s) / (faktoriálisR(o) * faktoriálisR(s - o));
            elem.classList.add("elemek");
            sor.appendChild(elem);
        }
    }
}