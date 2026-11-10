# RSVP → Google Sheet setup

Sheet: https://docs.google.com/spreadsheets/d/10Z6p0d_Vu02On-TbNtbcZPf06cXfE459hFEuOxLNQ3c/edit

The script creates an **RSVP** tab with these headers automatically:

| Timestamp | Full Name | Attending | Number of Guests | Invited As | Invitation Link |
|---|---|---|---|---|---|

## 1. Add the script

1. Open the Google Sheet above.
2. **Extensions → Apps Script**.
3. Delete everything in `Code.gs` and paste the whole of `google-apps-script/code.gs`.
4. Click **Save** (disk icon).

## 2. Create the RSVP tab now (optional)

1. In the function dropdown at the top, choose **setup**, then click **Run**.
2. Google asks for permission the first time: **Review permissions** → choose your account →
   **Advanced** → **Go to (project name)** → **Allow**.
3. Back in the sheet, an **RSVP** tab with formatted headers appears.

(Skip this and the tab is created on the first RSVP instead.)

## 3. Deploy as a Web App

1. **Deploy → New deployment**.
2. Gear icon next to "Select type" → **Web app**.
3. **Execute as: Me**.
4. **Who has access: Anyone**  ← required, or guests' RSVPs are rejected.
5. **Deploy**, then copy the **Web app URL** (ends in `/exec`).

Check it: open the URL in a browser — it should show `{"ok":true,"message":"RSVP endpoint is running."}`.

## 4. Connect the website

Paste the URL into `src/utils/rsvp.ts`:

```ts
export const RSVP_SCRIPT_URL: string = 'https://script.google.com/macros/s/XXXX/exec';
```

Then build and push.

## Changing the script later

After editing `code.gs`, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**.
This keeps the same URL. ("New deployment" would create a different URL.)
