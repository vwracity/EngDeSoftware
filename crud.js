const form = document.getElementById('user-form');
const submitBtn = document.getElementById('submit-btn');
const usersTableBody = document.getElementById('users-table-body');

// Armazenando usuários fictícios (substitua por chamadas API reais)
let users = [];

// Função para exibir os usuários na tabela
function renderUsers() {
    usersTableBody.innerHTML = ''; // Limpa a tabela
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.cpf}</td>
            <td>${user.phone}</td>
            <td>${user.position}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${index})">Editar</button>
                <button class="delete-btn" onclick="deleteUser(${index})">Excluir</button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// Função para adicionar ou atualizar o usuário
function handleSubmit(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const cpf = document.getElementById('cpf').value;
    const phone = document.getElementById('phone').value;
    const position = document.getElementById('position').value;

    if (submitBtn.dataset.editingIndex !== undefined) {
        // Editando usuário existente
        const index = submitBtn.dataset.editingIndex;
        users[index] = { name, cpf, phone, position };
        submitBtn.removeAttribute('data-editing-index');
    } else {
        // Adicionando novo usuário
        users.push({ name, cpf, phone, position });
    }

    form.reset();
    renderUsers();
}

// Função para editar usuário
function editUser(index) {
    const user = users[index];
    document.getElementById('name').value = user.name;
    document.getElementById('cpf').value = user.cpf;
    document.getElementById('phone').value = user.phone;
    document.getElementById('position').value = user.position;

    submitBtn.dataset.editingIndex = index;
}

// Função para excluir usuário
function deleteUser(index) {
    users.splice(index, 1);
    renderUsers();
}

// Inicialização da página
form.addEventListener('submit', handleSubmit);
renderUsers();
