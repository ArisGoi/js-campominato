/** --------------------------------------------
## TODO: ##
-- Rifare lo style
-- Fare Responsive
------------------------------------------------ */

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

    // legge la difficoltÃ  e definisce il numero di quadrati
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
 * addClickEvent & clickEvent
 * aggiunge un listener click alla griglia e lancia i controlli su bombe e azioni
 */
function addClickEvent(){
    document.getElementById('field').addEventListener("click", clickEvent);
}
function clickEvent(ev){
    let eventY = ev.target.dataset.y;
    let eventX = ev.target.dataset.x;

    console.log(`hai premuto su: y=${eventY} x=${eventX}`);

    checkSquare(ev, eventY, eventX);
}

// GAME OVER
function gameOver(event){
    
    alert('HAI PERSO! il dito');
    
    showAllBombs(); //mostra tutte le bombe
    event.target.classList.add('this-bomb'); //evidenzia la bomba esplosa

    //rimuove la possibilitÃ  di clickare il campo
    document.getElementById('field').removeEventListener("click", clickEvent);
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
        } while(bombList.find(obj => { //check se Ã¨ giÃ  contenuto
            if(obj.code == bomb.code){return true} else{return false}
        }));

        // in bombList inserisce la bomba
        bombList.push(bomb);
    };
}

/**
 * checkSquare
 * Controlla l'identitÃ  del quadrato premuto e lancia le azioni correlate
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

        checkBombsAround(event);
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

/**
 * checksBombsAround
 * controlla quante bombe toccano il quadrato selezionato
 * @param {*} event 
 */
function checkBombsAround(event){
    const this_square = event.target
    //starting square coordinates
    const startY = event.target.dataset.y;
    const startX = event.target.dataset.x;
    //min & max of x & y
    const min = 0;
    const max = colSize - 1;
    //counter of around bombs
    let counter = 0;

    // check[UP]
    if(startY != min){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY) - 1}-${parseInt(startX)}`){
                counter++;
            }
        })
    }

    // check[UP-RIGHT]
    if(startY != min && startX != max){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY) - 1}-${parseInt(startX) + 1}`){
                counter++;
            }
        })
    }

    // check[RIGHT]
    if(startX != max){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY)}-${parseInt(startX) + 1}`){
                counter++;
            }
        })
    }
    
    // check[DOWN-RIGHT]
    if(startY != max && startX != max){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY) + 1}-${parseInt(startX) + 1}`){
                counter++;
            }
        })
    }
    
    // check[DOWN]
    if(startY != max){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY) + 1}-${parseInt(startX)}`){
                counter++;
            }
        })
    }
    
    // check[DOWN-LEFT]
    if(startY != max && startX != min){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY) + 1}-${parseInt(startX) - 1}`){
                counter++;
            }
        })
    }
    
    // check[LEFT]
    if(startX != min){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY)}-${parseInt(startX) - 1}`){
                counter++;
            }
        })
    }
    
    // check[UP-LEFT]
    if(startY != min && startX != min){
        bombList.find(obj => {
            if(obj.code == `${parseInt(startY) - 1}-${parseInt(startX) - 1}`){
                counter++;
            }
        })
    }

    // scrive il numero di bombe trovate
    if(counter > 0){
        this_square.innerHTML = counter;

        switch(counter){
            case 1:
                this_square.style.backgroundColor = "var(--soft-alert)"
                    break;
            case 2:
                this_square.style.backgroundColor = "var(--alert)"
                    break;
            case 3:
                this_square.style.backgroundColor = "var(--danger)"
                    break;
            default: 
                this_square.style.backgroundColor = "var(--default)"
                break;
        }

        if(counter > 3){
                this_square.style.backgroundColor = "var(--most-danger)"
        }
    }
}