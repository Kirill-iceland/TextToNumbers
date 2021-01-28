const NTT = require("./src/built/NTT.js")
const readline = require('readline')

// const Start = 0;
// const End = 10000;

// for(let Number = Start; Number <= End; Number += 57){
//     console.log(NTT.toText(Number))
// }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    console.log(input.NumbertoText());
});