# Plostack Design Kit Module Contract

이 문서는 Plostack Design Kit를 다른 제품 저장소에 모듈로 심을 때 지켜야 하는 이식 계약이다.
실행 자동화 스킬이 아니라, 모듈 자체가 보유하는 기준 문서다.

## 목적

Plostack Design Kit는 운영 앱 코드와 분리된 디자인 산출물 모듈이다.
제품 repo에 심은 뒤 아래 산출물을 한 구조에서 만든다.

- 디자인 원본과 검수 기준
- raw app/web publishing 화면
- styleguide 검수 화면
- 크몽, 제안서, 포트폴리오용 composite/export 원본
- screenshot 검증 증거와 최종 PNG

## 기본 설치 위치

제품 저장소에 새로 심을 때 기본 경로는 `design-kit/`이다.

```text
design-kit/
  MODULE.md
  DESIGN.md
  pub/
  styleguide/
  portfolio/
  screenshots/
  assets/
```

기존 repo에 `design-lab/`, `kmong-thumbnail/` 같은 과거 키트가 있으면 새 모듈을 섞어 넣지 않는다.
먼저 기존 키트를 제거한 뒤 `design-kit/`를 새로 심는다.

## Install Modes

제품 repo에 심을 때는 설치 모드를 먼저 정한다.
플디킷 원본 repo는 모듈 검증을 위해 generic scaffold를 유지하지만, 제품 repo 설치본은 샘플을 그대로 납품물로 취급하지 않는다.

### `empty-raw`

새 제품 디자인을 처음부터 시작할 때 기본으로 사용한다.

- 유지: `pub/index.html`, `pub/styles.css`
- 비움: `pub/web/index.html`, `pub/web/styles.css` 또는 `pub/app/index.html`, surface별 raw source
- 원본 그대로 유지: `portfolio/kmong/styles.css`, `portfolio/kmong/web/*`, `portfolio/kmong/mobile/*`
- 제거: `screenshots/origin/`, `screenshots/pub/`, sample screenshots, stale export PNG, generated sample images
- 정상 상태: portfolio iframe 안쪽 raw source가 비어 보일 수 있다.

### `sample-scaffold`

플디킷 자체 기능 검증이나 데모용으로 사용한다.

- 유지: sample `pub/app/`, `pub/web/`
- 유지: 현재 scaffold와 일치하는 sample screenshots
- 금지: 제품 repo의 실제 납품물로 sample 문구와 이미지를 그대로 사용하는 것

### `copy-existing`

이미 승인된 제품 raw 디자인이 있을 때 사용한다.

- 교체: `pub/web/` 또는 `pub/app/`를 승인된 제품 raw source로 교체
- 유지: portfolio wrapper 구조와 디자인
- 재측정: web full page export height
- 재생성: screenshots와 final export PNG

### CLI 실행

현재 repo에서 직접 실행할 때:

```bash
node bin/plodikit.js init /path/to/product/design-kit --surface web --mode empty-raw
node bin/plodikit.js doctor --target /path/to/product/design-kit --surface web --mode empty-raw
```

패키지로 설치한 제품 repo에서 실행할 때:

```bash
npx plodikit init design-kit --surface web --mode empty-raw
npx plodikit doctor --target design-kit --surface web --mode empty-raw
```

`copy-existing` 모드는 승인된 raw source를 명시한다.

```bash
npx plodikit init design-kit --surface web --mode copy-existing --web-source ./design-lab/pub/web
```

## 운영 코드 경계

이 모듈을 심는 작업은 제품 운영 코드 변경이 아니다.

- 수정 금지 기본 범위: `src/`, `app/`, `public/`, API, DB, auth, middleware
- 허용 범위: 새 `design-kit/` 디렉터리와 필요한 문서 링크
- 예외: 사용자가 제품 코드 연결을 명시적으로 지시한 경우에만 별도 작업으로 승격한다.

루트 `DESIGN.md`가 이미 제품 디자인 원본이면 덮어쓰지 않는다.
모듈 내부 `design-kit/DESIGN.md`는 포트폴리오와 raw publishing 산출물의 디자인 원본으로 둔다.
필요하면 루트 `DESIGN.md`를 참조한다고 명시한다.

## Surface 가지치기 규칙

모듈을 심을 때 대상 surface를 먼저 정한다.

### Web-only target

웹사이트, 관리자 웹, 랜딩, SaaS 포트폴리오만 필요한 경우:

- 유지: `pub/index.html`, `pub/styles.css`, `pub/web/`, `portfolio/kmong/web/`
- 제거: `pub/app/`, `portfolio/kmong/mobile/`, 모바일 앱 screenshots
- `empty-raw` 모드에서는 `pub/web/index.html`, `pub/web/styles.css`만 비울 수 있다.
- `/pub/` 허브는 비우지 않는다. raw source 위치를 안내하는 entry로 유지한다.
- 웹 대표 썸네일, 웹 서브 상세, 웹 페이지 모음은 모두 같은 `pub/web/` source를 바라본다.

### App-only target

모바일 앱 포트폴리오만 필요한 경우:

- 유지: `pub/index.html`, `pub/styles.css`, `pub/app/`, `portfolio/kmong/mobile/`
- 제거: `pub/web/`, `portfolio/kmong/web/`, 웹 screenshots
- `empty-raw` 모드에서는 `pub/app/index.html`, `pub/app/styles.css` 같은 app raw source만 비울 수 있다.
- 기존 `/pub/?screen=...` 호환이 필요하면 `/pub/app/?screen=...`로 query/hash를 보존한다.

### Multi-surface target

앱과 웹을 모두 다루는 경우:

- `/pub/`는 app/web 선택 허브가 된다.
- raw 화면은 `pub/app/`, `pub/web/`로 분리한다.
- 포트폴리오 composite는 `portfolio/kmong/mobile/`, `portfolio/kmong/web/`로 분리한다.

## Pub Hub와 Raw Source

`pub/`는 raw source 자체가 아니라 raw source로 들어가는 허브다.

- `pub/index.html`, `pub/styles.css`: 항상 유지한다.
- `pub/web/index.html`, `pub/web/styles.css`: 웹 raw source다. `empty-raw` 설치에서는 비울 수 있다.
- `pub/app/index.html`: 앱 raw source다. `empty-raw` 설치에서는 비울 수 있다.
- `/design-kit/pub/`가 빈 화면이면 설치 실패로 본다.
- `/design-kit/pub/web/` 또는 `/design-kit/pub/app/`가 빈 화면이면 `empty-raw` 모드에서는 정상일 수 있다.
- `plodikit init`은 `sample-scaffold`가 아닌 설치에서 선택 surface에 맞는 lightweight `pub/index.html` 허브를 다시 쓴다.

## 샘플 콘텐츠 초기화

모듈을 제품 repo에 심을 때 플디킷 샘플 콘텐츠를 그대로 납품물로 취급하지 않는다.

초기화 대상:

- 샘플 프로젝트명, 브랜드명, 설명 문구
- 샘플 이미지와 생성 이미지
- 샘플 프로그램, 지도, 공지 데이터
- 샘플 export PNG와 pending 목록
- 샘플 sitemap 문구

유지 대상:

- `pub/` 허브
- 고정 canvas 구조
- iframe 연결 방식
- device mockup wrapper
- export capture query 규칙
- screenshot 기록 위치
- README와 MODULE 계약 구조

`empty-raw` 모드에서는 샘플 raw source를 비우되, portfolio wrapper를 제품 context에 맞춰 재작성하지 않는다.
제품명, 문구, 이미지 치환은 raw source와 문서에서 처리하고, portfolio wrapper의 layout과 device 합성 구조는 원본을 유지한다.

## Portfolio Wrapper 보존 규칙

포트폴리오 wrapper는 제출물 캔버스와 device 합성 품질을 보장하는 모듈 코드다.
제품 repo에 심을 때 아래 파일은 원본 플디킷과 동일하게 유지한다.

```text
portfolio/kmong/styles.css
portfolio/kmong/web/index.html
portfolio/kmong/web/main-thumbnail.html
portfolio/kmong/web/detail-page.html
portfolio/kmong/web/pages.html
portfolio/kmong/mobile/index.html
portfolio/kmong/mobile/main-thumbnail.html
portfolio/kmong/mobile/detail-page.html
portfolio/kmong/mobile/pages.html
```

제품별 시각 변경은 `pub/web/`, `pub/app/`, `DESIGN.md`, README에서 처리한다.
wrapper 수정은 캔버스 크기, device mockup, iframe 경로, capture query가 바뀌는 경우에만 별도 작업으로 승격한다.

## Iframe 계약

portfolio composite는 raw source를 복제하지 않고 iframe으로 참조한다.

- raw source는 `pub/` 아래에만 둔다.
- device mockup, 썸네일, 상세 이미지, 페이지 모음은 `portfolio/` 아래에만 둔다.
- iframe 상대경로는 대상 설치 경로 기준으로 검증한다.
- 대표 썸네일과 서브 상세는 `pub/web/` 또는 `pub/app/`의 같은 raw source를 바라본다.
- 페이지 모음은 별도 설명 헤더나 카드로 재구성하지 않고 raw publishing 전체를 붙인다.

웹 portfolio iframe 기본 경로:

```text
대표 썸네일: ../../../pub/web/?viewport=desktop&embed=1
서브 상세 desktop: ../../../pub/web/?viewport=desktop&embed=1
서브 상세 tablet: ../../../pub/web/?viewport=tablet&embed=1
서브 상세 mobile: ../../../pub/web/?viewport=mobile&embed=1
웹 페이지 모음: ../../../pub/web/?embed=1
```

`empty-raw` 모드에서는 iframe 내부가 blank 또는 최소 placeholder로 보일 수 있다.
이 상태는 raw source를 아직 작성하지 않았다는 뜻이며, wrapper 오류가 아니다.

웹 full page export는 최종 `pub/web/` 높이에 따라 다시 측정한다.
현재 scaffold에서 맞춘 높이를 최종 퍼블리싱에 그대로 신뢰하지 않는다.

## Export 크기 규칙

크몽 포트폴리오 기본 캔버스:

- 대표 썸네일: `1200x1200`
- 서브 상세: `1200x2100`
- 모바일 페이지 모음: `1200x1580`
- 웹 full 페이지 모음: 최종 `pub/web/` 높이를 측정해 고정한다.

export 버튼, 다운로드 UI, 검수용 네비게이션은 최종 PNG 안에 들어가면 안 된다.
텍스트 overflow, clipped content, incoherent overlap은 blocker다.

## 필수 검증 URL

설치 경로가 `design-kit/`인 경우 기본 검증 URL은 아래와 같다.
제품 repo의 dev server prefix가 다르면 prefix만 바꾼다.

```text
/design-kit/
/design-kit/pub/
/design-kit/styleguide/
/design-kit/styleguide/sitemap.html
/design-kit/portfolio/kmong/
```

web-only target이면 추가로 확인한다.

```text
/design-kit/pub/                         200, non-empty hub
/design-kit/pub/web/                     200, empty 또는 placeholder 가능
/design-kit/portfolio/kmong/web/
/design-kit/portfolio/kmong/web/main-thumbnail.html
/design-kit/portfolio/kmong/web/detail-page.html
/design-kit/portfolio/kmong/web/pages.html?capture=full
```

app-only target이면 추가로 확인한다.

```text
/design-kit/pub/app/
/design-kit/portfolio/kmong/mobile/
/design-kit/portfolio/kmong/mobile/main-thumbnail.html
/design-kit/portfolio/kmong/mobile/detail-page.html
/design-kit/portfolio/kmong/mobile/pages.html?capture=home
```

## 배포 방지 가드

제품 repo의 운영 배포에 `design-kit/`가 포함되면 안 된다.
배포 workflow가 있으면 아래 가드를 추가한다.

GitHub Actions path guard 예시:

```yaml
on:
  push:
    branches: [main]
    paths-ignore:
      - "design-kit/**"
```

정적 산출물 포함 방지 예시:

```bash
test ! -d .vercel/output/static/design-kit
test ! -d public/design-kit
```

Cloudflare Pages, Vercel, Netlify 등 실제 배포 산출물에 `design-kit`가 들어가면 실패로 처리한다.

## 설치 전 체크리스트

- 대상 repo의 기존 디자인 키트 경로를 확인했다.
- 기존 `design-lab/` 또는 `kmong-thumbnail/`을 새 모듈과 섞지 않는다.
- 대상 surface가 web-only, app-only, multi-surface 중 무엇인지 결정했다.
- install mode가 `empty-raw`, `sample-scaffold`, `copy-existing` 중 무엇인지 결정했다.
- 제거할 surface와 유지할 surface를 확정했다.
- 루트 제품 `DESIGN.md`를 덮어쓰지 않는 방침을 확정했다.
- iframe 상대경로 기준 URL을 확정했다.
- 제품 repo에 배포 workflow가 있으면 `design-kit/**` 배포 제외 가드를 추가할 위치를 확인했다.

## 설치 후 체크리스트

- 선택하지 않은 surface 파일이 남지 않았다.
- `pub/index.html` 허브가 200으로 응답하고 빈 화면이 아니다.
- `empty-raw` 모드에서는 raw source만 비어 있고 wrapper는 유지됐다.
- 샘플 콘텐츠가 제품 context로 초기화되거나 제거됐다.
- iframe이 raw source를 정상 참조한다. raw가 empty면 iframe 내부 blank는 정상이다.
- 포트폴리오 wrapper 파일이 원본과 동일하다.
  - `cmp portfolio/kmong/styles.css <source>/portfolio/kmong/styles.css`
  - `cmp portfolio/kmong/web/detail-page.html <source>/portfolio/kmong/web/detail-page.html`
- 주요 route가 200으로 응답한다.
- stale sample screenshot/export PNG가 제거됐다.
- `empty-raw` 모드에서는 `screenshots/origin/`과 `screenshots/pub/`가 제거됐다.
- raw 디자인 작성 후 screenshot으로 대표, 상세, 페이지 모음의 clipping과 overlap을 확인했다.
- README, screenshots README, sitemap 링크가 실제 경로와 일치한다.
- 운영 배포 산출물에 `design-kit`가 포함되지 않는다.
- `git diff --check`를 통과했다.

## 스킬 승격 후보

이 계약이 2개 이상의 제품 repo에 반복 적용되어 안정되면 별도 실행 스킬로 승격한다.

후보 이름:

```text
plostack:design-kit-install
```

스킬은 이 `MODULE.md`를 source of truth로 읽고, target surface 선택, 파일 가지치기, iframe 경로 검증, route/screenshot 검증을 자동화한다.
