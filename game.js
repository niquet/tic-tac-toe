function Game() {

    // initialize 2D-Array as the board instance used for evaluation
    // of the current game
    this.board = [];
    for (let i = 0; i < 3; i++) {
        this.board[i] = [0, 0, 0];
    }

    // current player, 0 when game hasn't started yet
    // 1 equals player of "o" figure
    // 2 equals player of "x" figure
    this.current_player = 0;

    // game started, boolean
    this.hasGameStarted = false;
    this.hasGameFinished = false;

    this.setStartingPlayer = (e) => {
        if (!this.hasGameStarted) {
            e.classList.add('active');
            this.hasGameStarted = true;
        }
        if (e.id == 'times') {
            this.current_player = 2;
        } else {
            this.current_player = 1;
        }
    }

    this.setFigure = (e) => {

        if (this.hasGameFinished)
            return false; //don't continue game, after it is finished

        //when user clicks on board without selecting X or O first
        if (!this.hasGameStarted) {
            this.setStartingPlayer(document.getElementById("times")); //default starting player: X
        }

        let row = e.getAttribute('row');
        let col = e.getAttribute('column');

        if (this.board[row][col] != 0) {
            return false;
        }

        let class_string, next_player;
        if (this.current_player === 1) {
            class_string = 'fa fa-circle-o';
            next_player = 2;
            document.getElementById("times").classList.add('active');
            document.getElementById("circle").classList.remove('active');
        } else {
            class_string = 'fa fa-times';
            next_player = 1;
            document.getElementById("circle").classList.add('active');
            document.getElementById("times").classList.remove('active');
        }
        let figure = document.createElement('i');
        figure.classList = [class_string];
        figure.setAttribute('aria-hidden', true);
        e.appendChild(figure);

        this.board[row][col] = this.current_player;

        if (this.isFinished(this.current_player)) {
            if (this.current_player === 1) {
                document.getElementById("circle").classList.add('winner');
                document.getElementById("times").classList.remove('active');
            } else {
                document.getElementById("times").classList.add('winner');
                document.getElementById("circle").classList.remove('active');
            }
            this.hasGameFinished = true; //ends the game
            window.setTimeout(this.resetBoard, 3000);

        }

        this.current_player = next_player;

        return true;

    }

    this.getFigure = () => {
        return 0;
    }

    this.getBoard = () => {
        console.log(this.board);
    }

    this.resetBoard = () => {
        let boardElement = document.getElementById("board");
        let fields = boardElement.childNodes;
        fields.forEach(child => {
            if (child.hasChildNodes()) {
                child.firstChild.remove();
            }
        });

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.board[i][j] = 0;
            }
        }

        if (this.current_player === 1) {
            document.getElementById("circle").classList.remove('active');
            document.getElementById("times").classList.remove('winner');
        } else {
            document.getElementById("times").classList.remove('active');
            document.getElementById("circle").classList.remove('winner');
        }

        this.hasGameStarted = false;
        this.hasGameFinished = false;
        this.current_player = 0;
    }

    this.isFinished = (c) => {
        if (this.board[0][0] === c && this.board[0][1] === c && this.board[0][2] === c ||
            this.board[0][0] === c && this.board[1][1] === c && this.board[2][2] === c ||
            this.board[0][0] === c && this.board[1][0] === c && this.board[2][0] === c) {
            return true;
        } else if (this.board[0][1] === c && this.board[1][1] === c && this.board[2][1] === c ||
            this.board[0][2] === c && this.board[1][2] === c && this.board[2][2] === c ||
            this.board[0][2] === c && this.board[1][1] === c && this.board[2][0] === c) {
            return true;
        } else if (this.board[1][0] === c && this.board[1][1] === c && this.board[1][2] === c ||
            this.board[2][0] === c && this.board[2][1] === c && this.board[2][2] === c) {
            return true;
        } else {
            return false;
        }
    }

    // ========================================================================================
    // Hausaufgabe aus dem Workshop
    // ======================================================================================== Start

    // Rest ist in der undo() Funktion zu finden

    this.undoLastMove = () => {
        //TODO
        console.log("Denkt an die Hilfestellungen in der Mail :)")
        return true;
    }

    // ======================================================================================== Ende

}

let game = new Game();

function handleMove(e) {
    game.setFigure(e);
}

Game.prototype.initBoard = () => {

    let boardElement = document.getElementById('board');
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {

            // converts row and column count into field count
            let field_count = i + i * j;
            // create field html element, div
            let field = document.createElement('div');
            // set classlist of field div
            field.classList = ['field'];
            // set attributes of field div
            field.setAttribute('row', i);
            field.setAttribute('column', j);
            // set id of field div
            field.id = "field-" + field_count;

            // adding event listener for actual game play
            field.addEventListener('click', function() {
                handleMove(field);
            });

            // <div class="field" row="${i}" column="${j}" id="field-${field_count}">
            boardElement.appendChild(field);
        }
    }
};

game.initBoard();

function start(e) {
    game.setStartingPlayer(e);
}

// ========================================================================================
// Hausaufgabe aus dem Workshop
// ======================================================================================== Start

// Rest ist in der Game() Funktion zu finden
// Hier ist die aufrufende Funktion gegeben, eingebunden in der index.html

function undo() {

    // Aufruf der von euch implementierten Funktion auf
    // der Instanz game
    game.undoLastMove();
}

// ======================================================================================== Ende