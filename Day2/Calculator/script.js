document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const operationDisplay = document.getElementById('operation-display');
    const keys = document.querySelectorAll('.key');
    
    let currentInput = '';
    let currentOperation = null;
    let prevInput = '';
    
    // Add button press animation
    keys.forEach(key => {
        key.addEventListener('click', function() {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 100);
        });
    });
    
    // Update operation display
    function updateOperationDisplay() {
        if (prevInput && currentOperation) {
            let opSymbol = currentOperation;
            operationDisplay.textContent = `${prevInput} ${opSymbol} ${currentInput || ''}`;
        } else {
            operationDisplay.textContent = '';
        }
    }
    
    // Handle calculator logic
    keys.forEach(key => {
        key.addEventListener('click', function() {
            const value = this.textContent;
            
            // Handle number inputs
            if (!isNaN(value) || value === '.') {
                if (value === '.' && currentInput.includes('.')) return;
                
                // Add animation to display
                display.classList.add('animate');
                setTimeout(() => {
                    display.classList.remove('animate');
                }, 300);
                
                currentInput += value;
                display.value = currentInput;
                updateOperationDisplay();
            }
            
            // Handle operators
            if (['+', '-', '×', '÷', '%'].includes(value)) {
                if (currentInput === '' && prevInput === '') return;
                
                // If we already have a result, use it for the next operation
                if (currentInput !== '') {
                    prevInput = currentInput;
                    currentInput = '';
                }
                
                currentOperation = value;
                updateOperationDisplay();
                
                // Highlight the current operator button
                document.querySelectorAll('.operator').forEach(op => {
                    op.style.boxShadow = 'none';
                });
                this.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.5)';
            }
            
            // Handle equals
            if (value === '=') {
                if (currentOperation === null || currentInput === '' || prevInput === '') return;
                
                let result;
                const prev = parseFloat(prevInput);
                const current = parseFloat(currentInput);
                
                // Store the full calculation for history
                const calculation = `${prevInput} ${currentOperation} ${currentInput} = `;
                
                switch (currentOperation) {
                    case '+':
                        result = prev + current;
                        break;
                    case '-':
                        result = prev - current;
                        break;
                    case '×':
                        result = prev * current;
                        break;
                    case '÷':
                        result = prev / current;
                        break;
                    case '%':
                        result = (prev / 100) * current;
                        break;
                }
                
                // Add calculation animation
                display.classList.add('animate-result');
                setTimeout(() => {
                    display.classList.remove('animate-result');
                }, 500);
                
                // Show the complete calculation
                operationDisplay.textContent = calculation;
                
                // Format result to avoid extremely long numbers
                if (result.toString().includes('.') && result.toString().split('.')[1].length > 8) {
                    result = result.toFixed(8);
                }
                
                currentInput = result.toString();
                display.value = currentInput;
                currentOperation = null;
                prevInput = '';
                
                // Reset operator highlighting
                document.querySelectorAll('.operator').forEach(op => {
                    op.style.boxShadow = 'none';
                });
            }
            
            // Handle clear
            if (value === 'C') {
                currentInput = '';
                currentOperation = null;
                prevInput = '';
                display.value = '';
                operationDisplay.textContent = '';
                
                // Add clear animation
                display.classList.add('animate-clear');
                setTimeout(() => {
                    display.classList.remove('animate-clear');
                }, 300);
                
                // Reset operator highlighting
                document.querySelectorAll('.operator').forEach(op => {
                    op.style.boxShadow = 'none';
                });
            }
            
            // Handle backspace
            if (value === '⌫') {
                currentInput = currentInput.slice(0, -1);
                display.value = currentInput;
                updateOperationDisplay();
            }
        });
    });
    
    // Add keyboard support
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        
        // Number keys
        if (!isNaN(key) || key === '.') {
            document.getElementById(
                key === '.' ? 'decimal' : 
                key === '0' ? 'zero' : 
                key === '1' ? 'one' : 
                key === '2' ? 'two' : 
                key === '3' ? 'three' : 
                key === '4' ? 'four' : 
                key === '5' ? 'five' : 
                key === '6' ? 'six' : 
                key === '7' ? 'seven' : 
                key === '8' ? 'eight' : 'nine'
            ).click();
        }
        
        // Operator keys
        if (key === '+') document.getElementById('add').click();
        if (key === '-') document.getElementById('subtract').click();
        if (key === '*') document.getElementById('multiply').click();
        if (key === '/') {
            event.preventDefault();
            document.getElementById('divide').click();
        }
        if (key === '%') document.getElementById('percent').click();
        
        // Action keys
        if (key === 'Enter') document.getElementById('equals').click();
        if (key === 'Escape') document.getElementById('clear').click();
        if (key === 'Backspace') document.getElementById('backspace').click();
    }); 
    
    // Remove the calculator tilt/hover animation
    const calculator = document.querySelector('.calculator');
    
    // Remove these listeners that were causing the hover/tilt effect
    document.removeEventListener('mousemove', calculatorTiltEffect);
    calculator.removeEventListener('mouseleave', resetCalculatorTilt);
    
    // Define these functions in case they're referenced elsewhere
    function calculatorTiltEffect(e) {
        // Function empty - hover effect removed
    }
    
    function resetCalculatorTilt() {
        // Function empty - hover effect removed
    }
});