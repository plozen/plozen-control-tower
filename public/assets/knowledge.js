export function filterKnowledgeDocuments(documents = [], filters = {}) {
  const query = (filters.query || "").trim().toLowerCase();
  const status = filters.status || "all";
  const source = filters.source || "all";
  const sourceDocuments = Array.isArray(documents) ? documents : [];

  return sourceDocuments.filter((document) => {
    const searchable = `${document.name} ${document.type} ${document.source}`.toLowerCase();
    return (
      (!query || searchable.includes(query)) &&
      (status === "all" || document.status === status) &&
      (source === "all" || document.source === source)
    );
  });
}

export function populateKnowledgeSources({ documents, select }) {
  if (!select) return;

  const previousValue = select.value || "all";
  const sources = [...new Set((documents || []).map((document) => document.source).filter(Boolean))];
  select.innerHTML = `<option value="all">전체</option>${sources
    .map((source) => `<option value="${escapeHtml(source)}">${escapeHtml(source)}</option>`)
    .join("")}`;

  if ([...select.options].some((option) => option.value === previousValue)) {
    select.value = previousValue;
  }
}

export function renderKnowledge({
  documents,
  tbody,
  filters,
  stateLabels,
  getStatusClass,
}) {
  if (!tbody) return;

  const rows = filterKnowledgeDocuments(documents || [], filters);
  if (!rows.length) {
    tbody.innerHTML = `<tr><td class="empty-row" colspan="7">조건에 맞는 문서가 없습니다.</td></tr>`;
    return;
  }

  tbody.innerHTML = rows.map((document) => renderKnowledgeRow({
    document,
    stateLabels,
    getStatusClass,
  })).join("");
}

function renderKnowledgeRow({ document, stateLabels, getStatusClass }) {
  const statusLabel = stateLabels?.[document.status] || document.status;
  const statusClass = getStatusClass ? getStatusClass(document.status) : "";
  return `
    <tr>
      <td data-label="문서명">${escapeHtml(document.name)}</td>
      <td data-label="파일 형식">${escapeHtml(document.type)}</td>
      <td data-label="저장 위치">${escapeHtml(document.source)}</td>
      <td data-label="조각 수">${escapeHtml(document.chunks)}</td>
      <td data-label="글자량">${escapeHtml(document.characters)}</td>
      <td data-label="상태">
        <span class="state-pill ${statusClass}">${escapeHtml(statusLabel)}</span>
      </td>
      <td data-label="최근 처리">${escapeHtml(document.processedAt)}</td>
    </tr>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
