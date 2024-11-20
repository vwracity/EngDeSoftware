
const formAluno = document.getElementById('formAluno');
const nomeInput = document.getElementById('nome');
const inicioInput = document.getElementById('inicio');
const fimInput = document.getElementById('fim');
const divisaoInput = document.getElementById('divisao');
const exerciciosInput = document.getElementById('exercicios');
const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];
const pesquisaInput = document.getElementById('pesquisa');


function carregarMatriculas() {
  let matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
  

  matriculas.forEach((matricula, index) => {

    let aluno = {
      nome: matricula.nome,
      dataInicio: matricula.dataInicio,
      dataFim: matricula.dataFim,
      divisao: 'A', 
      exercicios: ` ` 
    };
    salvarAluno(aluno, index);
  });

  // Carregar os alunos que foram adicionados ao LocalStorage
  carregarAlunos();
}

// Função para salvar um aluno no LocalStorage
function salvarAluno(aluno, index) {
  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  if (index !== undefined) {
    alunos[index] = aluno;  // Se já existe, substitui o aluno na posição correta
  } else {
    alunos.push(aluno);  // Se não, adiciona como um novo aluno
  }
  localStorage.setItem('alunos', JSON.stringify(alunos));
}

// Função para carregar os alunos na tabela
function carregarAlunos() {
  tabelaAlunos.innerHTML = '';
  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

  alunos.forEach((aluno, index) => {
    let row = tabelaAlunos.insertRow();
    row.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.dataInicio}</td>
      <td>${aluno.dataFim}</td>
      <td>${aluno.divisao}</td>
      <td><pre>${aluno.exercicios}</pre></td>
      <td>
        <button onclick="editarAluno(${index})">Editar</button>
        <button onclick="removerAluno(${index})">Remover</button>
      </td>
    `;
  });
}

// Função para editar o aluno
function editarAluno(index) {
  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  let aluno = alunos[index];
  
  // Preenche os campos de edição com as informações do aluno
  nomeInput.value = aluno.nome;
  inicioInput.value = aluno.dataInicio;
  fimInput.value = aluno.dataFim;
  divisaoInput.value = aluno.divisao;
  exerciciosInput.value = aluno.exercicios;

  // Atualiza o botão de salvar para "Salvar Edição"
  document.getElementById('btnSalvar').textContent = 'Salvar Edição';

  // Atualiza o evento de submit para editar esse aluno
  formAluno.removeEventListener('submit', adicionarAluno);
  formAluno.addEventListener('submit', function(event) {
    event.preventDefault();
    salvarAlunoEdicao(index);
  });
}

// Função para salvar a edição do aluno
function salvarAlunoEdicao(index) {
  let alunoEditado = {
    nome: nomeInput.value,
    dataInicio: inicioInput.value,
    dataFim: fimInput.value,
    divisao: divisaoInput.value,
    exercicios: exerciciosInput.value
  };

  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  alunos[index] = alunoEditado;  // Substitui o aluno na posição correta

  localStorage.setItem('alunos', JSON.stringify(alunos));

  resetarFormulario();
  carregarAlunos();

  document.getElementById('btnSalvar').textContent = 'Adicionar';
  
  // Restaura o evento padrão do formulário
  formAluno.removeEventListener('submit', function(event) {
    event.preventDefault();
    salvarAlunoEdicao(index);
  });
  formAluno.addEventListener('submit', adicionarAluno);
}

// Função para remover o aluno
function removerAluno(index) {
  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  alunos.splice(index, 1);  // Remove o aluno
  localStorage.setItem('alunos', JSON.stringify(alunos));
  carregarAlunos();
}

// Função para adicionar um novo aluno
function adicionarAluno(event) {
  event.preventDefault();
  
  let aluno = {
    nome: nomeInput.value,
    dataInicio: inicioInput.value,
    dataFim: fimInput.value,
    divisao: divisaoInput.value,
    exercicios: exerciciosInput.value
  };

  salvarAluno(aluno);
  carregarAlunos();
  resetarFormulario();
}

// Função para resetar o formulário
function resetarFormulario() {
  nomeInput.value = '';
  inicioInput.value = '';
  fimInput.value = '';
  divisaoInput.value = 'A';
  exerciciosInput.value = '';
}

// Função para pesquisar alunos
function pesquisarAlunos() {
  let pesquisa = pesquisaInput.value.toLowerCase();
  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
  let resultado = alunos.filter(aluno => 
    aluno.nome.toLowerCase().includes(pesquisa) || 
    aluno.divisao.toLowerCase().includes(pesquisa)
  );
  
  tabelaAlunos.innerHTML = '';
  resultado.forEach((aluno, index) => {
    let row = tabelaAlunos.insertRow();
    row.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${aluno.dataInicio}</td>
      <td>${aluno.dataFim}</td>
      <td>${aluno.divisao}</td>
      <td><pre>${aluno.exercicios}</pre></td>
      <td>
        <button class="edit-btn" onclick="editarAluno(${index})">Editar</button>
        <button class="delete-btn" onclick="removerAluno(${index})">Excluir</button>
      </td>
    `;
  });
}

// Adiciona eventos
formAluno.addEventListener('submit', adicionarAluno);
pesquisaInput.addEventListener('input', pesquisarAlunos);

// Carrega matrículas ao iniciar
carregarMatriculas(); // Agora chamamos carregarMatriculas que carrega tanto alunos quanto matrículas
