document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const footer = document.querySelector('.footer');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;

    startBtn.addEventListener('click', startGame);
    retryBtn.addEventListener('click', resetGame);

    function startGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        renderBoard();
    }

    function resetGame() {
        startGame();
        updateFooter('');
    }

    function renderBoard() {
        board.innerHTML = '';
        for (let i = 0; i < gameBoard.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = gameBoard[i];
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
        }
    }

    function handleCellClick(index) {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            updateFooter(`Player ${currentPlayer} wins!`);
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== '')) {
            updateFooter('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c];
        });
    }

    function updateFooter(message) {
        footer.textContent = message;
    }

    // Initial setup
    startGame();
});
