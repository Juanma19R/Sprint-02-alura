const words = ["SEPTIMO", "MESSI", "MERENGUE", "EUROPA", "ZORRO", "AGUA", "NORTE", "MARTE", "SECRETO", "ANIME", "JUEVES", "BAR", "PAPEL", "BARCO"];
var letters = {};
var random = Math.round(Math.random() * (words.length - 1));
let length = words[random].length;
var word = words[random];
let lose = 10;

let screen = document.querySelector("canvas");
let brush = screen.getContext("2d");

letters = createElement(letters, word);

var save_start = document.querySelector("#left");
save_start.addEventListener("click", function () {
    var text = document.getElementById("text").value;
    words.push(text);
    activate_key();
    hide_tag("game");
});

function activate_key() {
    random = Math.round(Math.random() * (words.length - 1));
    length = words[random].length;
    word = words[random];
    count = 2;
    letters = createElement(letters, word);
    start_canvas();
    var end_game = false;
    document.onkeyup = function(event){
        let charCode = event.keyCode;
        var check =
        (charCode > 64 && charCode < 91) || charCode == 192 ? true : false;
        if (!end_game) {
        if (check) {
            let key = event.key.toUpperCase();
            if (length >= 1) {
            if (Object.values(letters).includes(key)) {
                for (let i = 0; i < Object.values(letters).length; i++) {
                if (key == Object.values(letters)[i]) {
                    let matriz = document.getElementById(Object.keys(letters)[i]);
                    if (matriz.style.visibility == "visible") {
                    continue;
                    }
                    matriz.style.visibility = "visible";
                    length--;
                    if (length == 0) {
                    game_finalized(true);
                    end_game = true;
                    }
                }
                }
            } else {
                text = document.getElementById("wrongText");
                if (!text.innerHTML.includes(key) && count < lose + 1) {
                text.innerHTML += event.key.toUpperCase();
                creating_canvas(count);
                count++;
                if (count - 1 == lose) {
                    game_finalized(false);
                    end_game = true;
                }
                }
            }
            }
        }
        }
    }
}

function game_finalized(winner) {
    var message = document.getElementById("message");
    var fact = document.createElement("h2");
    fact.setAttribute("id", "message");
    if (winner) {
        fact.textContent = "Ganaste, felicidades!";
        fact.style.color = "green";
    } else {
        fact.textContent = "Fin del juego!";
        fact.style.color = "red";
    }
    message.appendChild(fact);
}

function createElement(letters, word) {
    letters = {};
    var value = document.querySelectorAll("#secretWord");
    for (var i = 0; i < value.length; i++) {
        value[i].innerHTML = "";
    }
    for (let i = 0; i < word.length; i++) {
        var div1 = document.getElementById("secretWord");
        var div = document.createElement("div");
        var h1 = document.createElement("h1");
        h1.setAttribute("id", "validText" + i);
        h1.setAttribute("class", "validText");
        h1.style.visibility = "hidden";
        letters["validText" + i] = word[i];
        h1.innerHTML = word[i];
        div.appendChild(h1);
        div1.appendChild(div);
    }
    return letters;
}