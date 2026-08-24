const fs = require('fs');
const path = require('path');

const HISTORY_FILE = path.join(__dirname, 'history.json');
const MAX_RECORDS_RETURNED = 5;

function ensureHistoryFile() {
  if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, '[]', 'utf-8');
  }
}

function readAll() {
  ensureHistoryFile();
  const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function append(record) {
  const records = readAll();
  records.push({ ...record, timestamp: new Date().toISOString() });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(records, null, 2), 'utf-8');
}

function getLast(n = MAX_RECORDS_RETURNED) {
  const records = readAll();
  return records.slice(-n).reverse();
}

function canWrite() {
  try {
    ensureHistoryFile();
    fs.accessSync(HISTORY_FILE, fs.constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

module.exports = { append, getLast, canWrite };
