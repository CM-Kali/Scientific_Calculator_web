const display = document.getElementById('display');

display.value = '';

function insert(value) {
    if (display.value === 'Error' || display.value === 'Infinity') {
        display.value = '';
    }
    
    if (value === 'π') {
        display.value += Math.PI;
    } else if (value === '^') {
        display.value += '**'; 
    } else {
        display.value += value;
    }
}

function insertFunction(func) {
    if (display.value === 'Error' || display.value === 'Infinity') {
        display.value = '';
    }
    
    display.value += func;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;
        
       
        expression = expression.replace(/sin/g, 'Math.sin');
        expression = expression.replace(/cos/g, 'Math.cos');
        expression = expression.replace(/tan/g, 'Math.tan');
        expression = expression.replace(/sqrt/g, 'Math.sqrt');
        expression = expression.replace(/log/g, 'Math.log10');
        expression = expression.replace(/exp/g, 'Math.exp');
        expression = expression.replace(/π/g, Math.PI);
        
        let result = eval(expression);
        
        if (!isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = parseFloat(result.toFixed(10));
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Add keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    
    if (/[0-9+\-*/.=]/.test(key)) {
        if (key === '=' || key === 'Enter') {
            event.preventDefault(); 
            calculate();
        } else {
            insert(key);
        }
    }
    
    else if (key === '(' || key === ')') {
        insert(key);
    }
    
  
    else if (key === 'Backspace') {
        event.preventDefault(); 
        deleteLast();
    }
   
    else if (key === 'Escape') {
        clearDisplay();
    }
});


window.onload = function() {
    document.getElementById('display').focus();
};