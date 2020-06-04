let boardElement = document.getElementById("board");
let figureCross = document.createElement("i").classList.add("fa", "fa-circle");

let restart = () => {
    let fields = boardElement.childNodes;
    fields.forEach(child => {
        if(child.hasChildNodes()) {
            child.firstChild.remove();
        }
    });
}

document.addEventListener("click", function() {
    
});