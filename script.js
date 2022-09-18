console.log("Welcome to Tic Tac Toe Game.");

let bmusic = new Audio("bgmusice.mp3");
let nextTurn = new Audio("fillValueClick.wav");
let gameOver = new Audio("gameOver.wav");
let resetBtn = document.getElementById('reset');
let turn = "X";
let isGameOver = false;

// function to change the turn.
function turnChange() {
    return turn === "X" ? "O" : "X";
}

//function to check who will win.
function winCheck() {
    let boxtext = document.getElementsByClassName('text-box');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== '')) {
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isGameOver = true;
            document.querySelector('.line').style.width = `20vw`;
            document.querySelector('.line').style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            setTimeout(function() {
                bmusic.pause();
                bmusic.currentTime = 0;
                document.querySelector(".img-box").getElementsByTagName('img')[0].style.width = "150px";
                gameOver.play();
            }, 800);
        }
    });
}


// Game Main Logice
bmusic.play();
let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.text-box');
    element.addEventListener('click', () => {
        if (boxtext.innerText == '' && isGameOver == false) {
            boxtext.innerText = turn;
            nextTurn.play();
            turn = turnChange();
            winCheck();
            if (!isGameOver) {
                document.getElementsByClassName('info')[0].innerText = `Turn For ${turn}`;
            }
        }
    })
});

// add onclick listner to reset button
resetBtn.addEventListener('click', () => {
    let boxtext = document.querySelectorAll('.text-box');
    Array.from(boxtext).forEach(element => {
        element.innerText = '';
    })
    turn = 'X';
    isGameOver = false;
    document.getElementsByClassName('info')[0].innerText = `Turn For ${turn}`;
    document.querySelector(".img-box").getElementsByTagName('img')[0].style.width = "0px";
    document.querySelector('.line').style.width = `0vw`;
    document.querySelector('.line').style.transform = `translate(0vw, 0vw) rotate(0deg)`;
    bmusic.play();
});