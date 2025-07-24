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
    "=========MENU=========\n1-Adicionar missão\n2-Listar missões\n3-Editar missao\n4-Marcar como concluída\n5-Filtrar por prioridades\n6-Ranking de destinos\n7-Listar por tripulantes\n0-Sair do programa"
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

exibirMenu()

function editarMissao() {
  console.clear();

  console.log("====== MISSÕES DISPONÍVEIS ======");
  if (missoes.length === 0) {
    console.log("Nenhuma missão cadastrada.");
    exibirMenu();
    return;
  }

  missoes.forEach((missao, index) => {
    console.log(
      `ID: ${index + 1} | Nome: ${missao.Nome} | Prioridade: ${missao.Prioridade} | Destino: ${missao.Destino}`
    );

    if (missao.tripulantes && Array.isArray(missao.tripulantes) && missao.tripulantes.length > 0) {
      console.log('  --- Tripulante(s) desta missão ---');
      missao.tripulantes.forEach((tripulante) => {
        console.log(`  - ${tripulante}`);
      });
    } else {
      console.log('  Nenhum tripulante atribuído a esta missão.');
    }
    console.log('------------------------------------');
  });

  rl.question('Qual missão você deseja editar? Digite o ID: ', (idMissaoInput) => {
    const idMissao = parseInt(idMissaoInput);

    if (isNaN(idMissao) || idMissao < 1 || idMissao > missoes.length) {
      console.clear();
      console.log("ID de missão inválido. Por favor, digite um ID existente.");
      exibirMenu();
      return;
    }

    const indexMissao = idMissao - 1;
    const missaoParaEditar = missoes[indexMissao];

    rl.question(`(Atual: ${missaoParaEditar.Nome}) Digite o NOVO nome da missão (ou deixe em branco): `, (novoNome) => {
      if (novoNome !== '') {
        missaoParaEditar.Nome = novoNome;
      }

      rl.question(`(Atual: ${missaoParaEditar.Destino}) Digite o NOVO destino da missão (ou deixe em branco): `, (novoDestino) => {
        if (novoDestino !== '') {
          missaoParaEditar.Destino = novoDestino;
        }

        solicitarNovaPrioridade()

        function solicitarNovaPrioridade() {
          rl.question(
            `(Atual: ${missaoParaEditar.Prioridade}) Digite a NOVA prioridade da missão (1 a 5, ou deixe em branco): `,
            (novaPrioridadeInput) => {
              if (novaPrioridadeInput === '') {
                solicitarNovosTripulantes();
              }

              const parsedPrioridade = parseInt(novaPrioridadeInput);
              if (isNaN(parsedPrioridade) || parsedPrioridade < 1 || parsedPrioridade > 5) {
                console.clear();
                console.log("Prioridade inválida.");
                solicitarNovaPrioridade();
              } else {
                missaoParaEditar.Prioridade = parsedPrioridade;
                solicitarNovosTripulantes();
              }
            }
          );
        }

        function solicitarNovosTripulantes() {
          rl.question(
            "Deseja adicionar novos tripulantes a esta missão? (s/n): ",
            (respostaAddTripulante) => {
              if (respostaAddTripulante.toLowerCase() === 's') {
                adicionarTripulanteNaEdicao();
              } else {
                console.clear();
                console.log("=== Missão editada===");
                exibirMenu();
              }
            }
          );
        }

        function adicionarTripulanteNaEdicao() {
          rl.question(`Insira o nome do tripulante que deseja adicionar à missão "${missaoParaEditar.Nome}": `, (nomeTripulante) => {
              missaoParaEditar.tripulantes.push(nomeTripulante);
              console.log(`"${nomeTripulante}" adicionado à missão.`);
            rl.question(
              "Deseja adicionar outro tripulante a esta missão? (s/n): ",
              (continuarAdicionar) => {
                if (continuarAdicionar.toLowerCase() === 's') {
                  console.clear();
                  adicionarTripulanteNaEdicao();
                } else {
                  console.clear();
                  console.log("=== Missão editada===");
                  exibirMenu();
                }
              }
            );
          });
        }
      });
    });
  });
}