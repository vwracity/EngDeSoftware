// Recupera os dados das matrículas e aparelhos do LocalStorage
const matriculas = JSON.parse(localStorage.getItem('matriculas')) || [];
const aparelhos = JSON.parse(localStorage.getItem('aparelhos')) || [];

// Processa os dados das matrículas
function getMatriculasData() {
    const planoCounts = {};
    matriculas.forEach(({ tipo }) => {
        planoCounts[tipo] = (planoCounts[tipo] || 0) + 1;
    });

    return {
        labels: Object.keys(planoCounts),
        data: Object.values(planoCounts)
    };
}

// Processa os dados dos aparelhos com base no status
function getAparelhosData() {
    const statusCounts = {};
    aparelhos.forEach(({ status }) => {
        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return {
        labels: Object.keys(statusCounts),
        data: Object.values(statusCounts)
    };
}

// Configura o gráfico
const ctx = document.getElementById('pie-chart').getContext('2d');
let currentChart;

// Função para renderizar o gráfico de pizza
function renderChart({ labels, data }, title) {
    if (currentChart) currentChart.destroy(); // Remove o gráfico anterior

    currentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                borderColor: '#fff',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                title: {
                    display: true,
                    text: title
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Alternar gráficos ao clicar nos botões
document.getElementById('btn-matriculas').addEventListener('click', () => {
    const matriculasData = getMatriculasData();
    renderChart(matriculasData, 'Distribuição de Matrículas por Plano');
});

document.getElementById('btn-aparelhos').addEventListener('click', () => {
    const aparelhosData = getAparelhosData();
    renderChart(aparelhosData, 'Distribuição de Aparelhos por Status');
});

// Exibe o gráfico de matrículas por padrão
renderChart(getMatriculasData(), 'Distribuição de Matrículas por Plano');
