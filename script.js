
// Array to hold operation expression
let expressionBuilder = [];

function expressionArrayToString(expressionArray) {
    return expressionArray.join('');
}

function lastElementOfArray(array) {
    return array[array.length -1];
}

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
        switch (this.id) {
            // If 'C' clear button is clicked
            case "clear":
                expressionBuilder.length = 0;   
                setHistory(""); // Clear the history
                setResult("");   // Set result to 0 
                break;
            // If backspace button is clicked
            case "backspace":
                setResult("");
                // Remove the last digit in the expressionBuilder array
                expressionBuilder.pop();
                setHistory(expressionArrayToString(expressionBuilder))

                // var result = reverseFormattedResult(getResult()).toString();
                // if(result && result != 0) { // Check if result is a number other than 0 or empty
                //     if(result.length == 1) {    // If the digit to delete is the last digit
                //         setResult(0);   // Update the result to 0
                //         newExpression = true;
                //     } else {
                //         result = result.substr(0, result.length-1); // Remove the last character 
                //         setResult(result);
                //     }
                // } 
                break;
            // For the rest of operators: = / * - +
            default:      
                var result = reverseFormattedResult(getResult());
                var history = getHistory();

                // If the last digit is an operator, replace the operator with the current clicked operator
                if(history != "") {
                    if(isNaN(lastElementOfArray(expressionBuilder))) {
                        expressionBuilder.pop(); // Remove the last entry
                        setHistory(expressionArrayToString(expressionBuilder));
                        history = getHistory();
                    }
                }

                
                if(history != ""){// if(result != "" || history != ""){
                    //  result = result=="" ? result : reverseFormattedResult(result);
                    //  history = history + result;

                    // If equals button is clicked
                    if(this.id == "=") {
                        if (isNaN(lastElementOfArray(expressionBuilder))) { // If last entry is not a number
                             // Do nothing
                        } else {
                            var result = eval(expressionArrayToString(expressionBuilder)); // Evaluate the expression in history
                            setResult(result);  // Update the result
                        }
                    } 
                    // If mathematic operators are clicked: / * - +
                    else {
                        // Update the history to start with result value if newExpression is true
                        if (result != "") {
                            expressionBuilder.length = 0;   // Reset the expression builder
                            expressionBuilder.push(result); // Add the result of previous operation
                        }
                        // Add the operator to expressionBuilder array
                        expressionBuilder.push(this.id);
                        setHistory(expressionArrayToString(expressionBuilder)) 
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

        var result = reverseFormattedResult(getResult());

        if (result != ""){
            expressionBuilder.length = 0; // Clear the expression builder
            setHistory("");
        }

        // Retrieve the number stored in result
        // var result = reverseFormattedResult(getResult());
        
        // if(result != NaN) {     // If result is a number 
        expressionBuilder.push(this.id);   
        // result += this.id;  // Append the clicked button to the result
        setHistory(expressionArrayToString(expressionBuilder));    // Update result
        
    })
}
