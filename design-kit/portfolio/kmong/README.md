# Kmong Portfolio Package

크몽 포트폴리오에 올릴 외부 제출용 HTML/CSS 산출물입니다. 예전 `kmong-thumbnail/` 이름은 썸네일만 설명해서, 현재 구조에서는 `portfolio/kmong/`으로 관리합니다.

## Pages

- `index.html`: 모바일 앱과 반응형 웹사이트 패키지를 나누는 크몽 포트폴리오 허브
- `mobile/`: 기존 모바일 앱 대표 썸네일, 상세 이미지, 페이지 모음
- `web/`: 웹사이트 대표 썸네일, 서브 상세 이미지, 페이지 모음
- `styles.css`: 공통 토큰, 캔버스, 디바이스, 스크린샷 합성 스타일

## Source Inputs

- Raw app artboards: `../../pub/`
- Raw app screenshots: `../../screenshots/pub/`
- Final mobile exports: `../../screenshots/portfolio/kmong/mobile/`
- Final web exports: `../../screenshots/portfolio/kmong/web/`

## Expected Exports

- `mobile/kmong-main-thumbnail.png` - 1200x1200
- `mobile/kmong-detail-page.png` - 1200x2100
- `mobile/kmong-mobile-page-01.png` - 1200x1580
- `mobile/kmong-mobile-page-02.png` - 1200x1580
- `mobile/kmong-mobile-page-03.png` - 1200x1580
- `mobile/kmong-mobile-page-04.png` - 1200x1580
- `web/plostack-web-main-thumbnail.png` - 1200x1200
- `web/plostack-web-detail-page.png` - 1200x2100
- `web/plostack-web-page-full.png` - 1200x3692
- `web/plostack-web-page-01-dashboard.png` - 1200x867
- `web/plostack-web-page-02-members.png` - 1200x867
- `web/plostack-web-page-03-content-qr.png` - 1200x867
- `web/plostack-web-page-04-notice-push.png` - 1200x867

Capture each final PNG from its fixed `.canvas` element through `npm run export:web`. Work UI such as download buttons must not be included in exported images.
