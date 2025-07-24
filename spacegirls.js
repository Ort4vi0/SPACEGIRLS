const { clear } = require("console");
const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let missoes = [];
// let missao = {
//   Nome: nome,
//   Destino: destino,
//   Prioridade: prioridade,
//   tripulante : [],
// };

function exibirMenu() {
  console.log(
    "=========MENU-DA-TRIPULAÇÃO-SPACEGIRLS=========\n1 - Adicionar missão\n2 - Listar missões\n3 - Editar missao\n4 - Marcar como concluída\n5 - Filtrar por prioridades\n6 - Ranking de destinos\n7 - Listar por tripulantes\n0 - Sair do programa"
  );
  rl.question("Insira a opção desejada.\n", (opcaoMenu) => {
    opcaoMenu = parseInt(opcaoMenu, 10);
    switch (opcaoMenu) {
      case 1:
        adicionarMissao();
        break;
      case 2:
        listarMissoes();
        break;
      case 3:
        editarMissao();
        break;
      case 4:
        marcarConcluido();
        break;
      case 5:
        filtrarPrioridade();
        break;
      case 6:
        console.clear();
        rankingDestinos();
        break;
      case 7:
        listarPorTripulantes();
        break;
      case 0:
        process.exit();
        break;
      default:
        console.log("Insira uma opção válida!\n");
        exibirMenu();
    }
  });
}

function adicionarMissao() {
    rl.question("Insira o nome da missão que deseja adicionar: \n", (nome) => {
      rl.question("Insira o destino da missão: ", (destino) => {
        destino = destino.toLowerCase();
        rl.question(
          "Insira qual a prioridade da missão:\n1-Minima\n2-Baixa\n3-Média\n4-Alta\n5-Crítico\n",
          (prioridade) => {
            prioridade = parseInt(prioridade);
            adicionarTripulante(nome, destino, prioridade, []);
          }
        );
      });
    });
  }
  
  function adicionarTripulante(nome, destino, prioridade, tripulantesAtuais) {
    rl.question(
      `Insira o nome do tripulante que seja adicionar na missão "${nome}":\n`,
      (nomeTripulante) => {
        tripulantesAtuais.push(nomeTripulante);
        rl.question(
          `Deseja adicionar outro tripulante na missão ${nome}?\n1-Sim\nOutro-Não\n`,
          (outroTripulante) => {
            outroTripulante = parseInt(outroTripulante);
            switch (outroTripulante) {
              case 1:
                adicionarTripulante(nome, destino, prioridade, tripulantesAtuais);
                break;
              default:
                const missao = {
                  Nome: nome,
                  Destino: destino,
                  Prioridade: prioridade,
                  tripulantes: tripulantesAtuais,
                  concluida: false,
                };
                // Tem que ter um array de tripulante dentro do objeto missao
                // Adicionar ao ultimo indice do array o tripulante
                missoes.push(missao);
                console.log("Missao adicionada com sucesso!");
                exibirMenu();
                break;
            }
          }
        );
      }
    );
  }
  
  function listarMissoes() {
    missoes.forEach((index, missao) => {
      console.log(missoes);
      exibirMenu();
    });
  }

function filtrarPrioridade() {
  console.clear();
  console.log(
    "Filtre as missões por prioridade\nAs PRIORIDADES vão de 1 a 5, com importância crescente.\n"
  );
  rl.question("Digite a prioridade desejada: ", (filtro) => {
    filtro = parseInt(filtro,10)
    if(isNaN(filtro) || filtro < 1 || filtro > 5){
        console.log("Prioridade inválida.\nDigite um número de 1 a 5, por favor.")
        filtrarPrioridade();
        return;
    }
    if (missoes.length == 0) {
      console.log("Não há missões no momento. Voltando ao menu.");
      exibirMenu();
      return;
    }
    const missoesFiltradas = missoes.filter((missao) => missao.Prioridade === filtro);
    if (missoesFiltradas.length > 0){
      console.clear()
      console.log(`======-MISSÕES COM PRIORIDADE ${filtro}-======`);
      missoesFiltradas.forEach((missao, index) => {
        console.log(`Nº da Missão: ${index + 1} || Prioridade: ${missao.Prioridade} | Nome: ${missao.Nome}  | Destino: ${missao.Destino} | Tripulante: ${missao.tripulantes}`
        );
      });
    } else {
        console.clear()
        console.log("Nenhuma missão com a prioridade " + filtro + " encontrada.")
    }
    exibirMenu()
  });
}

exibirMenu();