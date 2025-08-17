// Dashboard.js

// Pegar usuário logado
const user = JSON.parse(localStorage.getItem('user'));
if (user) {
  document.getElementById('welcome').textContent = `Bem-vindo, ${user.name}!`;
}

// Lista de transações
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Função para atualizar lista e saldo
function updateDashboard() {
  const listEl = document.getElementById('transactionsList');
  const balanceEl = document.getElementById('totalBalance');
  listEl.innerHTML = '';

  let total = 0;

  transactions.forEach((t, i) => {
    const li = document.createElement('li');
    li.textContent = `${t.type === 'income' ? '+' : '-'} $${t.amount} | ${t.desc}`;
    listEl.appendChild(li);

    total += t.type === 'income' ? parseFloat(t.amount) : -parseFloat(t.amount);
  });

  balanceEl.textContent = `$${total.toFixed(2)}`;

  // Atualizar gráfico
  updateChart();
}

// Adicionar transação
document.getElementById('addTransactionBtn').addEventListener('click', () => {
  const desc = document.getElementById('desc').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  if (!desc || !amount) return alert('Preencha todos os campos');

  transactions.push({ desc, amount, type });
  localStorage.setItem('transactions', JSON.stringify(transactions));

  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';

  updateDashboard();
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'index.html';
});

// Gráfico usando Chart.js
let ctx = document.getElementById('financeChart').getContext('2d');
let financeChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: 'Gastos e Receitas',
      data: [],
      backgroundColor: [],
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  }
});

function updateChart() {
  const labels = transactions.map((t, i) => t.desc);
  const data = transactions.map((t) => t.type === 'income' ? t.amount : -t.amount);
  const bgColor = transactions.map((t) => t.type === 'income' ? 'green' : 'red');

  financeChart.data.labels = labels;
  financeChart.data.datasets[0].data = data;
  financeChart.data.datasets[0].backgroundColor = bgColor;
  financeChart.update();
}

// Inicializar
updateDashboard();

