// JavaScript Document
$(document).ready(function() {

    var boxSize = 3,
        boxes = [],
        o_win = 0,
        x_win = 0,
        count = 0,
        plusSign = "+",
        turn = "",
        score,
        moves,
        board,
        row,
        cell;

function init() {
    board = document.createElement('ul');
    board.classList.add('row'); 

    var indicator = 1;
    for (var i = 0; i < boxSize; i++) {
        row = document.createElement('li');
        board.appendChild(row);
        for (var j = 0; j < boxSize; j++) {
            cell = document.createElement('li');
           // cell.classList.add('btn','span1'); 
            cell.classList.add('col' + j,'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == boxSize - i - 1) {
                cell.classList.add('diagonal1');
            }
            cell.indicator = indicator;
            cell.addEventListener("click", startGame);
            row.appendChild(cell);
            boxes.push(cell);
            indicator += indicator;
        }
    }
    document.getElementById("game").appendChild(board);
    newGame();
}

function newGame() { 
    score = {"X": 0, "O": 0};
    moves = 0;
    turn = "O";
    board.removeAttribute('disabled');
    $("#game li>li").removeAttr("style");
    boxes.forEach(function (square) {
        square.innerHTML = plusSign;
    });
}

function startGame() {
    checkClick();
    if (this.innerHTML !== plusSign) {
        alert('Already selected');
        return;
    }
    this.innerHTML = turn;
    if (turn == "O"){
       this.setAttribute("style", "background-color: #0044cc; color: #FFF; font-family:Georgia, 'Times New Roman', Times, serif");
    }
    else{
        this.setAttribute("style", "background-color: #2f96b4; color: #FFF; font-family:Georgia, 'Times New Roman', Times, serif");
    }
    moves += 1;
    score[turn] += this.indicator;
    if (winner(this)) {
        count = 0;
        if (turn == "O"){
            o_win++;
            $('#o_win').text(o_win);
        }
        else{
            x_win++;
            $('#x_win').text(x_win);
        }
        alert(turn + ' wins');
        lockall();
    }
    else if (moves === 9) { //boxSize * boxSize
        alert('Its a tie. It will restart.');
        newGame();
    } else {
        turn = turn === "X" ? "O" : "X";
    }
}

function checkClick(){
    if (board.hasAttribute('disabled')){
        alert(turn + ' has won the game. Start a new game');
        newGame();
        boxes.reset();
    } 
}

function lockall(){
    board.setAttribute('disabled','disabled'); 
 };

document.getElementById('reset').addEventListener('click', newGame);

function winner(clicked) {
    checkClick();
    var memberOf = clicked.className.split(/\s+/);
    for (var i = 0; i < memberOf.length; i++) {
        var testClass = '.' + memberOf[i];
    var items = filterContains('#game ' + testClass, turn);
        if (items.length == boxSize) {
            return true;
        }
    }
    return false;
}

function filterContains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return [].filter.call(elements, function(element){
      return RegExp(text).test(element.textContent);
    });
  }

init();
});