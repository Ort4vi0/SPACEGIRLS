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
    console.clear();
    rl.question("Insira o nome da missão que deseja adicionar: \n", (nome) => {
      console.clear()
      rl.question("Insira o destino da missão: ", (destino) => {
        destino = destino.toLowerCase();
        console.clear()
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
      console.clear()
    rl.question(
      `Insira o nome do tripulante que seja adicionar na missão "${nome}":\n`,
      (nomeTripulante) => {
        nomeTripulante = nomeTripulante.toLowerCase();
        tripulantesAtuais.push(nomeTripulante);
        console.clear();
        console.log(`Tripulante '${nomeTripulante}' adicionado na missao "${nome}"`);
        console.log("--------------------------------------")
        rl.question(
          `Deseja adicionar outro tripulante na missão ${nome}?\n1-Sim\nOutro-Não\n`,
          (outroTripulante) => {
            outroTripulante = parseInt(outroTripulante);
            switch (outroTripulante) {
              case 1:
                  console.clear()
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
                console.clear()
                missoes.push(missao);
                console.log("Missao adicionada com sucesso!\n");
                exibirMenu();
                break;
            }
          }
        );
      }
    );
  }

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

function filtrarPrioridade() {
  console.clear();
  console.log(
    "Filtre as missões por prioridade\nAs PRIORIDADES vão de 1 a 5, com importância crescente.\n"
  );
  rl.question("Digite a prioridade desejada: ", (filtro) => {
    filtro = parseInt(filtro, 10);
    if (isNaN(filtro) || filtro < 1 || filtro > 5) {
      console.log(
        "Prioridade inválida.\nDigite um número de 1 a 5, por favor."
      );
      filtrarPrioridade();
      return;
    }
    if (missoes.length == 0) {
      console.log("Não há missões no momento. Voltando ao menu.");
      exibirMenu();
      return;
    }
    const missoesFiltradas = missoes.filter(
      (missao) => missao.Prioridade === filtro
    );
    if (missoesFiltradas.length > 0) {
      console.clear();
      console.log(`======-MISSÕES COM PRIORIDADE ${filtro}-======`);
      missoesFiltradas.forEach((missao, index) => {
        console.log(
          `Nº da Missão: ${index + 1} || Prioridade: ${
            missao.Prioridade
          } | Nome: ${missao.Nome}  | Destino: ${
            missao.Destino
          } | Tripulante: ${missao.tripulantes}`
        );
      });
    } else {
      console.clear();
      console.log("Nenhuma missão com a prioridade " + filtro + " encontrada.");
    }
    exibirMenu();
  });
}

function contagemDestinos(missoes){
    const contagem = missoes.reduce((acumulador, missao) => {
        let Destino = missao.Destino
      acumulador[Destino] = (acumulador[Destino] || 0) + 1
      return acumulador
    },{})
    return contagem
 
}

function rankingDestinos(resultadoContagem){
  resultadoContagem = contagemDestinos(missoes)
    console.log("------RANKING DE DESTINOS------")
    for(const [destino, quantidade] of Object.entries(resultadoContagem)){
        console.log(`${destino}: ${quantidade} missões`)
    }
    exibirMenu()
}         

function listarMissoes() {
  console.clear()
  console.log(`==== MISSOES ATUAIS: ${missoes.length} ===`)
  if (missoes.length == 0){
    console.log("Não há missoes para serem feitas")
    rl.question("Pressione ENTER para retorar ao menu", exibirMenu)
  } else {
    ListarosBagui();
    rl.question("Pressione ENTER para retornar ao MENU", exibirMenu)
  }
}

function ListarosBagui(){
  missoes.forEach((missao, index ) => {
      console.log(`Missão numero: ${index + 1} | Nivel de Prioridade: ${missao.Prioridade} | Nome da Missão: ${missao.Nome} | Destino: ${missao.Destino} | Tripulantes: ${missao.tripulantes} | Status: ${missao.concluida ? "CONCLUÍDA" : "PENDENTE"}\n`);
    });
}

function ListarTripulantes(){
  console.log("Nome de todos os Tripulantes Totais das Missoes: ")
  missoes.forEach((missao, index ) => {
    index + 1;
    console.log(`${missao.tripulantes}`);
  });
  console.log("-".repeat(20))
}

function listarPorTripulantes(){
  console.clear();
  ListarTripulantes();
  rl.question("Qual o nome do Tripulante que deseja listar suas missoes?: ", (filtro) => {
    const filtroLowerCase = filtro.trim().toLowerCase();
    const missoesFiltradas = missoes.filter(missao =>
      missao.tripulantes.some(tripulante => tripulante.includes(filtroLowerCase))
    );

    if (missoesFiltradas.length > 0) {
      console.log(`\n=== Missões do Tripulante: ${filtro.charAt(0).toUpperCase() + filtro.slice(1)} ===`);
      missoesFiltradas.forEach((missao, index) => {
        const status = missao.concluida ? "CONCLUÍDA" : "PENDENTE";
        console.log(`Missão numero: ${index + 1} | Nivel de Prioridade: ${missao.Prioridade} | Nome da Missão: ${missao.Nome} | Destino: ${missao.Destino} | Tripulantes: ${missao.tripulantes.join(', ')} | Status: ${status}\n`);
      });
    } else {
      console.log(`Nenhuma missão encontrada para o tripulante "${filtro}".`);
    }
    console.log("\nPressione Enter para voltar ao menu");
    rl.question("", exibirMenu);
  });
}

function marcarConcluido() {
  console.clear();
  console.log("====== MARCAR MISSÃO COMO CONCLUÍDA ======");
  if (missoes.length === 0) {
    console.log("Não há missoes a serem concluídas");
    exibirMenu();
  }
  missoes.forEach((missao, index) => {
    const status = missao.concluida ? "CONCLUÍDA" : "PENDENTE";
    console.log(
      `ID: ${index + 1} | Nome: ${missao.Nome} | Status: ${status}`
    );
  });
  rl.question("Digite o ID da missão que deseja marcar como concluído: ", (idMissaoInput) => {
    const idMissao = parseInt(idMissaoInput);
    if (isNaN(idMissao) || idMissao < 1 || idMissao > missoes.length) {
      console.clear();
      console.log("O ID inserido não existe, te deixo tentar denovo!");
      exibirMenu();
    }
    const indexMissao = idMissao - 1;
    missoes[indexMissao].concluida = true;
    console.clear();
    console.log(`A missão "${missoes[indexMissao].Nome}" foi marcada como CONCLUÍDA.`);
    exibirMenu();
  });
}

exibirMenu();
