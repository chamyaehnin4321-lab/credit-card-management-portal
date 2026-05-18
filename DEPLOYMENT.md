# Deployment Notes

This portal is a static web application. It can be deployed globally on any static hosting platform.

## Public Hosting Options

Use one of these providers:

- Vercel
- Netlify
- Cloudflare Pages
- Azure Static Web Apps
- AWS S3 + CloudFront
- Nginx on a VM

## Required Files

Deploy these files and folders:

- `index.html`
- `portal/`
- `README.md` and `docs/` are optional documentation

## Local Network Access

The local server now listens on `0.0.0.0` by default when restarted:

```powershell
.\start-portal.ps1
```

Other machines on the same network can open:

```text
http://YOUR_MACHINE_IP:4173
```

This is LAN access, not public internet hosting.

## Global Deployment Limitation

Publishing to a public URL requires a hosting account, project, or server credentials. Once a target provider is confirmed, deploy the static files above.
