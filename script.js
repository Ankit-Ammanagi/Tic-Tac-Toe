//Getting all dom elements
const squareOne = document.getElementById("grid_square_1");
const squareTwo = document.getElementById("grid_square_2");
const squareThree = document.getElementById("grid_square_3");
const squareFour = document.getElementById("grid_square_4");
const squareFive = document.getElementById("grid_square_5");
const squareSix = document.getElementById("grid_square_6");
const squareSeven = document.getElementById("grid_square_7");
const squareEight = document.getElementById("grid_square_8");
const squareNine = document.getElementById("grid_square_9");
const allSquares = document.querySelectorAll(".grid_square");

const infoText = document.getElementById("instructions_text");
const startGameBtn = document.getElementById("instructions_btn");

const playerOneScore = document.getElementById("info_player_score1");
const playerTwoScore = document.getElementById("info_player_score2");

const model = document.getElementById("model");

//Initializing values , name and win score

const players = {
    playerOne: {
        name: "Player 1",
        wins: 0
    },
    playerTwo: {
        name: "Player 2",
        wins: 0
    }
}

//Initializing changing variables

let move = 1;
let nextPlayer = players.playerOne.name;
let pastPlayer;
let currentImage = "cross"
let playerHasWon = false;

function addSquareClick() {
    allSquares.forEach((square) => {
        square.addEventListener('click', squareClick);
    });
}

function removeSquareClick() {
    allSquares.forEach((square) => {
        square.removeEventListener('click', squareClick);
    });
}

function squareClick() {
    if (!this.classList.contains('cross') && !this.classList.contains('circle')) {
        this.classList.add(`${currentImage}`);
        incrementMove()
    }
}

function incrementMove() {
    move++;
    pastPlayer = nextPlayer;
    if (move % 2 !== 0) {
        currentImage = 'cross';
        nextPlayer = players.playerOne.name;
    } else {
        currentImage = 'circle';
        nextPlayer = players.playerTwo.name;
    }
    infoText.textContent = `${nextPlayer}'s turn`;
    checkForWin();
    checkForTie();
}

function checkForWin() {
    const lines = [
        [squareOne, squareTwo, squareThree],
        [squareFour, squareFive, squareSix],
        [squareSeven, squareEight, squareNine],
        [squareOne, squareFour, squareSeven],
        [squareTwo, squareFive, squareEight],
        [squareThree, squareSix, squareNine],
        [squareOne, squareFive, squareNine],
        [squareThree, squareFive, squareSeven],
    ]

    for (const line of lines) {
        const findImg = (currentImage === 'cross') ? 'circle' : 'cross';
        const hasWon = line.every((square) => square.classList.contains(`${findImg}`));

        if (hasWon) {
            const winner = (findImg === 'cross') ? players.playerOne : players.playerTwo;
            winner.wins++;
            updateScore();
            playerWon();
            return;
        }
    }
}

function updateScore() {
    playerOneScore.textContent = players.playerOne.wins;
    playerTwoScore.textContent = players.playerTwo.wins;
}

function playerWon() {
    infoText.textContent = `${pastPlayer} won!`;
    console.log(pastPlayer)
    playerHasWon = true;
    continueGame();
}

function checkForTie() {
    const squares = [
        squareOne,
        squareTwo,
        squareThree,
        squareFour,
        squareFive,
        squareSix,
        squareSeven,
        squareEight,
        squareNine,
    ];

    const allSquaresFilled = squares.every((square) => {
        return (
            square.classList.contains("cross") || square.classList.contains("circle")
        );
    });

    if (allSquaresFilled && !playerHasWon) {
        infoText.textContent = "It's a tie!";
        continueGame();
    }
}

function continueGame() {
    removeSquareClick()
    setTimeout(() => {
        reset();
    }, 2000);
}

function restartGame() {
    removeSquareClick();
    reset()
}

function reset() {
    allSquares.forEach((square) => {
        square.classList = "grid_square";
    });
    addSquareClick();
    playerHasWon = false;
    infoText.textContent = `${nextPlayer}'s turn`
}

function startGame() {
    startGameBtn.addEventListener('click', () => {
        model.style.display = 'flex';
    })

    document.querySelector("form").addEventListener('submit', (event) => {
        event.preventDefault();

        const player1 = document.getElementById("player1").value.trim().toLowerCase();
        const player2 = document.getElementById("player2").value.trim().toLowerCase();
        const playerOneFormat = player1.charAt(0).toUpperCase() + player1.slice(1);
        const playerTwoFormat = player2.charAt(0).toUpperCase() + player2.slice(1);

        document.getElementById("info_player_name1").textContent = playerOneFormat;
        document.getElementById("info_player_name2").textContent = playerTwoFormat;

        nextPlayer = playerOneFormat;
        players.playerOne.name = playerOneFormat;
        players.playerTwo.name = playerTwoFormat;

        players.playerOne.wins = 0;
        players.playerTwo.wins = 0;
        updateScore();

        infoText.textContent = `${pastPlayer}'s turn`;
        model.style.display = "none";

        startGameBtn.textContent = "Restart Game";
        addSquareClick();
        restartGame();
    })
}

startGame();