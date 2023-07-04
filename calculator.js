function init() {

    document.querySelector('.calc-buttons')
    .addEventListener("click", function(event) {
       buttonClick(event.target.innerText);
    })

}

init();


let buffer = '0';
let runnignTotal = 0;
let previousOperator = null;


function buttonClick(value){
    if (isNaN(parseInt(value))) {
       handleSymbol(value);
    } else {
        handlNumber(value);
    }
    
    refresh();
}


function handlNumber(number) {
    if (buffer === '0') { 
       buffer = number;
     } else {
        buffer += number;
     }
     
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C': 
            buffer = '0';
            break;

        case '<-':
            if (buffer.length === 1){
                buffer = '0';
            } else { 
            buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
  
        case '%':
        case 'x':
        case '+':
        case '-':
            handleMath(symbol);
            break;
        case '=':
            if (previousOperator === null) {
                return
            }
            flushOperations(parseInt(buffer));
            previousOperator = null;
            buffer = "" +runnignTotal;
            runnignTotal = 0;

            break;

    }
}



let screen = document.querySelector('.screen');

function refresh() {
    screen.innerText = buffer;
}


function handleMath(value) {

    if (buffer === '0'){
        return;
    }

    const intBufer = parseInt(buffer);

    if (runnignTotal === 0){
        runnignTotal = intBufer;
    } else {
        flushOperations(intBufer);
    }
    
    previousOperator = value;
    buffer = '0';
    console.log(runnignTotal);

}


function flushOperations (intBufer){
    if (previousOperator === '+') {
        runnignTotal += intBufer;
    } else if (previousOperator === '-') {
        runnignTotal -= intBufer;
    } else if (previousOperator === 'x') {
        runnignTotal *= intBufer;
    } else if (previousOperator === '%') {
        runnignTotal /= intBufer;
    }

 }
