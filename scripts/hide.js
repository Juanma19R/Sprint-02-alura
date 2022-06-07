var game = document.querySelector("#start");
game.addEventListener("click", function () {
    hide_tag("game");
});
var addWordMenu = document.querySelector("#addWord");
addWordMenu.addEventListener("click", function () {
    hide_tag("addWordMenu__container");
});

game = document.querySelector("#newGame");
game.addEventListener("click", function () {
    hide_tag("game");
});

var start = document.querySelector("#desist");
start.addEventListener("click", function () {
    hide_tag("start");
});

start = document.querySelector("#right");
start.addEventListener("click", function () {
    hide_tag("start");
});

function hide_tag(option) {
    if (option == "game") {
        hideBox("none","block","none");
        clean();
        start_canvas();
        activate_key();
    } else if (option == "addWordMenu__container") {
        hideBox("block","none","none");
        clean();
    } else {
        hideBox("none","none","block");
        clean();
    }
}

function hideBox(value_menu, value_game, value_start){
    document.getElementById("addWordMenu__container").style.display = value_menu;
    document.getElementById("activateGame__container").style.display = value_game;
    document.getElementById("menu__container").style.display = value_start;
}

var validate_text = document.querySelector("#text");
validate_text.setAttribute("maxLength", 8)
validate_text.addEventListener("input", function (event) {
    this.value = capital_letters(event.target.value);
});

function capital_letters(text) {
    text = text.toUpperCase();
    if (text.length != 9) {
        let valid = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        let text1 = ""
        for (let i of text) {
            text1 += (valid.includes(i)) ? i : "";
        }
        return text1;
    } else {
        return text.substring(0, text.length - 1);
    }
}