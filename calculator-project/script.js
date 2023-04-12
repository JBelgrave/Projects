const display = document.getElementById("display")

const button0 = document.getElementById("0")
const button1 = document.getElementById("1")
const button2 = document.getElementById("2")
const button3 = document.getElementById("3")
const button4 = document.getElementById("4")
const button5 = document.getElementById("5")
const button6 = document.getElementById("6")
const button7 = document.getElementById("7")
const button8 = document.getElementById("8")
const button9 = document.getElementById("9")
const buttonDot = document.getElementById(".")

const buttonAdd = document.getElementById("+")
const buttonSubtract = document.getElementById("-")
const buttonDivide = document.getElementById("/")
const buttonMultiply = document.getElementById("*")

const buttonBack = document.getElementById("X")
const buttonClearAll = document.getElementById("AC")

const buttonEquals = document.getElementById("=")


/*number buttons*/
document.addEventListener("click", (event) => {
    if (event.target === button0) {
        if (display.innerText == "0") {
            display.innerText = "0";
        } else if (display.innerText == "NaN") {
            display.innerText = "0";
        } else {
            display.innerText += "0";
        }
    } else if (event.target === button1) {
        if (display.innerText == "0") {
            display.innerText = "1";
        } else if (display.innerText == "NaN") {
            display.innerText = "1";
        } else {
            display.innerText += "1";
        }
    } else if (event.target === button2) {
        if (display.innerText == "0") {
            display.innerText = "2";
        } else if (display.innerText == "NaN") {
            display.innerText = "2";
        } else {
            display.innerText += "2";
        }
    } else if (event.target === button3) {
        if (display.innerText == "0") {
            display.innerText = "3";
        } else if (display.innerText == "NaN") {
            display.innerText = "3";
        } else {
            display.innerText += "3";
        }
    } else if (event.target === button4) {
        if (display.innerText == "0") {
            display.innerText = "4";
        } else if (display.innerText == "NaN") {
            display.innerText = "4";
        } else {
            display.innerText += "4";
        }
    } else if (event.target === button5) {
        if (display.innerText == "0") {
            display.innerText = "5";
        } else if (display.innerText == "NaN") {
            display.innerText = "5";
        } else {
            display.innerText += "5";
        }
    } else if (event.target === button6) {
        if (display.innerText == "0") {
            display.innerText = "6";
        } else if (display.innerText == "NaN") {
            display.innerText = "6";
        } else {
            display.innerText += "6";
        }
    } else if (event.target === button7) {
        if (display.innerText == "0") {
            display.innerText = "7";
        } else if (display.innerText == "NaN") {
            display.innerText = "7";
        } else {
            display.innerText += "7";
        }
    } else if (event.target === button8) {
        if (display.innerText == "0") {
            display.innerText = "8";
        } else if (display.innerText == "NaN") {
            display.innerText = "8";
        } else {
            display.innerText += "8";
        }
    } else if (event.target === button9) {
        if (display.innerText == "0") {
            display.innerText = "9";
        } else if (display.innerText == "NaN") {
            display.innerText = "9";
        } else {
            display.innerText += "9";
        }
    } else if (event.target === buttonDot) {
        if (display.innerText == "0") {
            display.innerText = "."
        } else if (display.innerText == "NaN") {
            display.innerText = "."
        } else if(display.innerText[display.innerText.length - 1] == "."){
            return false
        } else {
            display.innerText += "."
        }
    }
})

/*math buttons*/
document.addEventListener("click", (event) => {
    if (event.target === buttonAdd) {
        if (display.innerText == "0") {
            display.innerText += "+"
        } else if (display.innerText[display.innerText.length - 1] == "+") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "-") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "/") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "*") {
            return false
        } else if (display.innerText == "NaN") {
            return false
        } else {
            display.innerText += "+"
        }
    } else if (event.target === buttonSubtract) {
        if (display.innerText == "0") {
            display.innerText += "-"
        } else if (display.innerText[display.innerText.length - 1] == "+") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "-") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "/") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "*") {
            return false
        } else if (display.innerText == "NaN") {
            return false
        } else {
            display.innerText += "-"
        }
    } else if (event.target === buttonDivide) {
        if (display.innerText == "0") {
            display.innerText += "/"
        } else if (display.innerText[display.innerText.length - 1] == "+") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "-") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "/") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "*") {
            return false
        } else if (display.innerText == "NaN") {
            return false
        } else {
            display.innerText += "/"
        }
    } else if (event.target === buttonMultiply) {
        if (display.innerText == "0") {
            display.innerText += "*"
        } else if (display.innerText[display.innerText.length - 1] == "+") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "-") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "/") {
            return false
        } else if (display.innerText[display.innerText.length - 1] == "*") {
            return false
        } else if (display.innerText == "NaN") {
            return false
        } else {
            display.innerText += "*"
        }
    }
})

/*clear buttons*/
document.addEventListener("click", (event) => {
    if (event.target === buttonBack) {
        if (display.innerText == "0") {
            return false
        } else if (display.innerText.length === 1) {
            display.innerText = "0"
        } else if (display.innerText == "NaN") {
            display.innerText = "0";
        } else {
            let tempBack = display.innerText.split('')
            tempBack.pop()
            display.innerText = tempBack.join('')
            // display.innerText = display.innerText.substring(0, display.innerText.length - 1)
        }
    } else if (event.target === buttonClearAll) {
        display.innerText = "0"
    }
})

/*equals button*/
buttonEquals.addEventListener("click", (event) => {
    if (event.target === buttonEquals) {
        const expressionArray = display.innerText.split(/(\+|\-|\*|\/)/);
        let result = parseFloat(expressionArray[0]);

        for (let i = 1; i < expressionArray.length; i += 2) {
            const num = parseFloat(expressionArray[i + 1]);
            switch (expressionArray[i]) {
                case "+":
                    result += num;
                    break;
                case "-":
                    result -= num;
                    break;
                case "*":
                    result *= num;
                    break;
                case "/":
                    result /= num;
                    break;
            }
        }
        display.innerText = result;
    }
});