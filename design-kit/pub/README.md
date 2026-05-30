# Pub

Raw app publishing/artboard output.

This directory is for screen originals only. Do not store device mockup composites, Kmong thumbnails, final portfolio pages, or platform-specific sales images here.

Current routes:

- `/pub/`
- `/pub/?screen=home`
- `/pub/?screen=qr`
- `/pub/?screen=notices`
- `/pub/?screen=map`

Local live-map secrets belong in `pub/kakao-config.local.js`, which is ignored by git. Load local-only values with `/pub/?localConfig=1`; do not pass review keys through URL parameters.
