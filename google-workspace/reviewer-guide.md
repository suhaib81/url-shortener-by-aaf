# Google Workspace Marketplace review walkthrough

App: URL Shortener by A.af

Google Workspace project: `aaf-workspace-add-on`

## Account and permissions

The add-on uses the Google account email to connect to an A.af account with the
same confirmed email. The reviewer can use the Google account supplied by the
review team, sign in to A.af with Google, and create a free A.af account. No A.af
API token, owner password, paid subscription, or special workspace role is
required. If the reviewer account cannot use self-service sign-up, contact
`info@a.af` for an isolated test account before testing; do not use the owner's
account.

The deployment requests `userinfo.email` for identity and `drive.file` for
per-file access. The reviewer also grants access to the specific open file in
Google Docs, Sheets, or Slides. A.af reads only the file ID and Drive API
`webViewLink`, never its body or the OAuth access token after the request.

## Test flow

1. Install the review deployment and open a new Google Doc owned by the reviewer.
2. Open the `URL Shortener by A.af` side panel. If prompted, approve the two
   scopes above.
3. Select **Connect A.af account**. In the browser, sign in to A.af with the
   same Google account; complete account creation or email confirmation if
   prompted, then connect the accounts.
4. Return to the Doc and reload its side panel. Select **Allow access to open
   file** and approve this file only.
5. Select an A.af workspace, then **Shorten open file**. Open the resulting
   `https://a.af/...` link and verify it opens the same Doc.
6. In A.af Dashboard, verify the short link belongs to that workspace. The
   same flow works in Sheets and Slides. For Gmail, Drive, or Calendar, paste a
   destination URL in the form and select **Create short link**.
7. To revoke the account connection, open `https://a.af/google-workspace`.

The video submitted with the review must show steps 1-6 from the live installed
version, with private account details and any tokens excluded from the frame.
