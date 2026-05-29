# Screenshots

캡처 증거와 최종 export PNG를 목적별로 저장합니다.

## Directories

- `origin/`: 실제 앱 또는 원본 구현 화면에서 가져온 기준 캡처
- `pub/`: `pub/` raw artboard 캡처
- `styleguide/`: `styleguide/` 디자인 시스템 검수 캡처
- `portfolio/kmong/mobile/`: 크몽 모바일 앱 포트폴리오 최종 export PNG
- `portfolio/kmong/web/`: 크몽 웹사이트 포트폴리오 최종 export PNG

## Current Pub Captures

- `pub/pub-home-390.png`
- `pub/pub-qr-390.png`
- `pub/pub-notices-390-fixed.png`
- `pub/pub-map-390.png`
- `pub/pub-home-344.png`
- `pub/pub-tabs-344.png`
- `pub/pub-tabs-390.png`

## Current Kmong Captures

- `portfolio/kmong/mobile/kmong-main-thumbnail.png`
- `portfolio/kmong/mobile/kmong-detail-page.png`
- `portfolio/kmong/mobile/kmong-mobile-page-01.png`
- `portfolio/kmong/mobile/kmong-mobile-page-02.png`
- `portfolio/kmong/mobile/kmong-mobile-page-03.png`
- `portfolio/kmong/mobile/kmong-mobile-page-04.png`
- `portfolio/kmong/service/kmong-service-main-thumbnail.png` - 652x488
- `portfolio/kmong/web/plostack-web-main-thumbnail.png` - 1200x1200
- `portfolio/kmong/web/plostack-web-detail-page.png` - 1200x2100
- `portfolio/kmong/web/plostack-web-page-full.png` - 1200x3692
- `portfolio/kmong/web/plostack-web-page-01-dashboard.png` - 1200x867
- `portfolio/kmong/web/plostack-web-page-02-members.png` - 1200x867
- `portfolio/kmong/web/plostack-web-page-03-content-qr.png` - 1200x867
- `portfolio/kmong/web/plostack-web-page-04-notice-push.png` - 1200x867

## Installed Empty Raw Mode

제품 repo에 `empty-raw` 모드로 설치하면 sample raw source를 비우므로 기존 sample screenshot/export PNG는 유효하지 않다.

- `screenshots/portfolio/kmong/web/*.png`는 제거한다.
- `screenshots/origin/`, `screenshots/pub/`의 sample captures도 제거한다.
- raw 디자인을 작성한 뒤 대표 썸네일, 서브 상세, 페이지 모음을 다시 캡처한다.
- portfolio wrapper iframe 내부가 blank인 캡처는 raw source 작성 전 상태로만 취급하고 최종 export로 쓰지 않는다.
- generated sample image를 제거했다면 assets README 또는 설치 기록에 "no generated sample image yet" 상태를 남긴다.

## Web Export Command

- `npm run export:web` captures `portfolio/kmong/web/` source canvases through Chrome DevTools Protocol `Page.captureScreenshot`.
- The command waits for iframe loading, hides working action buttons, validates visible iframes, and writes PNG files into `screenshots/portfolio/kmong/web/`.
