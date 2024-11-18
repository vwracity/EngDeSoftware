// Seleciona o ícone do hambúrguer e o menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Adiciona um evento de clique no hambúrguer para alternar a classe 'open'
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});