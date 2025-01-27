function buscarDadosAvancados(filtro, valorBusca) {
  var ss = SpreadsheetApp.openById("1ssFtFcTFh5Pcn-1UKdFm3E9kUIfRZStApR7fCAuukmc");
  var sheet = ss.getSheetByName("Base principal");

  if (!sheet) {
    throw new Error('Planilha "Base principal" não encontrada.');
  }

  var dados = sheet.getDataRange().getValues();
  if (!dados || dados.length === 0) {
    throw new Error('Nenhum dado encontrado na planilha.');
  }

  // Índices das colunas
  var indices = {
    telefone: 3, // Coluna D
    nome: 4,     // Coluna E
    cidade: 6    // Coluna G
  };

  var resultados = [];
  for (var i = 1; i < dados.length; i++) {
    var linha = dados[i];
    var telefoneLinha = linha[indices.telefone];
    var nomeLinha = linha[indices.nome];
    var cidadeLinha = linha[indices.cidade];

    // Verificar condições de busca
    var match = false;
    if (filtro === "telefone") {
      match = telefoneLinha && telefoneLinha.toString().includes(valorBusca);
    } else if (filtro === "nome") {
      match = nomeLinha && nomeLinha.toLowerCase().includes(valorBusca.toLowerCase());
    }

    if (match) {
      resultados.push({
        colunaA: linha[0],  // Coluna A
        telefone: telefoneLinha,  // Coluna D
        nome: nomeLinha,  // Coluna E
        cidade: cidadeLinha,  // Coluna G
      });
    }
  }

  return resultados;
}

function buscarDetalhes(tel) {
  var ss = SpreadsheetApp.openById("1ssFtFcTFh5Pcn-1UKdFm3E9kUIfRZStApR7fCAuukmc");
  var sheet = ss.getSheetByName("Base principal");

  if (!sheet) {
    throw new Error('Planilha "Base principal" não encontrada.');
  }

  var dados = sheet.getDataRange().getValues();
  var telefoneIndex = 3; // Coluna do telefone (D)

  // Encontra o índice da linha do telefone
  var indice = dados.findIndex(linha => String(linha[telefoneIndex]) === String(tel));

  if (indice === -1) {
    throw new Error("Registro não encontrado.");
  }

  var detalhe = dados[indice];

  return {
    baseInicial: detalhe[0] || "Sem base",
    unidade: detalhe[1] || "Sem unidade informada",
    turma: detalhe[2] || "Sem turma informada",
    telefone: detalhe[3] ? String(detalhe[3]) : "Não informado",
    nome: detalhe[4] || "Sem nome", // Garante um valor padrão
    email: detalhe[5] || "Sem e-mail informado",
    cidade: detalhe[6] || "Sem cidade",
    contatoInicial: detalhe[7] || "Contato não iniciado",
    statusContato: detalhe[8] || "Sem status informado",
    responsavel: detalhe[12] || "Sem analista informado", // Coluna M
    retornoAluno: detalhe[13] || "Sem retorno do aluno",
    preparacao2025: detalhe[14] || "Não respondeu",
    textoLivre: detalhe[27] || "Sem texto livre" // Coluna AB
  };
}
function buscarOpcoesColunaM() {
  const ss = SpreadsheetApp.openById("1ssFtFcTFh5Pcn-1UKdFm3E9kUIfRZStApR7fCAuukmc");
  const sheet = ss.getSheetByName("Base principal");
  const dados = sheet.getDataRange().getValues();

  const responsaveis = [...new Set(dados.slice(1).map(linha => linha[12]).filter(Boolean))];
  return responsaveis;
}


function salvarAlteracoes(telefone, dadosEdicao) {
  const ss = SpreadsheetApp.openById("1ssFtFcTFh5Pcn-1UKdFm3E9kUIfRZStApR7fCAuukmc");
  const sheet = ss.getSheetByName("Base principal");
  const dados = sheet.getDataRange().getValues();
  const telefoneIndex = 3; // Coluna do telefone (D)
  
  const indice = dados.findIndex(linha => String(linha[telefoneIndex]) === String(telefone));
  if (indice === -1) {
    throw new Error("Registro não encontrado.");
  }

  if (dadosEdicao.colunaM) {
    sheet.getRange(indice + 1, 13).setValue(dadosEdicao.colunaM); // Coluna M
  }
  if (dadosEdicao.colunaAB) {
    sheet.getRange(indice + 1, 28).setValue(dadosEdicao.colunaAB); // Coluna AB
  }
  if (dadosEdicao.data1) {
    sheet.getRange(indice + 1, 10).setValue(dadosEdicao.data1); // Coluna J
  }
  if (dadosEdicao.data2) {
    sheet.getRange(indice + 1, 11).setValue(dadosEdicao.data2); // Coluna K
  }
  if (dadosEdicao.data3) {
    sheet.getRange(indice + 1, 12).setValue(dadosEdicao.data3); // Coluna L
  }
}



function atualizarColunas(telefone, colunaM, colunaAB) {
  const ss = SpreadsheetApp.openById("1ssFtFcTFh5Pcn-1UKdFm3E9kUIfRZStApR7fCAuukmc");
  const sheet = ss.getSheetByName("Base principal");
  const dados = sheet.getDataRange().getValues();
  const telefoneIndex = 3; // Coluna do telefone (D)

  const indice = dados.findIndex(linha => String(linha[telefoneIndex]) === String(telefone));
  
  if (indice === -1) {
    throw new Error("Registro não encontrado.");
  }

  // Atualiza as colunas M e AB
  sheet.getRange(indice + 1, 13).setValue(colunaM); // Coluna M (Índice 13)
  sheet.getRange(indice + 1, 28).setValue(colunaAB); // Coluna AB (Índice 28)
}



//buscarDetalhes(11973270278)
