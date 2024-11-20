// script.js

const form = document.getElementById('matricula-form');
const submitBtn = document.getElementById('submit-btn');
const matriculasTableBody = document.getElementById('matriculas-table-body');
const searchName = document.getElementById('search-name');  // Campo de busca por nome
const searchType = document.getElementById('search-type');  // Campo de busca por tipo de matrícula

let matriculas = [];

// Função para gerar número de matrícula único de 8 dígitos
function gerarNumeroMatricula() {
    return Math.floor(10000000 + Math.random() * 90000000); // Gera um número aleatório de 8 dígitos
}

// Função para salvar as matrículas no LocalStorage
function salvarNoLocalStorage() {
    localStorage.setItem('matriculas', JSON.stringify(matriculas));
}

// Função para carregar as matrículas do LocalStorage
function carregarDoLocalStorage() {
    const matriculasData = localStorage.getItem('matriculas');
    if (matriculasData) {
        matriculas = JSON.parse(matriculasData);
    }
}

// Função para exibir as matrículas na tabela
function renderMatriculas() {
    matriculasTableBody.innerHTML = ''; // Limpa a tabela

    // Filtro dos dados (aplicando filtro de busca por nome e tipo)
    const filteredMatriculas = matriculas.filter(matricula => {
        const nomeMatch = matricula.nome.toLowerCase().includes(searchName.value.toLowerCase());
        const tipoMatch = matricula.tipo.toLowerCase().includes(searchType.value.toLowerCase());
        return nomeMatch && tipoMatch;
    });

    filteredMatriculas.forEach((matricula, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${matricula.numero}</td>
            <td>${matricula.nome}</td>
            <td>${matricula.tipo}</td>
            <td>${matricula.dataInicio}</td>
            <td>
                <button class="edit-btn" onclick="editarMatricula(${index})">Editar</button>
                <button class="delete-btn" onclick="deletarMatricula(${index})">Excluir</button>
            </td>
        `;
        matriculasTableBody.appendChild(row);
    });
}

// Função para adicionar ou editar matrícula
function handleSubmit(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const tipo = document.getElementById('tipo').value;
    const dataInicio = document.getElementById('data-inicio').value;
    const numeroMatricula = document.getElementById('numero-matricula').value || gerarNumeroMatricula();

    if (submitBtn.dataset.editingIndex !== undefined) {
        // Editando matrícula existente
        const index = submitBtn.dataset.editingIndex;
        matriculas[index] = { numero: numeroMatricula, nome, tipo, dataInicio };
        submitBtn.removeAttribute('data-editing-index');
    } else {
        // Adicionando nova matrícula
        matriculas.push({ numero: numeroMatricula, nome, tipo, dataInicio });
    }

    salvarNoLocalStorage();  // Salva no LocalStorage
    form.reset();
    renderMatriculas();
}

// Função para editar matrícula
function editarMatricula(index) {
    const matricula = matriculas[index];
    document.getElementById('nome').value = matricula.nome;
    document.getElementById('tipo').value = matricula.tipo;
    document.getElementById('data-inicio').value = matricula.dataInicio;
    document.getElementById('numero-matricula').value = matricula.numero;

    submitBtn.dataset.editingIndex = index;
}

// Função para deletar matrícula
function deletarMatricula(index) {
    matriculas.splice(index, 1);
    salvarNoLocalStorage();  // Atualiza o LocalStorage após a exclusão
    renderMatriculas();
}

// Função para aplicar os filtros de busca
function applyFilters() {
    renderMatriculas();  // Re-renderiza a tabela sempre que houver alteração no filtro
}

// Adiciona eventos de busca aos campos de filtro
searchName.addEventListener('input', applyFilters);
searchType.addEventListener('input', applyFilters);

// Inicializa a página
form.addEventListener('submit', handleSubmit);
carregarDoLocalStorage();  // Carrega as matrículas do LocalStorage
renderMatriculas();  // Exibe as matrículas na tabela
