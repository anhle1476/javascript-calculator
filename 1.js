// Main variable
var curArr = [];
var curDisplay = "";
var result = 0;

//check variable
var regex = /^([\+\-]{0,1}[\.\d]*)([\+\-\*\/]{0,1})([\+\-]{0,1}[\.\d]*)$/;
var regexFull = /^([\+\-]{0,1}[\.\d]+)([\+\-\*\/]{1})([\+\-]{0,1}[\.\d]+)$/;
var previousItemCheckArr = ["+", "-", "*", "/", undefined]

//DOM variable
let displayViewer = document.getElementById('display')
let resultViewer = document.getElementById('result')

// State variable
let completed = false;



//input functions
let input = {
	num0: function() {
		check.checkNumber();
		curArr.push("0");
		view.display();
	},
	num1: function() {
		check.checkNumber();
		curArr.push("1");
		view.display();
	},
	num2: function() {
		check.checkNumber();
		curArr.push("2");
		view.display();
	},
	num3: function() {
		check.checkNumber();
		curArr.push("3");
		view.display();
	},
	num4: function() {
		check.checkNumber();
		curArr.push("4");
		view.display();
	},
	num5: function() {
		check.checkNumber();
		curArr.push("5");
		view.display();
	},
	num6: function() {
		check.checkNumber();
		curArr.push("6");
		view.display();
	},
	num7: function() {
		check.checkNumber();
		curArr.push("7");
		view.display();
	},
	num8: function() {
		check.checkNumber();
		curArr.push("8");
		view.display();
	},
	num9: function() {
		check.checkNumber();
		curArr.push("9");
		view.display();
	},
	decimal: function() {
		if (completed === false) {
			let previousItem = curArr[curArr.length - 1]
			if (previousItemCheckArr.some(n => n === previousItem)) {
				curArr.push("0");
				curArr.push(".");
				view.display();
			} else {
				curArr.push(".");
				check.checkDecimal();
			}
		} else
		// if result is interger -> continute to work
		if (result % 1 == 0) {
			curArr = (result.toString()).match(/\d/g);
			curArr.push(".");
			view.display();
			completed = false;
		}
	},
	sum: function() {
		check.checkEquationCompleted();

		curArr.push("+");
		check.checkEquation();
	},
	subtract: function() {
		check.checkEquationCompleted();

		curArr.push("-");
		check.checkEquation();
	},
	multiply: function() {
		check.checkEquationCompleted();

		if (curArr[0] != undefined) {
			curArr.push("*");
			check.checkEquation();
		}
	},
	divide: function() {
		check.checkEquationCompleted();

		if (curArr[0] != undefined) {
			curArr.push("/");
			check.checkEquation();
		}
	},
}

let cal = {
	calculate: function() {
		let [, a, operator, b] = regex.exec(curDisplay);
		(a == "") ? (a = 0) : (a = Number(a));
		(b == "" || b == "+" || b == "-") ? (b = 0) : (b = Number(b));
		// console.log(a, operator, b);
		switch (operator) {
			case "+":
				result = a + b;
				break;
			case "-":
				result = a - b;
				break;
			case "*":
				result = a * b;
				break;
			case "/":
				result = a / b;
				break;
			default:
				result = a;
		};
		view.display();
		completed = true;
	},
	testStr: function() {
		view.display();
		console.log(regex.test(curDisplay))
		console.log(regex.exec(curDisplay))
	},
	clearAll: function() {
		curArr = [];
		curDisplay = "";
		result = 0;
		view.display()
	},
	clear: function() {
		curArr.splice((curArr.length - 1), 1);
		view.display()
	},
}

let check = {
	checkDecimal: function() {
		if ((/([\+\-\*\/]\d+\.$)|(^[\-\+]{0,1}\d+.$)/).test(curArr.join(""))) {
			view.display()
		} else {
			cal.clear()
		}
	},
	checkNumber: function() {
		if (completed) {
					curArr = [];
					curDisplay = 0;
					completed = false;
			}
		},
		checkEquation: function() {
			if (regex.test(curArr.join(""))) {
				view.display()
			} else {
				// if (a + b +) -> (result = a+b) -> display: result
				const lastItem = curArr[(curArr.length - 1)];
				cal.clear();
				if (regexFull.test(curArr.join(""))) {
					cal.calculate();
					curArr = (round(result).toString()).match(/[\-\d\.]/g);
					curArr.push(lastItem);
					view.display();
					completed = false;
				}
			}
		},
		checkEquationCompleted: function() {
			if (completed) {
				curArr = (round(result).toString()).match(/[\-\d\.]/g);
				completed = false;
			}
		},

	};

// view handler
let view = {
	display: function() {
		curDisplay = curArr.join("")
		displayViewer.innerHTML = curDisplay;
		resultViewer.innerHTML = result;
	},
}
view.display();


//function lam tron
function round(num) {
	let decimal = num % 1;
	let int = num - decimal;
	if((decimal * 100) % 1 >= 0.5) {
		decimal = (Math.floor(decimal*100) + 1)/100
	} else {
		decimal = (Math.floor(decimal*100))/100
	}
	return int+decimal;
}
