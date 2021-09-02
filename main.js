/** RICHIESTA
 * Il computer deve generare 16 numeri casuali tra 1 e 100 (bombe).
 * I numeri non possono essere duplicati.
 * In seguito il giocatore clicca sulle celle numerate (non può cliccare più volte sulla stessa cella)
 * La partita termina quando il giocatore clicca su un numero “vietato” o clicca su tutte le celle che non sono delle bombe.
 * Al termine della partita il software deve comunicare il punteggio.
*/



// Genera un numero definito di figli all'interno di un'elemento
function childGenerator(nameContainElement, typeOfChild, nameChildClass, numberOfChild){
    for (i = 0; i < numberOfChild; i++) {
        document.getElementById(nameContainElement).innerHTML += `<${typeOfChild} class="${nameChildClass}">${i + 1}</${typeOfChild}>`
    }
}

// richiamo la funzione childGenerator inserendo i dati e richiedendo all'utente il numero di quadrati da generare
childGenerator("container", "div", "square", prompt('Inserisci un numero di quadrati'));

// al click di un quadrato questo si colora di rosso e crea un alert che ti informa del suo numero
document.getElementById('container').addEventListener('click',
    function(event){

        let nCella = event.target.innerHTML;

        alert('hai fatto click sulla cella numero: ' + nCella);

        event.target.classList.add('selected');
    }
);