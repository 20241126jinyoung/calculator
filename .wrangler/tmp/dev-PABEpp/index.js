var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.js
var HTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>\uAC04\uB2E8 \uACC4\uC0B0\uAE30</title>
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
    }

    .window {
      width: 340px;
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

    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
    }

    button {
      border: none;
      padding: 14px 0;
      font-size: 18px;
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

    .wide { grid-column: span 2; }

    .history {
      border-top: 1px solid #e5e7eb;
      padding: 12px 14px 14px;
      background: #f9fafb;
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
      max-height: 140px;
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
  </style>
</head>
<body>
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
      <div class="buttons">
        <button onclick="clearDisplay()">C</button>
        <button onclick="backspace()">\u232B</button>
        <button class="operator" onclick="appendOperator('/')">\xF7</button>
        <button class="operator" onclick="appendOperator('*')">\xD7</button>

        <button onclick="appendNumber('7')">7</button>
        <button onclick="appendNumber('8')">8</button>
        <button onclick="appendNumber('9')">9</button>
        <button class="operator" onclick="appendOperator('-')">-</button>

        <button onclick="appendNumber('4')">4</button>
        <button onclick="appendNumber('5')">5</button>
        <button onclick="appendNumber('6')">6</button>
        <button class="operator" onclick="appendOperator('+')">+</button>

        <button onclick="appendNumber('1')">1</button>
        <button onclick="appendNumber('2')">2</button>
        <button onclick="appendNumber('3')">3</button>
        <button class="operator wide" onclick="calculate()">=</button>

        <button class="wide" onclick="appendNumber('0')">0</button>
        <button onclick="appendNumber('.')">.</button>
      </div>
    </div>

    <div class="history">
      <div class="history-header">
        <span>\uC800\uC7A5 \uAE30\uB85D</span>
        <button class="ghost" onclick="clearHistory()">\uAE30\uB85D \uC9C0\uC6B0\uAE30</button>
      </div>
      <div class="history-list" id="historyList"></div>
      <div class="history-empty" id="historyEmpty">\uC544\uC9C1 \uAE30\uB85D\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.</div>
    </div>
  </div>

  <script>
    const display = document.getElementById('display');
    const historyList = document.getElementById('historyList');
    const historyEmpty = document.getElementById('historyEmpty');

    let currentInput = '0';
    const HISTORY_KEY = 'calc_history';

    function renderDisplay() {
      display.textContent = currentInput;
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
      if (/[+-*/]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + op;
      } else {
        currentInput += op;
      }
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

    function safeEval(expr) {
      if (!/^[0-9+-*/().s]+$/.test(expr)) {
        throw new Error('Invalid expression');
      }
      // Avoid nested template literals inside the Worker HTML string.
      return Function('"use strict"; return (' + expr + ')')();
    }

    function calculate() {
      try {
        const result = safeEval(currentInput);
        const formatted = Number.isFinite(result)
          ? (result.toString().length > 12 ? result.toExponential(6) : result.toString())
          : '\uC624\uB958';

        if (formatted !== '\uC624\uB958') {
          addHistory(currentInput, formatted);
          currentInput = formatted;
        } else {
          currentInput = '\uC624\uB958';
        }
        renderDisplay();
      } catch (err) {
        currentInput = '\uC624\uB958';
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

    renderDisplay();
    renderHistory();
  <\/script>
</body>
</html>`;
var src_default = {
  fetch() {
    return new Response(HTML, {
      headers: {
        "content-type": "text/html; charset=UTF-8"
      }
    });
  }
};

// ../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-LOt8iy/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../AppData/Roaming/npm/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-LOt8iy/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
//# sourceMappingURL=index.js.map
