

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

/**
 * makeField
 * Genera il campo da gioco:
 * la tabella con coordinare x e y per ogni quadrato
 */
function makeField() {
    let addTable = document.createElement("ul");
    let addRow;
    let addCell;

    dom_field.appendChild(addTable);

    for (let y = 0; y < colSize; y++) {
        addRow = document.createElement("li");
        addRow.dataset.row = y;

        for (let x = 0; x < colSize; x++) {
            addCell = document.createElement("div");
            addCell.dataset.y = y;
            addCell.dataset.x = x;

            addRow.appendChild(addCell);
        }

        addTable.appendChild(addRow);
    }
}

/**
 * makeBombs
 * genera le bombe sul terreno e le inserisce nella bombList
 */
function makeBombs(){
    let bomb;

    while (bombs>bombList.length){
        let bomb;

        do{
            getY = parseInt(Math.random() * colSize);
            getX = parseInt(Math.random() * colSize);

            bomb = {
                posY: getY,
                posX: getX,
                code: `${getY}-${getX}`
            }
        } while(bombList.find(obj => { //check se è già contenuto
            if(obj.code == bomb.code){return true} else{return false}
        }));

        // in bombList inserisce la bomba
        bombList.push(bomb);
    };
}

/**
 * checkSquare
 * Controlla l'identità del quadrato premuto e lancia le azioni correlate
 * @param {*} event - event da eventListener
 * @param {number} eventY - Coordinata_Y
 * @param {number} eventX - Coordinata_X
 */
function checkSquare(event, eventY, eventX){
    // Controllo click su Bomba
    if(bombList.find(obj => {
        if(obj.code == `${eventY}-${eventX}`){return true} else{return false}
    })){//Azione Boom!
        gameOver(event);
        
    } else{//Azione Save!
        event.target.classList.add('clicked');

        //Validazione doppio-click
        if(!clickList.includes(`${eventY}-${eventX}`)){
            clickList.push(`${eventY}-${eventX}`);
            score++;
            points.innerHTML = score;
        }
    }
}

/**
 * showAllBombs
 * mostra tutte le bombe presenti nel campo
 */
function showAllBombs(){

    let selAll = document.getElementById('field').querySelectorAll('div');

    selAll.forEach(elm => {
        let elmY = elm.dataset.y;
        let elmX = elm.dataset.x;

        if(bombList.find(obj => {if(obj.code == `${elmY}-${elmX}`){return true} else{return false}})){
            elm.classList.add('bombInside');
        }
    });
}