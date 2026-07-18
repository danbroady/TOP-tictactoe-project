
// Gameboard IIFE
const gameboard = (function() {
    let board = ["","","","","","","","",""];
    const getBoard = () => board;

    const resetBoard = () => {
        board = ["","","","","","","","",""];
    }

    const takeTurn = (index, type) => {
        if (board[index] === "") {
            board[index] = type;
            return true;
        }
        return false
    };

    const isBoardFull = () => !board.includes("");

    return {getBoard, resetBoard, takeTurn, isBoardFull};
})();


// Game Logic IIFE

const game = (function(){
    const player = function(name, type) {
        return {name, type};
    };

    const playerOne = player("Player 1", "X"); // Change to player input
    let p2Marker;
    if (playerOne.type=="X") {
        p2Marker = "O"
    } else {
        p2Marker = "X"
    };
    const playerTwo = player("Player 2", p2Marker); // Change to player input

    let currentPlayer = playerOne;
    let gameOver = false;
    let gameDraw = false;

    const play = (index) => {
        if (gameOver || gameDraw) return;
        const isValid = gameboard.takeTurn(index, currentPlayer.type);
        if (isValid) {
            if (checkWin()) {
                gameOver = true;
                return;
            }
            if (gameboard.isBoardFull()) {
                gameDraw = true;
                return;
            }
            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        }
    };

    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Row wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Col wins
        [0, 4, 8], [2, 4, 6]             // Diag wins
    ];
    const checkWin = () => {
        const currentBoard = gameboard.getBoard();
        return winCombos.some((combo) => {
            return combo.every(index => currentBoard[index] === currentPlayer.type)
        });
    };

    const resetLogic = () => {
        gameOver = false;
        gameDraw = false;
        currentPlayer = playerOne;
    }

    return {
        play, resetLogic,
        getCurrentPlayer: () => currentPlayer,
        isGameOver: () => gameOver,
        isGameDraw: () => gameDraw
    };
})();