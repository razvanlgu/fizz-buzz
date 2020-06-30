const readlineSync = require('readline-sync');

abstract class Rule {
    divNumber: number;
    text: string
    protected constructor(divNumber: number, text: string) {
        this.divNumber = divNumber;
        this.text = text;
    }

    abstract applyRule(msg: string, nr: number): string;
}

class RuleFizz extends Rule{
    constructor() {
        super(3, "Fizz");
    }

    applyRule(msg: string, nr: number): string {
        if (nr % this.divNumber == 0) {
            return this.text;
        }
        return msg;
    }
}

class RuleBuzz extends Rule{
    constructor() {
        super(5, "Buzz");
    }

    applyRule(msg: string, nr: number): string {
        if (nr % this.divNumber == 0) {
            return msg + this.text;
        }
        return msg;
    }
}

class RuleBang extends Rule{
    constructor() {
        super(7, "Bang");
    }

    applyRule(msg: string, nr: number): string {
        if (nr % this.divNumber == 0) {
            return msg + this.text;
        }
        return msg;
    }
}

class RuleBong extends Rule{
    constructor() {
        super(11, "Bong");
    }

    applyRule(msg: string, nr: number): string {
        if (nr % this.divNumber == 0) {
            return this.text;
        }
        return msg;
    }
}

class RuleFezz extends Rule{
    constructor() {
        super(13, "Fezz");
    }

    applyRule(msg: string, nr: number): string {
        if (nr % this.divNumber == 0) {
            return addFezz(msg);
        }
        return msg;
    }
}

class RuleRev extends Rule{
    constructor() {
        super(17, "");
    }

    applyRule(msg: string, nr: number): string {
        if (nr % this.divNumber == 0) {
            return revWords(msg);
        }
        return msg;
    }
}

let rulesInd: number[] = [];
const noRules = readlineSync.questionInt("Enter the number of rules: ");
for (let i = 0; i < noRules; i++) {
    rulesInd[i] = readlineSync.questionInt("Rule " + (i + 1).toString() + ": ");
}

let rules: Rule[] = rulesFactory(rulesInd);

// console.log(rulesInd);
// console.log(rules);

console.log("Enter any integer (0 for exit).");
while (true) {
    const x = readlineSync.questionInt();
    if (x == 0) {
        break;
    }
    console.log(applyRules(x, rules));
}

function rulesFactory(rulesInd: number[]): Rule[] {
    let rules: Rule[] = [];
    rulesInd.sort();
    let idx: number = 0;
    for (let i = 0; i < noRules; i++) {
        switch (rulesInd[i]) {
            case 3:
                rules[idx] = new RuleFizz();
                idx++;
                break;
            case 5:
                rules[idx] = new RuleBuzz();
                idx++;
                break;
            case 7:
                rules[idx] = new RuleBang();
                idx++;
                break;
            case 11:
                rules[idx] = new RuleBong();
                idx++;
                break;
            case 13:
                rules[idx] = new RuleFezz();
                idx++;
                break;
            case 17:
                rules[idx] = new RuleRev();
                idx++;
                break;
            default:
                console.log(rulesInd[i].toString() + " is not a valid rule!")
        }
    }

    return rules;
}

function applyRules(nr: number, rules: Rule[]): string {
    let msg: string = "";
    rules.forEach((rule: Rule) => msg = rule.applyRule(msg, nr));

    if (msg.length > 0) {
        return msg;
    } else {
        return nr.toString();
    }
}




// function printFizz(x: number): void {
//     let msg: string = "";
//     if (x % 3 == 0) {
//         msg = "Fizz";
//     }
//     if (x % 5 == 0) {
//         msg = msg + "Buzz";
//     }
//     if (x % 7 == 0) {
//         msg = msg + "Bang";
//     }
//     if (x % 11 == 0) {
//         msg = "Bong";
//     }
//     if (x % 13 == 0) {
//         msg = addFezz(msg);
//     }
//     if (x % 17 == 0 && msg.length > 0) {
//         msg = revWords(msg);
//     }
//
//     if (msg.length > 0) {
//         console.log(msg);
//     } else {
//         console.log(x);
//     }
// }
//
// Add Fezz before first occurence of a word that starts with "B"
function addFezz(s: string): string {
    const indexOfB: number = s.indexOf("B");
    const fistPart: string = s.substring(0, indexOfB);
    const lastPart: string = s.substring(indexOfB, s.length);
    return fistPart + "Fezz" + lastPart;
}

// Reverse words order
function revWords(s: string): string {
    if (s.length == 0) {
        return s;
    }

    let result: string = "";
    let tmp: string = "";
    for (var i = 0; i < s.length; i++) {
        if (s[i] == s[i].toUpperCase()) {
            result = tmp.concat(result);
            tmp = s[i];
        } else {
            tmp += s[i];
        }
    }
    result = tmp.concat(result);
    return result;
}
