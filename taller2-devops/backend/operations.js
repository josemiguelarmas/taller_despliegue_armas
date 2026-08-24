function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    const err = new Error('No se puede dividir por cero');
    err.status = 400;
    throw err;
  }
  return a / b;
}

module.exports = { sum, subtract, multiply, divide };
