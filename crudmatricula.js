const form = document.getElementById('matricula-form');
const submitBtn = document.getElementById('submit-btn');
const matriculasTableBody = document.getElementById('matriculas-table-body');

let matriculas = [];

// Função para gerar número de matrícula único de 8 dígitos
function gerarNumeroMatricula() {
    return Math.floor(10000000 + Math.random() * 90000000); // Gera um número aleatório de 8 dígitos
}

// Função para exibir as matrículas na tabela
function renderMatriculas() {
    matriculasTableBody.innerHTML = ''; // Limpa a tabela

    matriculas.forEach((matricula, index) => {
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
    renderMatriculas();
}

// Inicialização da página
form.addEventListener('submit', handleSubmit);
renderMatriculas();
