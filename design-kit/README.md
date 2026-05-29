# Plostack Design Kit

프로젝트에 모듈처럼 심어서 초기 디자인 원본, 퍼블리싱 화면, 포트폴리오 제출물을 뽑는 디자인 산출 키트입니다. 디자인 원본, raw 화면, 스타일가이드, 포트폴리오 export, screenshot 결과를 한 구조로 관리합니다.

This installed module is a product-local snapshot of Plostack Design Kit.

## Run

```bash
npm run design
```

VSCode에서 수동으로 띄울 때는 `Run and Debug` 또는 `Tasks: Run Task`에서 `Plostack: start design server`를 선택합니다.

Open:

- `http://localhost:8090/`
- `http://localhost:8090/sitemap.xml`
- `http://localhost:8090/pub/`
- `http://localhost:8090/pub/app/`
- `http://localhost:8090/pub/web/`
- `http://localhost:8090/styleguide/`
- `http://localhost:8090/styleguide/sitemap.html`
- `http://localhost:8090/portfolio/kmong/`
- `http://localhost:8090/portfolio/kmong/mobile/`
- `http://localhost:8090/portfolio/kmong/web/`

## Structure

- `DESIGN.md`: project design source of truth. Treat this as the rulebook.
- `sitemap.xml`: sitemap for this design-system kit site. Replace `localhost:8090` when a deployment domain exists.
- `pub/`: raw publishing hub. App raw screens live in `pub/app/`; web raw screens live in `pub/web/`.
- `styleguide/`: visualized tokens, components, patterns, and UI states from `DESIGN.md`.
- `portfolio/kmong/`: Kmong portfolio hub. Mobile app and responsive web packages live under `mobile/` and `web/`.
- `screenshots/`: captured origin, pub, styleguide, and portfolio outputs.
- `assets/`: shared visual inputs such as generated images, brand files, and mockup resources.
- `AGENTS.md`: repo-local operating rules for design-kit work.

## Output Model

```text
DESIGN.md
  -> styleguide/       visual proof of tokens and components
  -> pub/              raw app/web surface hub and artboards
  -> portfolio/kmong/  external portfolio/composite exports
  -> screenshots/      captured evidence and final PNG outputs
```

## Module Install Contract

제품 repo에 이 키트를 심을 때는 [MODULE.md](./MODULE.md)를 기준으로 한다.

Install modes:

- `empty-raw`: 새 제품 디자인을 처음부터 시작한다. `pub/` 허브와 portfolio wrapper는 유지하고, `pub/web/` 또는 `pub/app/` raw source만 비운다.
- `sample-scaffold`: 플디킷 기능 검증과 데모용이다. 이 repo의 generic scaffold와 sample screenshots를 유지한다.
- `copy-existing`: 승인된 제품 raw source를 `pub/web/` 또는 `pub/app/`에 넣고 screenshots/export를 다시 만든다.

원본 플디킷 repo는 iframe, capture, device mockup, export canvas 검증을 위해 scaffold를 유지한다.
제품 repo 설치본에서 `empty-raw`를 선택하면 portfolio iframe 내부가 비어 보일 수 있으며, 이 상태는 raw 디자인을 아직 작성하지 않았다는 의미다.

CLI:

```bash
node bin/plodikit.js init /path/to/product/design-kit --surface web --mode empty-raw
node bin/plodikit.js doctor --target /path/to/product/design-kit --surface web --mode empty-raw
```

패키지로 설치한 제품 repo에서는 `npx plodikit init design-kit --surface web --mode empty-raw` 형태로 사용한다.

## Kmong Package

`portfolio/kmong/` is the renamed successor of the old `kmong-thumbnail/` directory. It is now a hub:

- `portfolio/kmong/mobile/`: mobile app portfolio package
- `portfolio/kmong/web/`: responsive website portfolio package

Expected final PNG outputs:

- `screenshots/portfolio/kmong/mobile/kmong-main-thumbnail.png`
- `screenshots/portfolio/kmong/mobile/kmong-detail-page.png`
- `screenshots/portfolio/kmong/mobile/kmong-mobile-page-01.png`
- `screenshots/portfolio/kmong/mobile/kmong-mobile-page-02.png`
- `screenshots/portfolio/kmong/mobile/kmong-mobile-page-03.png`
- `screenshots/portfolio/kmong/mobile/kmong-mobile-page-04.png`
- `screenshots/portfolio/kmong/web/plostack-web-main-thumbnail.png` - 1200x1200
- `screenshots/portfolio/kmong/web/plostack-web-detail-page.png` - 1200x2100
- `screenshots/portfolio/kmong/web/plostack-web-page-full.png` - 1200x3692
- `screenshots/portfolio/kmong/web/plostack-web-page-01-dashboard.png` - 1200x867
- `screenshots/portfolio/kmong/web/plostack-web-page-02-members.png` - 1200x867
- `screenshots/portfolio/kmong/web/plostack-web-page-03-content-qr.png` - 1200x867
- `screenshots/portfolio/kmong/web/plostack-web-page-04-notice-push.png` - 1200x867

Run `npm run export:web` to regenerate the web package PNGs through Chrome DevTools Protocol capture.

## Local Secrets

Do not commit API keys or private endpoint values. Keep product runtime values in the product repo `.env.local`, not inside `design-kit/`.
