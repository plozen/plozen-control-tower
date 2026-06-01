import MetricStrip from "../../components/MetricStrip";
import PageHeader from "../../components/PageHeader";
import { getOpsSnapshot } from "../../lib/snapshot";

export const dynamic = "force-dynamic";

function knowledgeMetrics(snapshot) {
  return [
    { label: "전체 문서", value: snapshot.knowledgeSummary.total, status: "unknown" },
    { label: "적재", value: snapshot.knowledgeSummary.loaded, status: "warn" },
    { label: "벡터", value: snapshot.knowledgeSummary.vector, status: "ok" },
    { label: "실패", value: snapshot.knowledgeSummary.failed, status: "error" },
  ];
}

export default async function KnowledgePage() {
  const snapshot = await getOpsSnapshot();

  return (
    <>
      <PageHeader
        kicker="KnowledgeDB"
        title="KnowledgeDB 관리"
        description="KnowledgeDB 문서 적재 상태, 조각 수, 벡터 생성 여부를 확인합니다."
        snapshotDate={snapshot.snapshotDate}
      />
      <MetricStrip items={knowledgeMetrics(snapshot)} />
      <section className="route-panel is-active" id="knowledge-panel" data-panel="knowledge">
        <section className="data-section knowledge-section" aria-label="KnowledgeDB 개발 예정">
          <header>
            <div>
              <p className="eyebrow">Next Migration</p>
              <h2>KnowledgeDB 화면 개발 대기</h2>
            </div>
          </header>
          <p className="empty-row">Dashboard와 Service 전환 후 같은 컴포넌트 구조로 개발합니다.</p>
        </section>
      </section>
    </>
  );
}
