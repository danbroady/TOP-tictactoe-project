// Gameboard IIFE
const gameboard = (function() {
    // Setup board
    let board = ["","","","","","","","",""];
    const getBoard = () => board; // Method: return current state

    const resetBoard = () => { // Method: reset board state
        board = ["","","","","","","","",""];
    }

    // Method: input position, place marker if space is empty
    const takeTurn = (index, type) => {
        if (board[index] === "") {
            board[index] = type;
            return true; // Returns bool for whether move was legal/successful
        }
        return false
    };

    const isBoardFull = () => !board.includes(""); // Method: check if board is full (to determine draw)

    return {getBoard, resetBoard, takeTurn, isBoardFull}; // Return gameboard object
})();


// Game Logic IIFE
const game = (function(){
    // Method: create player with name & marker type (X/O)
    const player = function(name, type) {
        return {name, type};
    };

    // Create players & assign marker types
    const playerOne = player("Player 1", "X");
    const playerTwo = player("Player 2", "O");

    // Initial game state properties:
    let currentPlayer = playerOne;
    let gameOver = false;
    let gameDraw = false;

    // Method: take gameboard index input & play
    const play = (index) => {
        if (gameOver || gameDraw) return; // Check whether game is already over/drawn
        const isValid = gameboard.takeTurn(index, currentPlayer.type); // Returns bool
        if (isValid) {
            if (checkWin()) { // Check if move results in win
                gameOver = true;
                return;
            }
            if (gameboard.isBoardFull()) { // Check if move results in draw
                gameDraw = true;
                return;
            }
            // Otherwise, move is already taken & current player property is swapped
            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        }
    };
    // All array winning combinations
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Row wins
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Col wins
        [0, 4, 8], [2, 4, 6]             // Diag wins
    ];
    // Method: check whether current board state is a win for the current player & return the 
    const checkWin = () => {
        const currentBoard = gameboard.getBoard();
        // 1. Run thru all 8 winning combinations set out above
        return winCombos.some((combo) => { // (Stops & returns 'true' when the inside function returns true)
            // 2. For each single combination (e.g. [0,1,2]), check if ALL 3 positions match currentPlayer.type (X/O)
            return combo.every(index => currentBoard[index] === currentPlayer.type) // (Stops & returns true when all 3 indices return true)
        });
    };

    // Method: reset game state properties to default
    const resetLogic = () => {
        gameOver = false;
        gameDraw = false;
        currentPlayer = playerOne;
    }

    // Return game logic object
    return {
        play, resetLogic,
        getCurrentPlayer: () => currentPlayer, // Method: return the current player for the turn
        isGameOver: () => gameOver, // Method: return whether the game is over
        isGameDraw: () => gameDraw // Method: return whether the game is a draw
    };
})();


// Display controller IIFE
const displayController = (function() {


    // Query selectors




    // Render JS state to HTML



    // Event listeners


    // Form




})();