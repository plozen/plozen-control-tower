import { readFileSync } from "node:fs";

const html = readFileSync("public/index.html", "utf8");
const css = readFileSync("public/assets/app.css", "utf8");
const servicesCss = readFileSync("public/assets/services.css", "utf8");
const js = readFileSync("public/assets/app.js", "utf8");
const dashboardJs = readFileSync("public/assets/dashboard.js", "utf8");
const knowledgeJs = readFileSync("public/assets/knowledge.js", "utf8");
const servicesJs = readFileSync("public/assets/services.js", "utf8");
const snapshot = JSON.parse(readFileSync("public/data/ops-snapshot.json", "utf8"));

const requiredHtml = [
  "app-shell",
  "metric-strip",
  "service-rows",
  "knowledge-rows",
  "upload-file-list",
  "port-policy-list",
  "KnowledgeDB",
];

const requiredCss = [
  ".metric-strip",
  ".status-chart-grid",
  ".upload-file-list",
  ".service-table th:first-child",
  ".state-pill i",
  ".snapshot-badge",
  "@media (max-width: 900px)",
];

const requiredJs = [
  "renderDashboard",
  "loadSnapshot",
  "renderServiceView",
  "renderKnowledgeView",
  "setRoute",
];

const requiredDashboardJs = [
  "renderDashboard",
  "status-chart-grid",
  "pie-chart",
  "snapshot-badge",
];

const requiredKnowledgeJs = [
  "filterKnowledgeDocuments",
  "populateKnowledgeSources",
  "renderKnowledge",
  "renderUploadFiles",
  "escapeHtml",
];

const requiredServicesJs = [
  "filterServices",
  "renderServices",
  "SERVICE_STATUS_LABELS",
  "service-status-dot",
];

const requiredServicesCss = [
  ".service-status-dot",
  ".service-empty-row",
];

const secretPatterns = [
  /api[_-]?key\s*[:=]/i,
  /secret\s*[:=]/i,
  /token\s*[:=]/i,
  /password\s*[:=]/i,
  /AKIA[0-9A-Z]{16}/,
  /BEGIN (RSA|OPENSSH|PRIVATE) KEY/,
];

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const needle of requiredHtml) {
  assert(html.includes(needle), `public/index.html missing ${needle}`);
}

for (const needle of requiredCss) {
  assert(css.includes(needle), `public/assets/app.css missing ${needle}`);
}

for (const needle of requiredJs) {
  assert(js.includes(needle), `public/assets/app.js missing ${needle}`);
}

for (const needle of requiredDashboardJs) {
  assert(dashboardJs.includes(needle), `public/assets/dashboard.js missing ${needle}`);
}

for (const needle of requiredKnowledgeJs) {
  assert(knowledgeJs.includes(needle), `public/assets/knowledge.js missing ${needle}`);
}

for (const needle of requiredServicesJs) {
  assert(servicesJs.includes(needle), `public/assets/services.js missing ${needle}`);
}

for (const needle of requiredServicesCss) {
  assert(servicesCss.includes(needle), `public/assets/services.css missing ${needle}`);
}

assert(Array.isArray(snapshot.services) && snapshot.services.length === 9, "snapshot services length must be 9");
assert(Array.isArray(snapshot.documents) && snapshot.documents.length === 8, "snapshot documents length must be 8");
assert(Array.isArray(snapshot.uploadFiles) && snapshot.uploadFiles.length === 4, "snapshot uploadFiles length must be 4");
assert(snapshot.services.every((service) => service.name && service.status && service.runtime), "invalid service row");
assert(snapshot.documents.every((document) => document.name && document.status && document.source), "invalid document row");

const joined = [html, css, servicesCss, js, dashboardJs, knowledgeJs, servicesJs, JSON.stringify(snapshot)].join("\n");
for (const pattern of secretPatterns) {
  assert(!pattern.test(joined), `secret-like pattern found: ${pattern}`);
}

console.log("PUBLIC_APP_CHECK: PASS");
