const DASH_PLACEHOLDER = "-";

const STATUS_CLASS = {
  ok: "status-ok",
  warn: "status-warn",
  error: "status-error",
  unknown: "status-unknown",
};

const STATUS_LABEL = {
  ok: "정상",
  warn: "주의",
  error: "에러",
  unknown: "미확인",
};

function escapeHtml(value) {
  return String(value ?? DASH_PLACEHOLDER)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function valueOrDash(value) {
  if (value === null || value === undefined || value === "") {
    return DASH_PLACEHOLDER;
  }

  return value;
}

function toCount(value) {
  if (Number.isFinite(value)) {
    return `${value}개`;
  }

  if (Number.isFinite(Number(value))) {
    return `${Number(value)}개`;
  }

  return DASH_PLACEHOLDER;
}

function toRunCount(value) {
  if (Number.isFinite(value)) {
    return `${value}회`;
  }

  if (Number.isFinite(Number(value))) {
    return `${Number(value)}회`;
  }

  return DASH_PLACEHOLDER;
}

function toCaseCount(value) {
  if (Number.isFinite(value)) {
    return `${value}건`;
  }

  if (Number.isFinite(Number(value))) {
    return `${Number(value)}건`;
  }

  return DASH_PLACEHOLDER;
}

function clampPercent(value) {
  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return 0;
  }

  return Math.min(100, Math.max(0, numeric));
}

function resolveRoot(root) {
  if (typeof root === "string") {
    return typeof document === "undefined" ? null : document.querySelector(root);
  }

  return root && typeof root.innerHTML === "string" ? root : null;
}

function getStatusClass(status) {
  return STATUS_CLASS[status] ?? STATUS_CLASS.unknown;
}

function getStatusLabel(status) {
  return STATUS_LABEL[status] ?? STATUS_LABEL.unknown;
}

function getArray(value) {
  return Array.isArray(value) ? value : [];
}

function summaryValue(source, key, formatter = toCount) {
  return formatter(source?.[key]);
}

function renderEmptyResourceTiles() {
  return `
    <div class="resource-tile status-unknown" role="status">
      <span>Snapshot</span>
      <strong>${DASH_PLACEHOLDER}</strong>
      <em>표시할 자원 데이터가 없습니다.</em>
      <i class="meter" style="--value: 0%"></i>
    </div>
  `;
}

function renderResourceTiles(resources) {
  if (resources.length === 0) {
    return renderEmptyResourceTiles();
  }

  return resources
    .map((item) => {
      const status = item?.status ?? "unknown";
      const percent = clampPercent(item?.percent);

      return `
        <div class="resource-tile ${getStatusClass(status)}">
          <span>${escapeHtml(valueOrDash(item?.label))}</span>
          <strong title="${escapeHtml(valueOrDash(item?.value))}">${escapeHtml(valueOrDash(item?.value))}</strong>
          <em>${escapeHtml(valueOrDash(item?.note))}</em>
          <i class="meter" aria-label="${escapeHtml(getStatusLabel(status))} ${percent}%" style="--value: ${percent}%"></i>
        </div>
      `;
    })
    .join("");
}

function renderSummaryRows(rows) {
  return rows
    .map(
      (row) => `
        <div>
          <dt>${escapeHtml(row.label)}</dt>
          <dd>${escapeHtml(row.value)}</dd>
        </div>
      `,
    )
    .join("");
}

function renderSummaryPanel({ eyebrow, title, rows }) {
  return `
    <section class="summary-panel" aria-label="${escapeHtml(title)}">
      <header>
        <div>
          <p class="eyebrow">${escapeHtml(eyebrow)}</p>
          <h2>${escapeHtml(title)}</h2>
        </div>
      </header>
      <dl>${renderSummaryRows(rows)}</dl>
    </section>
  `;
}

function buildSummaryPanels(snapshot) {
  const service = snapshot?.serviceSummary;
  const automation = snapshot?.automation;
  const knowledge = snapshot?.knowledgeSummary;

  return [
    {
      eyebrow: "Service",
      title: "서비스 상태 분포",
      rows: [
        { label: "정상", value: summaryValue(service, "ok") },
        { label: "주의", value: summaryValue(service, "warn") },
        { label: "미확인", value: summaryValue(service, "unknown") },
        { label: "오류", value: summaryValue(service, "error") },
      ],
    },
    {
      eyebrow: "Automation",
      title: "자동화 실행 분포",
      rows: [
        { label: "성공률", value: valueOrDash(automation?.successRate) },
        { label: "성공", value: summaryValue(automation, "successCount", toRunCount) },
        { label: "재시도", value: summaryValue(automation, "retryCount", toCaseCount) },
        { label: "실패", value: summaryValue(automation, "failureCount", toCaseCount) },
      ],
    },
    {
      eyebrow: "KnowledgeDB",
      title: "KnowledgeDB 문서 분포",
      rows: [
        { label: "전체", value: summaryValue(knowledge, "total") },
        { label: "Vector", value: summaryValue(knowledge, "vector") },
        { label: "적재", value: summaryValue(knowledge, "loaded") },
        { label: "실패", value: summaryValue(knowledge, "failed") },
      ],
    },
  ];
}

function renderDashboardBody(snapshot) {
  const resources = getArray(snapshot?.resources);
  const snapshotDate = valueOrDash(snapshot?.snapshotDate);
  const summaryPanels = buildSummaryPanels(snapshot);

  return `
    <section class="resource-section" aria-label="서버 자원 사용률">
      <header>
        <div>
          <p class="eyebrow">Server Resources</p>
          <h2>서버 자원 사용률</h2>
        </div>
        <span class="snapshot-badge" title="Snapshot date">${escapeHtml(snapshotDate)}</span>
      </header>
      <div class="resource-grid">${renderResourceTiles(resources)}</div>
    </section>

    <section class="summary-grid" aria-label="운영 상태 요약">
      ${summaryPanels.map(renderSummaryPanel).join("")}
    </section>
  `;
}

/**
 * Renders the public-safe dashboard body into a caller-owned root.
 *
 * @param {{ snapshot?: object, root: Element | string | { innerHTML: string } }} params
 * @returns {{ ok: boolean, resourceCount: number, hasSnapshot: boolean }}
 */
export function renderDashboard({ snapshot, root } = {}) {
  const target = resolveRoot(root);

  if (!target) {
    return { ok: false, resourceCount: 0, hasSnapshot: Boolean(snapshot) };
  }

  target.innerHTML = renderDashboardBody(snapshot);

  return {
    ok: true,
    resourceCount: getArray(snapshot?.resources).length,
    hasSnapshot: Boolean(snapshot),
  };
}

export const dashboardApi = {
  renderDashboard,
};
