function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Base alunos')
    .addItem('Abrir Modal', 'abrirModal')  // Mantemos o menu para abrir o modal
    .addToUi();
}

function abrirModal() {
  var html = HtmlService.createHtmlOutputFromFile('interface-medverso')  // Substitua 'interface' pelo nome do seu arquivo HTML
    .setWidth(1322)  // Largura do modal - Pode ajustar conforme necessário
    .setHeight(1000);  // Altura do modal - Pode ajustar conforme necessário

  SpreadsheetApp.getUi().showModalDialog(html, 'Motor de busca - MEDVERSO - 24');  // Exibe o modal com o nome desejado
}
