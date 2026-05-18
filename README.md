# KBZ Credit Card Management Portal

Ready-to-use local portal for the Phase I Credit Card Management workflow.

## Run Now

Double-click `start-portal.cmd`, or run:

```powershell
.\start-portal.ps1
```

Then open:

```text
http://127.0.0.1:4173
```

The portal can also be opened directly from `index.html`.

## Included Ready Modules

- Super:
  - Hub: lists SSBP new applications and Branch-created new applications waiting for assignment.
  - Submit: lists assigned requests associated with operators.
  - MyBox: lists Operator PreApproved requests for Super final approval.
  - InProcess: lists in-process requests with customer request, cancel, view, history, and approval actions.
  - Branch-level view-only oversight: Approved Card List, Ready to Issue, Completed Card List.
- Operator:
  - Submit: lists assigned requests for the logged-in operator.
  - MyBox: lists assigned requests from Super and allows Go To InProcess.
  - InProcess: lists in-process requests with customer request, cancel, view, history, and preapproval actions.
- Branch:
  - Create New Application: branch-originated credit card application for walk-in customers.
  - Approved Card List: lists Super final approved card requests and moves them to Ready to Issue with pickup SMS tracking.
  - Ready to Issue: lists cards ready for pickup and moves them to Completed Card List with thank-you SMS tracking.
  - Completed Card List: lists completed pickup requests.
- Branch-created applications use the same approval and system flow as SSBP applications. Submitted branch applications appear in Super Hub as NEW.
- Branch Create New Application includes application information, guarantor information, supporting documents, and supplementary card details with a maximum of 4 supplementary cards.
- SSBP Process Flow module is available in the portal for Super, Operator, and Branch users.

## Deployment

The app is static and deployment-ready. See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel, Netlify, Cloudflare Pages, Azure Static Web Apps, AWS, or VM hosting notes.
- Pagination fixed at 30 rows.
- Applied Date and Time sorting, defaulted to latest first.
- Search across Document No, Application Channel, Application Type, Applicant Name, and NRC.
- Status, Stage, and Applied Date range filters.
- MMK currency formatting.
- Approved Amount displays `Pending` until available.

## Project Source

The React + TypeScript + Tailwind module source is kept under `src/` for the production implementation path. The ready-to-use local portal under `portal/` has no package-install requirement because this machine does not currently expose `npm` on PATH.
