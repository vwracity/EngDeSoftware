// Função para exibir todos os alunos cadastrados com seus respectivos exercícios
function exibirAlunos() {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const listaAlunosDiv = document.getElementById('alunos-cadastrados');

    let tableHTML = `
        <table>
            <tr>
                <th>Nome do Aluno</th>
                <th>Treino</th>
                <th>Exercícios</th>
                <th>Ações</th>
            </tr>
    `;

    alunos.forEach((aluno, index) => {
        const exerciciosHTML = aluno.exercicios.map((exercicio, excIndex) => `
            <p>${exercicio.nomeExercicio} (Séries: ${exercicio.serie} - Repetições: ${exercicio.repeticoes})
            <button onclick="editarExercicio(${index}, ${excIndex})">Editar</button>
            <button onclick="removerExercicio(${index}, ${excIndex})">Remover</button></p>
        `).join('');

        tableHTML += `
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.treino}</td>
                <td>${exerciciosHTML}</td>
                <td>
                    <button onclick="verExercicios(${index})">Ver Exercícios</button>
                    <button onclick="removerAluno(${index})">Remover</button>
                </td>
            </tr>
        `;
    });

    tableHTML += '</table>';
    listaAlunosDiv.innerHTML = tableHTML;
}

// Função para cadastrar novo exercício
document.getElementById('form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const treino = document.getElementById('treino').value;
    const nomeExercicio = document.getElementById('exercicio').value;
    const serie = document.getElementById('serie').value;
    const repeticoes = document.getElementById('repeticoes').value;

    const novoExercicio = { nomeExercicio, serie, repeticoes };

    // Verificando se o aluno já existe
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    let aluno = alunos.find(aluno => aluno.nome === nome);

    if (!aluno) {
        aluno = { nome, treino, exercicios: [] };
        alunos.push(aluno);
    }

    aluno.exercicios.push(novoExercicio);

    localStorage.setItem('alunos', JSON.stringify(alunos));

    alert('Exercício cadastrado com sucesso!');
    document.getElementById('form-cadastro').reset();
    exibirAlunos();
});

// Função para remover um aluno (e seus exercícios)
function removerAluno(index) {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.splice(index, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    exibirAlunos();
}

// Função para remover um exercício de um aluno
function removerExercicio(alunoIndex, exercicioIndex) {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos[alunoIndex].exercicios.splice(exercicioIndex, 1);
    localStorage.setItem('alunos', JSON.stringify(alunos));
    exibirAlunos();
}

// Função para editar um exercício
function editarExercicio(alunoIndex, exercicioIndex) {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    const aluno = alunos[alunoIndex];
    const exercicio = aluno.exercicios[exercicioIndex];

    // Preenche o formulário com os dados do exercício a ser editado
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('treino').value = aluno.treino;
    document.getElementById('exercicio').value = exercicio.nomeExercicio;
    document.getElementById('serie').value = exercicio.serie;
    document.getElementById('repeticoes').value = exercicio.repeticoes;

    // Altera o comportamento do botão de cadastro para "editar"
    const form = document.getElementById('form-cadastro');
    form.removeEventListener('submit', cadastrarExercicio);
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const treino = document.getElementById('treino').value;
        const nomeExercicio = document.getElementById('exercicio').value;
        const serie = document.getElementById('serie').value;
        const repeticoes = document.getElementById('repeticoes').value;

        const atualizadoExercicio = { nomeExercicio, serie, repeticoes };

        // Atualiza o exercício na lista do aluno
        aluno.exercicios[exercicioIndex] = atualizadoExercicio;

        localStorage.setItem('alunos', JSON.stringify(alunos));

        alert('Exercício editado com sucesso!');
        document.getElementById('form-cadastro').reset();
        exibirAlunos();

        // Reverte o evento do formulário para cadastro normal
        form.removeEventListener('submit', arguments.callee);
        form.addEventListener('submit', cadastrarExercicio);
    });
}

// Função que apenas cadastra um exercício, sem edição
function cadastrarExercicio(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const treino = document.getElementById('treino').value;
    const nomeExercicio = document.getElementById('exercicio').value;
    const serie = document.getElementById('serie').value;
    const repeticoes = document.getElementById('repeticoes').value;

    const novoExercicio = { nomeExercicio, serie, repeticoes };

    // Verificando se o aluno já existe
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    let aluno = alunos.find(aluno => aluno.nome === nome);

    if (!aluno) {
        aluno = { nome, treino, exercicios: [] };
        alunos.push(aluno);
    }

    aluno.exercicios.push(novoExercicio);

    localStorage.setItem('alunos', JSON.stringify(alunos));

    alert('Exercício cadastrado com sucesso!');
    document.getElementById('form-cadastro').reset();
    exibirAlunos();
}

// Chama a função para exibir os alunos ao carregar a página
document.addEventListener('DOMContentLoaded', exibirAlunos);
