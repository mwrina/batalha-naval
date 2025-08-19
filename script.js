const tamanho = 5;
const numNavios = 3; 
let navios = [];
let acertos = 0;
let fimDeJogo = false; 

// Gerar tabuleiro (já implementado)
const tabuleiro = document.getElementById("tabuleiro"); // Pega no DOM o elemento que conterá a grade.
for (let y = 0; y < tamanho; y++) {                     // Loop das linhas (coordenada Y de 0 a tamanho-1).
  for (let x = 0; x < tamanho; x++) {                   // Loop das colunas (coordenada X de 0 a tamanho-1).
    const celula = document.createElement("div");       // Cria um elemento <div> para representar a célula.
    celula.classList.add("celula");                     // Adiciona a classe CSS "celula" para estilização.
    celula.dataset.x = x;                               // Armazena a coordenada X na célula para consulta no clique.
    celula.dataset.y = y;                               // Armazena a coordenada Y na célula para consulta no clique.
    celula.addEventListener("click", aoClicarNaCelula); // Registra o handler: quando clicar, chama aoClicarNaCelula.
    tabuleiro.appendChild(celula);                      // Insere a célula dentro do contêiner do tabuleiro no DOM.
  }
}

// ==========================
// Função para gerar navios
// ==========================
// TODO: Gerar 3 posições aleatórias únicas para os navios
function gerarNavios() {
  const posicoes = [];

  while (posicoes.length < numNavios) {
    const x = Math.floor(Math.random() * tamanho);
    const y = Math.floor(Math.random() * tamanho);

    // some -> Determines whether the specified callback function returns true for any element of an array.
    // ou seja, verifica se alguma posição se repete antes de adicionar ao array
    const duplicado = posicoes.some(p => p.x === x && p.y === y);
    if (!duplicado) {
      posicoes.push({ x, y });
    }
  }

  console.log("Navios gerados:", posicoes);
  return posicoes;
}


// Chamada inicial da função (não altere)
navios = gerarNavios();

// ==============================
// Função para tratar cliques
// ==============================
// TODO: Verificar se o clique foi acerto ou erro
// TODO: Marcar visualmente o resultado (💥 ou 🌊)
// TODO: Impedir clique repetido
// TODO: Encerrar jogo ao afundar todos os navios
function aoClicarNaCelula(event) {
  const celula = event.currentTarget;                   // A célula <div> que foi clicada
  const x = parseInt(celula.dataset.x);                 // Recupera a coordenada X
  const y = parseInt(celula.dataset.y);                 // Recupera a coordenada Y
  console.log(x,y);    
  
  // Impedir clique repetido: se já tem classe de acerto ou erro, não faz nada
  if (celula.classList.contains("acertou") || celula.classList.contains("errou")) {
    return;
  }

  // Verifica se existe um navio nessa posição
  const acertou = navios.some(navio => navio.x === x && navio.y === y);

  if (acertou) {
    celula.classList.add("acertou");
    celula.textContent = "💥";
    acertos++;

    if (acertos === numNavios) {
      fimDeJogo = true;
      document.getElementById("mensagem").textContent = "Parabéns! Você afundou todos os navios!";
    }
  } else {
    celula.classList.add("errou");
    celula.textContent = "🌊";
  }
}

// ==============================
// Testes Unitários no Console
// ==============================
// TODO: Testar se gerarNavios funciona corretamente
function testarGeracaoDeNavios() {
  const n = gerarNavios();

  // TESTE 1 - quantidade correta
  console.log("Teste 1 - Quantidade correta: ", n.length === numNavios); 
  // Verifica se a função retornou exatamente 'numNavios' posições.

  // TESTE 2 - posições únicas
  // - new Set() -> estrutura de dados do JavaScript que não permite valores duplicados. Se houver algum,
  // ele será automaticamente apagado
  // - n.map() -> mapeia n (navios), criando um novo array para aplicar a função a cada elemento
  // - p => `${p.x},${p.y}` -> transforma cada objeto em uma string "x,y"
  const unicos = new Set(n.map(p => `${p.x},${p.y}`));
  console.log("Teste 2 - Sem repetições:", unicos.size === numNavios);
  // Confere se não há coordenadas repetidas.

  // TESTE 3 - dentro do tabuleiro
  // .every() -> verifica se TODOS os elementos do array passam num condição
  // Condições:
  //    - p.x >= 0
  //    - p.x < tamanho
  //    - p.y >= 0
  //    - p.y < tamanho
  const dentroDosLimites = n.every(p => p.x >= 0 && p.x < tamanho && p.y >= 0 && p.y < tamanho);
  console.log("Teste 3 - Dentro do tabuleiro:", dentroDosLimites);
  // Garante que todas as posições estão entre 0 e tamanho-1, tanto para x quanto para y.
}

// Descomente para testar
testarGeracaoDeNavios();
