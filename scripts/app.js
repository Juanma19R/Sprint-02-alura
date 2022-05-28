let startGameBtn = document.querySelector("#startGame");
let addWordBtn = document.querySelector("#addWord");
let inputWord = document.querySelector("#inputWord");
let btnCancel = document.querySelector("#cancelWord");
let btnSave = document.querySelector("#saveWord");
let board = document.querySelector("#boardHangman");
let brush = board.getContext("2d");
let infoText = document.querySelector("#info");
let secretWord = "";
let wordsInGame = ["SEPTIMO", "MESSI", "MERENGUE", "EUROPA", "ZORRO", "AGUA", "NORTE", "MARTE", "SECRETO", "ANIME", "JUEVES", "BAR", "PAPEL", "BARCO"];
let wrongs = 0;
let wrongLetters = [];
let guessLetters = [];
let gameOn = true;
let boardCenterX = board.width/2;
let startLetterLine = [];
const letterWidth = 25;
const spaceBetweenLetters = 5;

cleanWindow;

startGameBtn.addEventListener("click", startGame);
addWordBtn.addEventListener("click", showInputNewWord);
btnCancel.classList.add("hide");
btnCancel.addEventListener("click", cancel);
btnSave.classList.add("hide");
btnSave.addEventListener("click", addSecretWord);
infoText.classList.add("hide");

function cancel() {
    cleanWindow();
    inputWord.classList.add("hide");
    board.classList.add("hide");
    btnSave.classList.add("hide");
    startGameBtn.classList.remove("hide");
    startGameBtn.innerHTML = "Iniciar Juego"
    btnCancel.classList.add("hide");
    addWordBtn.classList.remove("hide");
    infoText.classList.add("hide");
    window.removeEventListener("keypress", keyPress);
    inputWord.value = "";
}

function startGame() {
    cleanWindow();
    board.classList.remove("hide");
    inputWord.classList.add("hide");
    btnCancel.classList.remove("hide");
    addWordBtn.classList.add("hide");
    btnSave.classList.add("hide");
    startGameBtn.classList.remove("hide");
    startGameBtn.innerHTML = "Reiniciar juego";
    window.addEventListener("keypress", keyPress);
    selectWord();
}

function selectWord() {
    secretWord = wordsInGame[Math.round(Math.random()*(wordsInGame.length-1))];
    gameOn = true;
    drawScripts(secretWord);
}

function drawScripts() {
    cleanWindow();
    if (gameOn) {
        brush.beginPath();
        brush.lineWidth = 2;
        brush.strokeStyle = "red";
        brush.moveTo(0, 405);
        for (position = 0; position <= secretWord.length; position++) {
            startLetterLine[position] = (letterWidth*position);
            brush.lineTo(startLetterLine[position], 405);
            brush.stroke();
            brush.moveTo(startLetterLine[position] + spaceBetweenLetters, 405);
        }
    } else if (!secretWord == "") {
        gameOn = true;
        drawScripts();
    }
}

function showInputNewWord() {
    inputWord.classList.remove("hide");
    inputWord.focus();
    board.classList.add("hide");
    addWordBtn.classList.add("hide");
    startGameBtn.classList.add("hide");
    btnCancel.classList.remove("hide");
    btnSave.classList.remove("hide");
    infoText.classList.remove("hide");
}

function addSecretWord() {
    cleanWindow();
    newWord = inputWord.value;
    if (newWord == "") {
        alert("No ingresó ninguna palabra, vuelva a intentar.")
        inputWord.focus();
        return;
        gameOn = false;
    } else if (newWord.length > 8) {
        alert("El máximo permitido son 8 letras.");
        inputWord.value = "";
        inputWord.focus();
        gameOn = false;
        return;
    } else {
        for (position = 0; position < newWord.length; position++) {
            if (newWord[position].charCodeAt() < 65 || newWord[position].charCodeAt() > 90) {       
                alert("La palabra contiene caracteres no válidos, vuelva a intentar.");
                inputWord.value = "";
                inputWord.focus();
                gameOn = false;
                return;
            } else {
                gameOn = true;
            } 
        }
    }
    if (gameOn) {
        let repeat = false;
        for (let position = 0; position < wordsInGame.length; position++) {
            if (newWord == wordsInGame[position]){
                alert("La palabra '" + newWord + "' ya fue elegida");
                repeat = true;
                break;
            }
        }
            if (repeat == false) {
                wordsInGame.push(newWord);
            }
    }    
    inputWord.value="";
    startGame();
}

function keyPress(e) {
    let key = String.fromCharCode(e.keyCode).toUpperCase();
    let expression = new RegExp(key,"i");
    if (gameOn) {
        finishGame = false;
        if ((key.charCodeAt() == 13) || (key.charCodeAt() == 32)) {
            e.preventDefault();
            return;
        }
        if (key.charCodeAt() < 65 || key.charCodeAt() > 90) {
            alert("No está permitida tecla presionada. (" + key + ").");
            return;
        }
        if (expression.test(secretWord)) {
            let repeat = false;
            for (let position = 0; position < guessLetters.length; position++) {
                if (key == guessLetters[position]) {
                    alert("La letra " + key + " ya fue elegida");
                    repeat = true;
                    break;
                }
            }
            if (repeat == false) {
                for (position = 0; position < secretWord.length; position++) {
                    if (key == secretWord[position]) {
                        guessLetters.push(key);
                        brush.font="22px Inter";
                        brush.fillStyle="green";
                        brush.fillText(key, (startLetterLine[position]+(spaceBetweenLetters*1.5)), 400);
                        if (guessLetters.length == secretWord.length) {
                            brush.font="26px Inter";
                            brush.fillStyle="blue";
                            brush.textAlign = "center";
                            brush.fillText("GANASTE !", boardCenterX, 26);
                            gameOn = false;
                            finishGame = true;
                            return; 
                        }
                    }
                }
            }       
        } else {
            if (wrongs < 11 ) {
                let repeat = false;
                for (let position = 0; position < wrongLetters.length; position++) {
                    if (key == wrongLetters[position]) {
                        alert("La letra " + key + " ya fue elegida");
                        repeat = true;
                        break;
                    }
                }
                if (repeat == false) {
                    wrongLetters.push(key);
                    wrongs++;
                    brush.font="18px Inter";
                    brush.fillStyle="black";
                    brush.fillText(key, 23*wrongs, 440);
                }    
                if (wrongs == 1) {
                    drawLines(250, 350, 100, 350);                    
                }
                if (wrongs == 2) {
                    drawLines(100, 350, 100, 75);
                }
                if (wrongs == 3) {
                    drawLines(100, 75, 200, 75);
                }
                if (wrongs == 4) {
                    drawLines(200, 75, 200, 125);
                }
                if (wrongs == 5) {
                    drawLines(222, 147, 200, 147, 22);
                }
                if (wrongs == 6) {
                    drawLines(200, 169, 200, 280);
                }
                if (wrongs == 7) {
                    drawLines(200, 280, 225, 320);
                }
                if (wrongs == 8) {
                    drawLines(200, 280, 175, 320);                    
                }
                if (wrongs == 9) {
                    drawLines(200, 180, 225, 220);
                }
                if (wrongs == 10) {
                    drawLines(200, 180, 175, 220);
                }
                if (wrongs == 11) {
                    drawFace();
                    brush.font="1,5em Inter";
                    brush.textAlign="center";
                    brush.textBaseline="middle";
                    brush.fillStyle="blue";
                    brush.fillText("Perdiste. La palabra era: ", boardCenterX, 30);
                    showSecretWord();
                    gameOn = false;
                    gameOn = true;
                    return;
                }
                }
            }    
    } else {
        if (finishGame) {
            alert("Juego finalizado. Inicie un nuevo juego.");
        }
        return;
    }
}

function showSecretWord() {
    brush.font="1,5em Inter";
    brush.fillStyle="blue";
    brush.fillText(secretWord, boardCenterX, 50);
}

function drawLines(pointStartX, pointStartY, x, y) {
    brush.beginPath();
    brush.strokeStyle = "black";
    brush.moveTo(pointStartX, pointStartY); 
    brush.lineTo(x, y);
    brush.stroke();  
}

function drawCircle(pointStartX, pointStartY, x, y, radio) {
    brush.beginPath();
    brush.strokeStyle = "black";
    brush.moveTo(pointStartX, pointStartY); 
    brush.arc(x, y, radio, 0, 2*Math.PI);
    brush.stroke(); 
}

function drawFace() {
    drawLines(175, 173, 225, 173); //SOGA
    drawLines(185, 135, 195, 145); //LINEA 1 OJO IZQUIERDO
    drawLines(195, 135, 185, 145); //LINEA 2 OJO IZQUIERDO
    drawLines(215, 135, 205, 145); //LINEA 1 OJO DERECHO
    drawLines(205, 135, 215, 145); //LINEA 2 OJO DERECHO
    drawCircle(204, 155, 200, 155, 4); //BOCA
}

function cleanWindow() {
    brush.fillStyle = "#D8DFE8";
    brush.fillRect(0, 0, 400, 460);
    guessLetters.length = 0;
    wrongLetters.length = 0;
    startLetterLine.length = 0;
    secretWord;
    wrongs = 0;
}