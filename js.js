// Get keys
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// Add onclick event to keys
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Get input and button values
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;
		
		// Append btnValue to the input string
		// use JS eval function to get result

		// Erase everything while pressing clear
		if(btnVal == 'C') {
			input.innerHTML = '';
			decimalAdded = false;
		}
		
		// Calculate and display result while pressing eval
		else if(btnVal == '=') {
			var equation = inputVal;
			var lastChar = equation[equation.length - 1];
			
			// Replace all instances of x ÷ with * / respectively.
			// Regex : 'g' tag will replace all instances of matched pattern
			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
			
			// Check the last character of the equation. If it's an operator or a decimal, remove
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation)
				input.innerHTML = eval(equation);
				
			decimalAdded = false;
		}

		// Note: indexOf works only in IE9+

		else if(operators.indexOf(btnVal) > -1) {
			// Warning : No two operators should be added consecutively
			// When operator is clicked, get the last character
			var lastChar = inputVal[inputVal.length - 1];
			
			// Only add operator if input is not empty and there is no operator at the last
			if(inputVal != '' && operators.indexOf(lastChar) == -1) 
				input.innerHTML += btnVal;

			// Waring : The equation shouldn't start from an operator except minus
			// Allow minus if the string is empty
			else if(inputVal == '' && btnVal == '-') 
				input.innerHTML += btnVal;
			
			// Replace the last operator (if exists) with the newly pressed operator
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				input.innerHTML = inputVal.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		
		// Warning : No more than 1 decimal should be in a number
		else if(btnVal == '.') {
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}
		
		// If any other key is pressed, append
		else {
			input.innerHTML += btnVal;
		}
		
		// Prevent page jumps
		e.preventDefault();
	} 
}