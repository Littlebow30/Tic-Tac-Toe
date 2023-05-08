const cells = document.getElementsByClassName("cell");
const gameStatus = document.querySelector(".gameStatus")
const player1 = "X";
const player2 = "O"; 
let currentPlayer = player1;
const winningBoard = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const restartButton = document.querySelector(".restartButton");

let gameState = ["","","","","","","","",""];

let gameRunning = false;

function startGame(){
    
    for (let i=0; i<cells.length; i++){
        cells[i].addEventListener("click", cellPicked);
    }
    restartButton.addEventListener("click", restartGame);
    gameRunning = true;
}

function cellPicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if (gameState[cellIndex] != "" || gameRunning == false) {
        return;
    }

    updateboard(this, cellIndex);
    checkWinner();
}

function updateboard(cell, index){
    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function restartGame (){
        let gameState = ["","","","","","","","",""];
        let currentPlayer = player1;
        gameStatus.textContent = "New Game! Player 1, You're turn.";
        const cellIndex = this.getAttribute("cellIndex");
        location.reload();
}

function switchPlayer () {

    if (currentPlayer == player1) {
        currentPlayer = player2;
        gameStatus.textContent = "Player 2 turn."
    }
    else if (currentPlayer == player2) {
        currentPlayer = player1;
        gameStatus.textContent = "Player 1 turn."
    }
}

function checkWinner (){
    let youWin = false;

    for (let i=0; i < winningBoard.length; i++) {
        const board = winningBoard[i];
        const cellA = gameState[board[0]];
        const cellB = gameState[board[1]];
        const cellC = gameState[board[2]];

        if (cellA == "" || cellB == "" || cellC == ""){
            continue;}

        if (cellA == cellB && cellB == cellC) {
            youWin = true;
            break;}
        }
    if (youWin){
        gameStatus.textContent = "Congratulations!!! You Win!!!";
        gameRunning = false;}
    
    else if (!gameState.includes("")){
        gameStatus.textContent = "Draw!!!"
        gameRunning = false
    }
    else {
        switchPlayer();
    }


}

// function resetGame(){
//     document.querySelector("cell").value="";
// }


startGame()