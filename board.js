let figureCross = document.createElement("i").classList.add("fa", "fa-circle");

document.getElementById("game-restart").addEventListener('click', function() {
    game.resetBoard();
});

function getPosition(e) {
    let row = e.getAttribute('row');
    let col = e.getAttribute('column');
    return [row, col];
}