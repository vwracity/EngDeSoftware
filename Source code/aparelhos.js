// script.js

// Recupera os dados do localStorage, ou cria um array vazio se não houver dados
let aparelhos = JSON.parse(localStorage.getItem('aparelhos')) || [];
let indexEditado = -1; // Para controlar o aparelho a ser editado

// Função para renderizar a tabela
function renderizarTabela() {
    const tabelaAparelhos = document.getElementById('tabelaAparelhos').getElementsByTagName('tbody')[0];
    tabelaAparelhos.innerHTML = '';  // Limpa a tabela antes de renderizar novamente

    aparelhos.forEach((aparelho, index) => {
        const row = tabelaAparelhos.insertRow();
        row.innerHTML = `
            <td>${aparelho.nome}</td>
            <td>${aparelho.tipo}</td>
            <td>${aparelho.marca}</td>
            <td>${aparelho.modelo}</td>
            <td>${aparelho.data}</td>
            <td>${aparelho.ultimaManutencao}</td>
            <td>${aparelho.status}</td>
            <td>
                <button class="editar" onclick="editarAparelho(${index})">Editar</button>
                <button class="excluir" onclick="excluirAparelho(${index})">Excluir</button>
            </td>
        `;
    });
}

// Função para salvar ou editar um aparelho
function salvarAparelho(event) {
    event.preventDefault();  // Previne o envio do formulário

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const data = document.getElementById('data').value;
    const status = document.getElementById('status').value;
    const ultimaManutencao = new Date().toLocaleDateString(); // Data atual como última manutenção

    const aparelho = { nome, tipo, marca, modelo, data, ultimaManutencao, status };

    if (indexEditado === -1) {
        aparelhos.push(aparelho); // Adiciona novo aparelho
    } else {
        aparelhos[indexEditado] = aparelho; // Edita aparelho existente
    }

    document.getElementById('formAparelho').reset(); // Limpa o formulário
    indexEditado = -1; // Reseta a variável de edição

    // Salva o array de aparelhos no localStorage
    localStorage.setItem('aparelhos', JSON.stringify(aparelhos));

    renderizarTabela(); // Re-renderiza a tabela
}

// Função para editar um aparelho
function editarAparelho(index) {
    const aparelho = aparelhos[index];

    document.getElementById('nome').value = aparelho.nome;
    document.getElementById('tipo').value = aparelho.tipo;
    document.getElementById('marca').value = aparelho.marca;
    document.getElementById('modelo').value = aparelho.modelo;
    document.getElementById('data').value = aparelho.data;
    document.getElementById('status').value = aparelho.status;
    document.getElementById('indexAparelho').value = index;

    indexEditado = index; // Marca que estamos editando
}

// Função para excluir um aparelho
function excluirAparelho(index) {
    aparelhos.splice(index, 1); // Remove o aparelho do array

    // Salva o array de aparelhos no localStorage após exclusão
    localStorage.setItem('aparelhos', JSON.stringify(aparelhos));

    renderizarTabela(); // Re-renderiza a tabela
}

// Função para filtrar a tabela por nome ou status
function filtrarTabela() {
    const buscaNome = document.getElementById('buscaNome').value.toLowerCase();
    const buscaStatus = document.getElementById('buscaStatus').value;

    const aparelhosFiltrados = aparelhos.filter(aparelho => {
        const nomeOk = aparelho.nome.toLowerCase().includes(buscaNome);
        const statusOk = buscaStatus ? aparelho.status === buscaStatus : true;
        return nomeOk && statusOk;
    });

    // Re-renderiza a tabela com os aparelhos filtrados
    const tabelaAparelhos = document.getElementById('tabelaAparelhos').getElementsByTagName('tbody')[0];
    tabelaAparelhos.innerHTML = '';

    aparelhosFiltrados.forEach((aparelho, index) => {
        const row = tabelaAparelhos.insertRow();
        row.innerHTML = `
            <td>${aparelho.nome}</td>
            <td>${aparelho.tipo}</td>
            <td>${aparelho.marca}</td>
            <td>${aparelho.modelo}</td>
            <td>${aparelho.data}</td>
            <td>${aparelho.ultimaManutencao}</td>
            <td>${aparelho.status}</td>
            <td>
                <button class="editar" onclick="editarAparelho(${index})">Editar</button>
                <button class="excluir" onclick="excluirAparelho(${index})">Excluir</button>
            </td>
        `;
    });
}

// Inicializa a tabela com os dados do localStorage
renderizarTabela();
