# Torren Technical Website

Production marketing site for Torren Technical — Australian specialist recruitment for engineering, industrial trades, and construction.

## Stack
- Static HTML/CSS/JS
- Hosted on Cloudflare Pages
- Auto-deployed from `main` branch on push
- Domains: torrentechnical.com (primary), torren-technical.com (redirect)

## Editing
This site is built to be edited via the GitHub web interface from any device.

- Pages: `index.html`, `about.html`, `employers.html`, `candidates.html`, `contact.html`
- Styles: `assets/css/style.css`
- Scripts: `assets/js/main.js`
- Redirects: `_redirects`
- HTTP headers: `_headers`

Every commit to `main` triggers an automatic Cloudflare Pages deploy (~30 seconds).

## Integrations
- Candidate registration form: hosted on n8n at `n8n.torrentechnical.com`
- Employer enquiry form: POSTs to n8n webhook
- Contact form: POSTs to n8n webhook
- Email aliases: info@, employers@, candidates@ all route to matt's Workspace inbox

## Compliance
- Privacy Act 1988 (Cth) consent collected on all forms
- Spam Act 2003 — all outbound email includes unsubscribe
- Australian Privacy Principles (APPs) aligned

## Brand
- Primary background: `#0A1628`
- Surface: `#142640`
- Text: `#F5F2EB`
- Accent: `#D97757`
- Type: Inter Tight (headings) + Inter (body)
