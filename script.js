
/*
Accessor method for calculator history DOM element
*/
function getHistory() {
    return document.getElementById("operation-history").innerText;
}

/*
Mutator method for calculator history DOM element
*/
function setHistory(operation) {
    document.getElementById("operation-history").innerText = operation;
}

/*
Accessor method for calculator result DOM element
*/
function getResult() {
    return document.getElementById("operation-result").innerText;
}

/*
Mutator method for calculator result DOM element
*/
function setResult(result) {
    if(result==""){
        document.getElementById("operation-result").innerText = result;
    } else {
        document.getElementById("operation-result").innerText = getFormattedResult(result);
    }
}

// Tracks whether an expression has been completed
var newExpression = true;

/*
Returns a string with comma separated values
*/
function getFormattedResult(result) {
    // Use case: When number is negative
    if(result == "-") {
        return "";
    }
    var n = Number(result);
    var output = n.toLocaleString("en");
    return output;
}

/*
Returns a number with no commas
*/
function reverseFormattedResult(result) {
    return Number(result.replace(/,/g, ''));
}

// Retrieve all elements with class name "operator"
var operators = document.getElementsByClassName("operator");

// Adds a click listener to each "number" element
for (var i=0; i<operators.length; i++) {
    operators[i].addEventListener('click', function() {
        newExpression = false;
        switch (this.id) {
            // If 'C' clear button is clicked
            case "clear":
                newExpression = true;   
                setHistory(""); // Clear the history
                setResult(0);   // Set result to 0 
                break;
            // If backspace button is clicked
            case "backspace":
                var result = reverseFormattedResult(getResult()).toString();
                if(result && result != 0) { // Check if result is a number other than 0 or empty
                    if(result.length == 1) {    // If the digit to delete is the last digit
                        setResult(0);   // Update the result to 0
                        newExpression = true;
                    } else {
                        result = result.substr(0, result.length-1); // Remove the last character 
                        setResult(result);
                    }
                } 
                break;
            // For the rest of operators: = / * - +
            default:      
                var result = getResult();
                var history = getHistory();

                // If the last digit is an operator, replace the operator with the current clicked operator
                if(result =="" && history != "") {
                    if(isNaN(history[history.length-1])) {
                        history = history.substr(0, history.length-1);
                    }
                }

                
                if(result != "" || history != ""){
                    result = result=="" ? result : reverseFormattedResult(result);
                    history = history + result;

                    // If equals button is clicked
                    if(this.id == "=") {
                        var result = eval(history); // Evaluate the expression in history
                        setResult(result);  // Update the result
                        setHistory(""); // Clear the history
                        newExpression = true;
                    } 
                    // If mathematic operators are clicked: / * - +
                    else {
                        // Add the operator to history
                        history = history + this.id;    
                        setHistory(history) 
                        setResult("");  // Clear the result
                    }
                }
                break;

        }
    });
}

// Retrieve all elements with class name "number"
var numbers = document.getElementsByClassName("number");

// Adds a click listener to each "number" element
for (var i=0; i<numbers.length; i++) {
    numbers[i].addEventListener('click', function() {

        if (newExpression === true){
            setResult("");    
        }

        // Retrieve the number stored in result
        var result = reverseFormattedResult(getResult());
        
        if(result != NaN) {     // If result is a number    
            result += this.id;  // Append the clicked button to the result
            setResult(result);    // Update result
            newExpression = false;
        }
    })
}
