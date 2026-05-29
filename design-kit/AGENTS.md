# Plostack Design Kit 작업 규칙

## 역할

이 저장소는 애플리케이션 구현 저장소가 아니라 디자인 산출물 키트다. 디자인 원본 규칙, raw 화면 아트보드, 디자인 시스템 시각화, 포트폴리오 합성물, 캡처 증거를 목적별로 분리해 관리한다.

## 지칭 규칙

- `Plostack Design Kit`, `플로스텍 디자인 킷`, `플디킷`은 모두 이 저장소와 디자인 키트 체계를 가리킨다.
- 내부 대화에서는 `플디킷`을 줄임말로 사용할 수 있다.

## 디자인 원본

- `DESIGN.md`는 프로젝트 디자인 규칙의 최상위 원본이다.
- 프로젝트의 디자인 규칙이 바뀌면 먼저 `DESIGN.md`를 수정한다.
- `styleguide/`는 `DESIGN.md`의 토큰, 컴포넌트, 패턴, 상태를 시각화해야 한다.
- `pub/`는 raw 화면 publishing/artboard 산출물만 담는다.
- `portfolio/`는 외부 제출, 판매 플랫폼, 포트폴리오용 합성 산출물만 담는다.
- `screenshots/`는 검증 증거와 최종 export 결과물을 목적별로 분리해 담는다.

## 디렉토리 규칙

- `pub/`: raw 화면 페이지. 디바이스 목업 합성, 썸네일, 플랫폼별 판매 이미지를 넣지 않는다.
- `styleguide/`: token, component, pattern, state gallery 페이지.
- `portfolio/kmong/`: 크몽 포트폴리오 패키지 페이지와 export 원본.
- `screenshots/origin/`: 원본 앱/웹 구현 화면 캡처.
- `screenshots/pub/`: raw artboard 캡처.
- `screenshots/styleguide/`: styleguide 검수 캡처.
- `screenshots/portfolio/`: 최종 포트폴리오 export PNG.
- `assets/`: 재사용 이미지, 생성 이미지, 브랜드 파일, 목업 리소스.

## 앱/웹/태블릿 기준

- 앱, 웹, 관리자, 랜딩은 `surface`가 다를 뿐 같은 디자인 키트 흐름을 따른다.
- `pub/app/`와 `pub/web/`처럼 surface별 하위 구조를 둘 수 있다.
- 모바일 앱 화면과 모바일 웹 화면을 같은 의미로 섞지 않는다.
- 태블릿은 기본적으로 별도 surface가 아니라 `viewport tier`다.
- 태블릿에서 navigation, density, master-detail, split view가 달라지면 `app-tablet` 또는 `web-tablet` 변형으로 명시한다.
- 웹 관리자 화면은 sidebar, topbar, table, filter, form, modal, side sheet, pagination 같은 웹 전용 컴포넌트를 `styleguide/`에 반영한다.
- 앱 화면은 bottom tab, task/detail flow, sticky action, safe area 같은 앱 전용 패턴을 `styleguide/`에 반영한다.
- 태블릿 검수 캡처는 `screenshots/pub/app/`, `screenshots/pub/web/` 아래에서 `tablet`이 드러나는 파일명으로 남긴다.

## 변경 규칙

- 이 repo에는 root-level `design-lab/` 래퍼를 다시 만들지 않는다. 제품 repo에서는 `design-lab/`를 쓸 수 있지만, 이 repo 자체가 디자인 키트다.
- secret은 로컬에만 둔다. `pub/kakao-config.local.js`는 커밋하지 않는다.
- 사용자가 명시적으로 재생성/교체를 요청하지 않은 기존 포트폴리오 snapshot은 보존한다.
- 산출물 페이지나 screenshot 경로를 이동하면 관련 링크를 함께 수정한다.
- 완료 전 root index, `pub/`, `styleguide/`, `portfolio/kmong/` 주요 route가 정상 응답하는지 확인한다.

## 내보내기 규칙

- 최종 export canvas는 고정 크기를 가져야 한다.
- 다운로드 버튼과 작업용 UI는 최종 PNG 캡처 안에 들어가면 안 된다.
- text overflow, 시각적 overlap, clipped content는 최종 포트폴리오 산출물의 blocker다.
- export 파일명과 크기는 해당 portfolio README 또는 `screenshots/README.md`에 기록한다.
