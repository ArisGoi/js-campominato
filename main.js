/** RICHIESTA
 * all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
        con difficoltà 0 => tra 1 e 100
        con difficoltà 1 => tra 1 e 80
        con difficoltà 2 => tra 1 e 50
 * Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).
 * I numeri non possono essere duplicati.
 * In seguito il giocatore clicca sulle celle numerate (non può cliccare più volte sulla stessa cella)
 * La partita termina quando il giocatore clicca su un numero “vietato” o clicca su tutte le celle che non sono delle bombe.
 * Al termine della partita il software deve comunicare il punteggio.
*/


var nOfSquare;

var clickList = [];
var bombList = [];

var pointCounter = 0;


/**
 * CHILD GENERATOR
 * Genera un numero definito di figli all'interno di un'elemento
 */
function childGenerator(nameContainElement, typeOfChild, nameChildClass, numberOfChild){
    for (i = 0; i < numberOfChild; i++) {
        document.getElementById(nameContainElement).innerHTML += 
        `<${typeOfChild} id="${i}" class="${nameChildClass}"></${typeOfChild}>`
    }
}

/**
 * RESTART
 * Pulisce il campo
 * legge difficoltà e richiama childGenerator() inserendo i dati in base alla difficoltà
 */
// leggo difficoltà e richiamo la funzione childGenerator inserendo i dati in base alla difficoltà
function startGame(){
    // libera il campo
    document.getElementById('field').innerHTML = "";
    clickList = [NaN];

    // legge la difficoltà e definisce il numero di quadrati
    let difficulty = document.getElementById('diff').value;
    if (difficulty == 0){ //facile
        nOfSquare = 100;
    } else if (difficulty == 1){ //medio
        nOfSquare = 80;
    } else if (difficulty == 2){ //difficile
        nOfSquare = 50;
    };
    // genera il campo
    childGenerator("field", "div", "square", nOfSquare);

    // genera 16 numeri diversi (bombe)
    bombList = [];
    while (16>bombList.length){
        let bombPosNumber = parseInt(Math.random() * nOfSquare);

        while (bombList.includes(bombPosNumber)){
            bombPosNumber = parseInt(Math.random() * nOfSquare);
        };
        // in bombList inserisce il numero della posizione della bomba
        bombList.push(bombPosNumber);
        // posiziona la grafica della bomba nel campo
        document.getElementById(bombPosNumber).classList.add('bombInside');
    };
}

// Al click di btn-restart richiama startGame()
document.getElementById('btn-restart').addEventListener('click',
function(){
    startGame();
    pointCounter = 0;
    document.getElementById('points').innerHTML = "Your Score: " + pointCounter;
}
);



document.getElementById('field').addEventListener('click',
function clickEvent(event){
    // identifica la cella clickata
    let nCella = parseInt(event.target.id);

    // aggiunge la classe selcted alla cella
    event.target.classList.add('selected');
    

    // se la cella è valida aumenta il punteggio
    console.log("click: " + parseInt(event.target.id));
    if(clickList.includes(nCella) == false){

        pointCounter++;
        clickList.push(nCella);
    };

    // se la cella è una bomba "hai perso" e blocca il click su tutto il campo
    if (bombList.includes(nCella)){
        alert('hai perso')
        document.getElementById('field').innerHTML += `<div class="bloccoClick"></div>`;
        pointCounter--;
    };

    document.getElementById('points').innerHTML = "Your Score: " + pointCounter;

    if(pointCounter == (nOfSquare - 16)){
        alert('hai vinto');
        document.getElementById('field').innerHTML += `<div class="bloccoClick"></div>`;
    };
    
}
);