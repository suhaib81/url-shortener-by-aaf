# URL Shortener by A.af for Google Workspace

This directory contains the public HTTP deployment manifest and Marketplace submission copy for the A.af Google Workspace add-on.

The add-on works in Gmail, Calendar, Drive, Docs, Sheets, and Slides. Users connect an email-confirmed A.af account, choose one of their workspaces, and create a secure A.af link without leaving the Google Workspace side panel.

## Runtime

- HTTP endpoint: `https://a.af/api/google-workspace/addon`
- Account linking: `https://a.af/google-workspace/connect`
- Connection management: `https://a.af/google-workspace`
- Privacy: `https://a.af/privacy`
- Terms: `https://a.af/terms`
- Support: `https://a.af/contact`

The implementation is in the private A.af application repository. This public repository contains no API keys or user credentials.

The deployment requests only `userinfo.email`. It does not read email messages,
calendar events, Drive files, or editor document contents.

Marketplace-ready icon and banner files are in `google-workspace/assets/`. Product screenshots should be captured from the installed test deployment so the listing shows the real Google Workspace experience.

## Installation for review

1. Enable Google Workspace Marketplace SDK in the A.af Google Cloud project.
2. Create an HTTP deployment using `deployment.json`.
3. Configure the Vercel server environment described in the private repository docs.
4. Install the test deployment from Google Cloud.
5. Open any supported Google Workspace app and select `URL Shortener by A.af` from the side panel.

## Verification

Run:

```bash
npm run test:google-workspace
```
