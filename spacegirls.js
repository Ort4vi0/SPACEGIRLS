const { clear } = require("console");
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

function filtrarPrioridade(){
    console.clear()
    console.log('Filtre as missões por prioridade\nAs PRIORIDADES vão de 1 a 5, com importância crescente.')
    rl.question('Digite a prioridade desejada: ')
}
