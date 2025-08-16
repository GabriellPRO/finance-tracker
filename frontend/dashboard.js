// Mostrar nome do usuário
const welcome = document.getElementById('welcome');
const user = JSON.parse(localStorage.getItem('user'));
if (welcome && user) welcome.textContent = user.name;

// Gastos
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const expensesList = document.getElementById('expensesList');
const expenseName = document.getElementById('expenseName');
const expenseAmount = document.getElementById('expenseAmount');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const logoutBtn = document.getElementById('logoutBtn');

function updateDashboard() {
  expensesList.innerHTML = '';
  expenses.forEach((exp, index) => {
    const li = document.createElement('li');
    li.textContent = `${exp.name}: R$ ${exp.amount.toFixed(2)}`;
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.addEventListener('click', () => {
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      updateDashboard();
    });
    li.appendChild(delBtn);
    expensesList.appendChild(li);
  });

  const ctx = document.getElementById('expensesChart').getContext('2d');
  if (window.expChart) window.expChart.destroy();
  window.expChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: expenses.map(e => e.name),
      datasets: [{
        label: 'Despesas',
        data: expenses.map(e => e.amount),
        backgroundColor: expenses.map(() => `hsl(${Math.random()*360},70%,60%)`)
      }]
    },
    options: { plugins: { legend: { position: 'bottom' } } }
  });
}

// Adicionar gasto
addExpenseBtn.addEventListener('click', () => {
  const name = expenseName.value.trim();
  const amount = parseFloat(expenseAmount.value);
  if (!name || isNaN(amount) || amount <= 0) {
    alert('Preencha corretamente o nome e valor do gasto!');
    return;
  }
  expenses.push({ name, amount });
  localStorage.setItem('expenses', JSON.stringify(expenses));
  expenseName.value = '';
  expenseAmount.value = '';
  updateDashboard();
});

// Logout
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('expenses');
  window.location.href = 'index.html';
});

// Inicializar
updateDashboard();

