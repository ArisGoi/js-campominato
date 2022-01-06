

// DOM
const dom_field = document.getElementById("field");
const points = document.getElementById("points");

document.getElementById('btn-start').addEventListener('click', ()=>{startGame()})

// Param & Settings
const bombs = 16;
let bombList = [];
let clickList = [];
//----
let colSize = 10;
let gridSize = colSize * colSize;
//----
let score = 0;


// ##### Basic Functions #####
/**
 * StartGame
 * svuota il campo e genera la griglia
 */
function startGame(){
    // libera il campo e resetta i dati
    document.getElementById('field').innerHTML = "";
    bombList = [];
    clickList = ['undefined-undefined'];
    score = 0;
    points.innerHTML = score;
    dom_field.style.zIndex = "0";

    // legge la difficoltà e definisce il numero di quadrati
    const getDiff = document.getElementById("diff").value;
    switch(getDiff){
        case '0':
            colSize = 10;
                break;
        case '1':
            colSize = 8;
                break;
        case '2':
            colSize = 6;
                break;
    }

    //richiama funzioni start
    makeField();
    makeBombs();
    addClickEvent();
}

/**
 * addClickEvent
 * aggiunge un listener click alla griglia e lancia i controlli su bombe e azioni
 */
function addClickEvent(){
    document.getElementById('field').addEventListener("click", (event)=>{
        let eventY = event.target.dataset.y;
        let eventX = event.target.dataset.x;

        console.log(`hai premuto su: y=${eventY} x=${eventX}`);

        checkSquare(event, eventY, eventX);
    })
}

// GAME OVER
function gameOver(event){
    //rimuove la possibilità di clickare il campo
    dom_field.style.position = "relative";
    dom_field.style.zIndex = "-1";

    alert('HAI PERSO! il dito');

    showAllBombs(); //mostra tutte le bombe
    event.target.classList.add('this-bomb'); //evidenzia la bomba esplosa
}

// -_-_--_-_-_-_--_-_-___-__-_-_--_--_-_-_----_-_--_----_-_--_-_-_-__-_-_-_-__--_-_-_--_-_--_-__-_-__-_-__-_
