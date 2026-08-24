let backendUrl = 'http://localhost:5000';

const OPERATION_LABELS = {
  sum: 'Suma',
  subtract: 'Resta',
  multiply: 'Multiplicación',
  divide: 'División',
};

async function loadConfig() {
  const response = await fetch('/config');
  const config = await response.json();
  backendUrl = config.backendUrl;
}

async function calculate() {
  const a = parseFloat(document.getElementById('inputA').value);
  const b = parseFloat(document.getElementById('inputB').value);
  const operation = document.getElementById('operation').value;
  const resultEl = document.getElementById('result');
  const errorEl = document.getElementById('errorMsg');

  resultEl.textContent = '';
  errorEl.textContent = '';

  if (Number.isNaN(a) || Number.isNaN(b)) {
    errorEl.textContent = 'Ingresa dos números válidos';
    return;
  }

  try {
    const response = await fetch(`${backendUrl}/${operation}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a, b }),
    });

    const data = await response.json();

    if (!response.ok) {
      errorEl.textContent = data.error || 'Ocurrió un error en el backend';
      return;
    }

    resultEl.textContent = `Resultado: ${data.result}`;
    loadHistory();
  } catch {
    errorEl.textContent = 'No se pudo conectar con el backend';
  }
}

async function loadHistory() {
  const tbody = document.querySelector('#historyTable tbody');
  tbody.innerHTML = '';

  try {
    const response = await fetch(`${backendUrl}/history`);
    const records = await response.json();

    records.forEach((record) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${OPERATION_LABELS[record.operation] || record.operation}</td>
        <td>${record.a}</td>
        <td>${record.b}</td>
        <td>${record.result}</td>
        <td>${new Date(record.timestamp).toLocaleString()}</td>
      `;
      tbody.appendChild(row);
    });
  } catch {
    tbody.innerHTML = '<tr><td colspan="5">No se pudo cargar el historial</td></tr>';
  }
}

async function loadStatus() {
  const output = document.getElementById('statusOutput');
  output.textContent = 'Consultando...';

  try {
    const response = await fetch('/status');
    const data = await response.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch {
    output.textContent = 'No se pudo obtener el estado';
  }
}

document.getElementById('calculateBtn').addEventListener('click', calculate);
document.getElementById('refreshHistoryBtn').addEventListener('click', loadHistory);
document.getElementById('statusBtn').addEventListener('click', loadStatus);

loadConfig().then(loadHistory);
