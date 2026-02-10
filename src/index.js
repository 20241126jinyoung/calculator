const HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>간단 계산기</title>
  <style>
    :root {
      --bg: #eef1f4;
      --panel: #ffffff;
      --shadow: rgba(0, 0, 0, 0.15);
      --text: #1f2937;
      --muted: #6b7280;
      --accent: #f59e0b;
      --accent-dark: #d97706;
      --btn: #f3f4f6;
      --btn-hover: #e5e7eb;
      --btn-active: #d1d5db;
      --sci: #e0e7ff;
      --sci-hover: #c7d2fe;
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top, #f8fafc 0%, var(--bg) 60%);
      font-family: "Segoe UI", "Noto Sans KR", system-ui, -apple-system, sans-serif;
      color: var(--text);
      padding: 24px;
    }

    .shell {
      display: flex;
      align-items: stretch;
      gap: 12px;
    }

    .window {
      width: 360px;
      border-radius: 16px;
      background: var(--panel);
      box-shadow: 0 12px 30px var(--shadow);
      overflow: hidden;
    }

    .titlebar {
      padding: 10px 14px;
      background: linear-gradient(90deg, #111827, #1f2937);
      color: #f9fafb;
      font-size: 14px;
      letter-spacing: 0.3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .titlebar span {
      opacity: 0.9;
    }

    .title-dots {
      display: flex;
      gap: 6px;
    }

    .title-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #6b7280;
    }

    .calculator {
      padding: 14px;
      display: grid;
      gap: 12px;
    }

    .display {
      background: #111827;
      color: #f9fafb;
      padding: 16px;
      font-size: 28px;
      text-align: right;
      border-radius: 12px;
      min-height: 60px;
      word-break: break-all;
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    .mode {
      font-size: 12px;
      color: var(--muted);
      padding: 4px 8px;
      border-radius: 999px;
      background: #f3f4f6;
      border: 1px solid #e5e7eb;
      cursor: pointer;
    }

    .mode:hover { background: #e5e7eb; }

    .toggle {
      border: 1px solid #d1d5db;
      background: #ffffff;
      color: var(--text);
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 999px;
      cursor: pointer;
    }

    .toggle:hover { background: #f3f4f6; }

    .buttons {
      display: grid;
      gap: 8px;
    }

    .sci-buttons {
      grid-template-columns: repeat(5, 1fr);
    }

    .main-buttons {
      grid-template-columns: repeat(4, 1fr);
    }

    button {
      border: none;
      padding: 12px 0;
      font-size: 16px;
      border-radius: 10px;
      background: var(--btn);
      cursor: pointer;
      transition: background 0.2s ease;
    }

    button:hover { background: var(--btn-hover); }
    button:active { background: var(--btn-active); }

    .operator {
      background: var(--accent);
      color: #111827;
      font-weight: 600;
    }

    .operator:hover { background: #fbbf24; }
    .operator:active { background: var(--accent-dark); }

    .sci {
      background: var(--sci);
      font-size: 14px;
    }

    .sci:hover { background: var(--sci-hover); }

    .wide { grid-column: span 2; }

    .history-panel {
      width: 0;
      opacity: 0;
      overflow: hidden;
      transition: width 0.25s ease, opacity 0.2s ease;
      background: #f9fafb;
      border-radius: 16px;
      box-shadow: 0 12px 30px var(--shadow);
    }

    .shell.show-history .history-panel {
      width: 260px;
      opacity: 1;
    }

    .history {
      height: 100%;
      padding: 12px 14px 14px;
      display: flex;
      flex-direction: column;
    }

    .history-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 8px;
    }

    .history-list {
      flex: 1;
      max-height: 320px;
      overflow: auto;
      display: grid;
      gap: 6px;
      font-size: 13px;
    }

    .history-item {
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .history-item strong { font-size: 14px; }

    .history-empty {
      color: var(--muted);
      font-size: 13px;
    }

    .ghost {
      background: transparent;
      border: 1px solid #d1d5db;
      color: var(--muted);
      padding: 6px 10px;
      font-size: 12px;
      border-radius: 999px;
    }

    .ghost:hover { background: #e5e7eb; color: #111827; }

    @media (max-width: 720px) {
      body { padding: 16px; }
      .shell { flex-direction: column; }
      .window { width: 100%; }
      .shell.show-history .history-panel { width: 100%; }
      .history-panel { width: 100%; max-height: 240px; }
    }
  </style>
</head>
<body>
  <div class="shell" id="shell">
    <div class="window">
      <div class="titlebar">
        <span>Calculator</span>
        <div class="title-dots">
          <div class="title-dot"></div>
          <div class="title-dot"></div>
          <div class="title-dot"></div>
        </div>
      </div>

      <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="toolbar">
          <button type="button" class="mode" id="angleModeBtn" onclick="toggleAngleMode()">RAD</button>
          <button type="button" class="toggle" id="toggleHistoryBtn" onclick="toggleHistory()">저장기록</button>
        </div>

        <div class="buttons sci-buttons">
          <button type="button" class="sci" onclick="appendFunction('sin')">sin</button>
          <button type="button" class="sci" onclick="appendFunction('cos')">cos</button>
          <button type="button" class="sci" onclick="appendFunction('tan')">tan</button>
          <button type="button" class="sci" onclick="appendFunction('log')">log</button>
          <button type="button" class="sci" onclick="appendFunction('ln')">ln</button>

          <button type="button" class="sci" onclick="appendFunction('asin')">asin</button>
          <button type="button" class="sci" onclick="appendFunction('acos')">acos</button>
          <button type="button" class="sci" onclick="appendFunction('atan')">atan</button>
          <button type="button" class="sci" onclick="appendFunction('sqrt')">sqrt</button>
          <button type="button" class="sci" onclick="appendFunction('abs')">abs</button>

          <button type="button" class="sci" onclick="appendParenthesis('(')">(</button>
          <button type="button" class="sci" onclick="appendParenthesis(')')">)</button>
          <button type="button" class="sci" onclick="appendConstant('pi')">π</button>
          <button type="button" class="sci" onclick="appendConstant('e')">e</button>
          <button type="button" class="sci" onclick="appendOperator('^')">x^y</button>
        </div>

        <div class="buttons main-buttons">
          <button type="button" onclick="clearDisplay()">C</button>
          <button type="button" onclick="backspace()">⌫</button>
          <button type="button" class="operator" onclick="appendOperator('/')">÷</button>
          <button type="button" class="operator" onclick="appendOperator('*')">×</button>

          <button type="button" onclick="appendNumber('7')">7</button>
          <button type="button" onclick="appendNumber('8')">8</button>
          <button type="button" onclick="appendNumber('9')">9</button>
          <button type="button" class="operator" onclick="appendOperator('-')">-</button>

          <button type="button" onclick="appendNumber('4')">4</button>
          <button type="button" onclick="appendNumber('5')">5</button>
          <button type="button" onclick="appendNumber('6')">6</button>
          <button type="button" class="operator" onclick="appendOperator('+')">+</button>

          <button type="button" onclick="appendNumber('1')">1</button>
          <button type="button" onclick="appendNumber('2')">2</button>
          <button type="button" onclick="appendNumber('3')">3</button>
          <button type="button" class="operator" onclick="calculate()">=</button>

          <button type="button" class="wide" onclick="appendNumber('0')">0</button>
          <button type="button" onclick="appendNumber('.')">.</button>
        </div>
      </div>
    </div>

    <aside class="history-panel">
      <div class="history">
        <div class="history-header">
          <span>저장 기록</span>
          <button type="button" class="ghost" onclick="clearHistory()">기록 지우기</button>
        </div>
        <div class="history-list" id="historyList"></div>
        <div class="history-empty" id="historyEmpty">아직 기록이 없습니다.</div>
      </div>
    </aside>
  </div>

  <script>
    const display = document.getElementById('display');
    const historyList = document.getElementById('historyList');
    const historyEmpty = document.getElementById('historyEmpty');
    const shell = document.getElementById('shell');
    const toggleHistoryBtn = document.getElementById('toggleHistoryBtn');
    const angleModeBtn = document.getElementById('angleModeBtn');

    let currentInput = '0';
    let angleMode = 'RAD';
    const HISTORY_KEY = 'calc_history';

    function renderDisplay() {
      display.textContent = currentInput;
    }

    function toggleHistory() {
      const isOpen = shell.classList.toggle('show-history');
      toggleHistoryBtn.textContent = isOpen ? '저장기록 닫기' : '저장기록';
    }

    function toggleAngleMode() {
      angleMode = angleMode === 'RAD' ? 'DEG' : 'RAD';
      angleModeBtn.textContent = angleMode;
    }

    function toRadians(value) {
      return angleMode === 'DEG' ? (value * Math.PI) / 180 : value;
    }

    function toDegrees(value) {
      return angleMode === 'DEG' ? (value * 180) / Math.PI : value;
    }

    function sin(value) { return Math.sin(toRadians(value)); }
    function cos(value) { return Math.cos(toRadians(value)); }
    function tan(value) { return Math.tan(toRadians(value)); }
    function asin(value) { return toDegrees(Math.asin(value)); }
    function acos(value) { return toDegrees(Math.acos(value)); }
    function atan(value) { return toDegrees(Math.atan(value)); }
    function sqrt(value) { return Math.sqrt(value); }
    function abs(value) { return Math.abs(value); }
    function log(value) { return Math.log10(value); }
    function ln(value) { return Math.log(value); }

    const PI = Math.PI;
    const E = Math.E;

    function shouldInsertMultiply() {
      return /[0-9)]$/.test(currentInput) || /\b(pi|e)$/.test(currentInput);
    }

    function appendNumber(value) {
      if (currentInput === '0' && value !== '.') {
        currentInput = value;
      } else {
        currentInput += value;
      }
      renderDisplay();
    }

    function appendOperator(op) {
      if (/[+*/^-]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + op;
      } else {
        currentInput += op;
      }
      renderDisplay();
    }

    function appendFunction(name) {
      const prefix = shouldInsertMultiply() ? '*' : '';
      currentInput = (currentInput === '0')
        ? name + '('
        : currentInput + prefix + name + '(';
      renderDisplay();
    }

    function appendConstant(name) {
      const prefix = shouldInsertMultiply() ? '*' : '';
      currentInput = (currentInput === '0')
        ? name
        : currentInput + prefix + name;
      renderDisplay();
    }

    function appendParenthesis(value) {
      const prefix = value === '(' && shouldInsertMultiply() ? '*' : '';
      currentInput = currentInput === '0' && value === '(' ? '(' : currentInput + prefix + value;
      renderDisplay();
    }

    function clearDisplay() {
      currentInput = '0';
      renderDisplay();
    }

    function backspace() {
      if (currentInput.length <= 1) {
        currentInput = '0';
      } else {
        currentInput = currentInput.slice(0, -1);
      }
      renderDisplay();
    }

    function normalizeExpression(expr) {
      let normalized = expr;
      normalized = normalized.replace(/\s+/g, '');
      normalized = normalized.replace(/\^/g, '**');
      normalized = normalized.replace(/\bpi\b/gi, 'PI');
      normalized = normalized.replace(/\be\b/g, 'E');
      return normalized;
    }

    function safeEval(expr) {
      if (!/^[0-9+\-*/^().,a-zA-Z\s]+$/.test(expr)) {
        throw new Error('Invalid expression');
      }
      const normalized = normalizeExpression(expr);
      return Function('"use strict"; return (' + normalized + ')')();
    }

    function calculate() {
      try {
        const result = safeEval(currentInput);
        const formatted = Number.isFinite(result)
          ? (result.toString().length > 12 ? result.toExponential(6) : result.toString())
          : '오류';

        if (formatted !== '오류') {
          addHistory(currentInput, formatted);
          currentInput = formatted;
        } else {
          currentInput = '오류';
        }
        renderDisplay();
      } catch (err) {
        currentInput = '오류';
        renderDisplay();
      }
    }

    function getHistory() {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (!raw) return [];
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }

    function saveHistory(items) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
    }

    function addHistory(expression, result) {
      const items = getHistory();
      items.unshift({ expression, result, at: new Date().toISOString() });
      if (items.length > 20) items.pop();
      saveHistory(items);
      renderHistory();
    }

    function clearHistory() {
      localStorage.removeItem(HISTORY_KEY);
      renderHistory();
    }

    function renderHistory() {
      const items = getHistory();
      historyList.innerHTML = '';

      if (!items.length) {
        historyEmpty.style.display = 'block';
        return;
      }

      historyEmpty.style.display = 'none';
      for (const item of items) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = '<span>' + item.expression + '</span><strong>' + item.result + '</strong>';
        historyList.appendChild(div);
      }
    }

    window.addEventListener('keydown', (event) => {
      if (event.defaultPrevented) return;
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        appendNumber(key);
        return;
      }

      if (key === '.') {
        appendNumber('.');
        return;
      }

      if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendOperator(key);
        return;
      }

      if (key === '^') {
        appendOperator('^');
        return;
      }

      if (key === '(' || key === ')') {
        appendParenthesis(key);
        return;
      }

      if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
        return;
      }

      if (key === 'Backspace') {
        event.preventDefault();
        backspace();
        return;
      }

      if (key === 'Escape') {
        clearDisplay();
      }
    });

    renderDisplay();
    renderHistory();
  </script>
</body>
</html>

`;

export default {
  fetch() {
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    });
  },
};
