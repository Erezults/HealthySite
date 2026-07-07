# Privacy Policy

**Last updated:** 28 May 2026

Healthy Circle ("the app", "we", "us") is an iOS and macOS application that lets a family share and organize personal health records. We take privacy seriously — both because the law requires it for **special-category health data** and because we built Healthy Circle for our own families first.

This Privacy Policy explains, in plain English, what we collect, why, who can see it, and what rights you have. It is a binding legal document between you and **Erez Cohen ("the developer")**, based in Tel Aviv, Israel.

---

## 1. Who we are and how to reach us

- **Data controller:** Erez Cohen
- **Address:** Tel Aviv, Israel
- **Contact email:** [healthy.support@erezults.com](mailto:healthy.support@erezults.com)
- **App name:** Healthy Circle (also referred to as "the app" below)

For any privacy question — data access, deletion, correction, complaint — email the address above. We aim to reply within 7 business days.

---

## 2. What Healthy Circle is, and what it isn't

Healthy Circle is a **personal record-keeping tool**. It stores health-related information you choose to enter or upload — appointments, prescriptions, lab results, scans, vaccination records, notes — and lets you share that record with members of a *family group* you create.

Healthy Circle is **not** a medical device, **not** a diagnostic tool, and **not** a substitute for professional medical advice. We do not provide medical care. See the Terms of Service for the complete medical disclaimer.

Healthy Circle **does not currently integrate with Apple HealthKit.** We neither read from nor write to HealthKit. If a future version adds HealthKit integration, it will be:

- opt-in per data type,
- clearly disclosed in this Privacy Policy,
- handled in compliance with Apple's HealthKit guidelines, including the rule that HealthKit data **must never be used for advertising or shared with third parties for marketing.**

---

## 3. Categories of data we process

### 3.1 Account data
When you sign up, we store:

- Your email address (or your Apple ID, if you use Sign in with Apple)
- A randomly generated user ID
- The display name and avatar you choose
- The preferred app language (English / Hebrew)
- Timestamps for sign-up and last login

### 3.2 Family group data
When you create or join a family group, we store:

- Group name and the user IDs of every member
- Each member's role (owner, admin, member, viewer)
- The avatar and display name you choose for that group

### 3.3 Member profiles
For each person whose records you enter (yourself, your child, your parent, etc.), we store:

- Display name, optional date of birth, optional sex
- Optional notes (e.g. "allergic to penicillin")
- A profile photo, if you add one

### 3.4 Health records — *special-category data*
Information you enter or upload, including but not limited to:

- Appointment dates, doctor names, clinic names
- Prescription names, dosages, frequencies, prescriber
- Lab results: numeric values, ranges, reference units, dates
- Imaging or scan attachments (PDF, JPG, PNG, HEIC)
- Vaccination records
- Free-text notes you write yourself

Under GDPR Article 9 and equivalent laws, this is **special-category personal data** ("health data"). We process it on the basis of your **explicit consent** (Article 9(2)(a)) — by entering it into the app, you affirmatively consent to its storage and processing as described here.

### 3.5 Device & diagnostic data
We collect minimal device data **only** to keep the app running:

- App version and OS version
- A randomly generated install ID (resettable by deleting and reinstalling the app)
- Crash logs (anonymized) via Apple's native crash-reporting tools
- Push-notification token (Apple Push Notification service, "APNs") — only if you enable notifications

We do **not** use third-party analytics SDKs, advertising SDKs, or cross-app trackers. There is no Google Analytics, no Facebook SDK, no Mixpanel, no Segment, no AppsFlyer.

### 3.6 What we don't collect

- Your contacts, calendar, location, photos library (except images you explicitly attach to a record), microphone audio, or call history.
- We don't link your Healthy Circle data to any advertising identifier.
- We don't sell or rent your data. Ever.

---

## 4. Where your data lives

### 4.1 Storage
- **Database & file storage:** [Supabase](https://supabase.com) (provider: Supabase Inc., USA, with data hosted in EU region).
- **Authentication:** Supabase Auth + Apple's Sign in with Apple service.
- **Push notifications:** Apple Push Notification service (APNs).
- **AI document parsing:** a third-party AI provider, called server-side through a Supabase Edge Function. See Section 5.

### 4.2 Access control — Row-Level Security
Every row in our database is protected by a **Row-Level Security (RLS) policy**. The database itself refuses to return a row to a user who isn't a member of the group it belongs to. This is not an application-level check that we could accidentally forget — it is enforced by Postgres before any data leaves the database.

There is **no admin override**. The developer cannot, from a query console, read your records. (We can see schema and aggregate, non-personal database metrics — never row contents.)

### 4.3 Encryption
- All data is encrypted **in transit** with TLS 1.2 or higher.
- All data is encrypted **at rest** in Supabase storage using industry-standard AES-256.
- Auth tokens and session data are stored in the iOS Keychain.

---

## 5. AI document parsing

When you upload a medical document (lab report, prescription, referral, vaccination record), the app sends the document to a **Supabase Edge Function** running on Supabase's secure infrastructure. The Edge Function:

1. Forwards the document to a **third-party AI provider** via its API.
2. Receives a structured JSON response (dates, doctor names, lab values, etc.).
3. Returns the structured fields to your device, which you can review, edit, or discard before saving.

**Document retention:** the original document is stored in your private Supabase Storage bucket, protected by the same RLS rules as the rest of your data. It is not stored separately by the AI provider or by us.

Before any document is sent to the AI service for the first time, the app asks for your explicit permission and explains what will be sent and to whom; nothing is shared until you agree. You can withdraw that permission at any time with the **Settings → Share data with AI** toggle. Documents you add while sharing is off are stored only on your device and in your private bucket; no third-party AI service sees them.

---

## 6. Sharing — who sees what

| Audience | What they see |
|---|---|
| Members of your family group | Every record in the group's shared profiles, subject to their assigned role. |
| Other Healthy Circle users (outside your group) | **Nothing.** RLS prevents it. |
| The developer | Schema and aggregate non-personal metrics only. Never row contents. |
| Third parties | We do not sell, rent, or share your data with third parties for their own purposes. |
| Law enforcement / court orders | Only if we receive a valid legal order. We have never received one. If we did, we would push back where appropriate and would inform you unless legally prohibited. |

---

## 7. Your rights

You have the right to:

- **Access** your data — request a copy of everything we store. Or self-serve via *Settings → Export*, which downloads a ZIP archive (records as JSON + every original attachment).
- **Correct** any inaccurate data — edit it directly in the app, or email us.
- **Delete** your data — *Settings → Delete account* removes you from every group; if you were the sole owner of a group, the group and all its data are deleted.
- **Restrict / object** to processing — though most processing is necessary to provide the app at all. Deletion is the remedy if you object.
- **Portability** — the ZIP export above is in a standard, machine-readable format (JSON + original files).
- **Withdraw consent** — at any time. Withdrawal does not affect processing that already happened lawfully. To withdraw, delete the data, the group, or the account.
- **Lodge a complaint** with a supervisory authority — for example the Israeli Privacy Protection Authority or, for EU residents, the data protection authority in your country.

Deletion takes effect immediately for the database. Backups containing your data are rotated out within 30 days.

---

## 8. Children

Healthy Circle is not directed at children under 13 (or under 16 in EU jurisdictions where that is the minimum digital consent age). Children's records added by a parent are processed under the parent's authority and consent.

If you believe we have collected data from a child without proper parental consent, email us and we will delete it promptly.

---

## 9. International transfers

Supabase hosts our data in the EU region by default. Some sub-processors (Apple for APNs, and our AI provider for document parsing) may process data in the United States and other regions. Where such transfers occur, they rely on:

- Standard Contractual Clauses (SCCs) approved by the European Commission, where required,
- Apple's and our providers' published cross-border data-transfer commitments.

You consent to these transfers by using the app. If you do not consent, do not use the app.

---

## 10. Retention

We retain data for as long as your account or group exists. Specifically:

- Health records are retained until you delete them.
- Account data is retained until you delete the account.
- Anonymous crash logs are retained for up to 90 days by Apple, per Apple's policy.
- Backups containing deleted data are rotated within 30 days.

---

## 11. Changes to this policy

When we update this policy materially, we will:

- Update the "Last updated" date at the top,
- Show a one-time notice inside the app the next time you launch it,
- Keep prior versions accessible on request.

Minor wording or formatting changes will not trigger an in-app notice.

---

## 12. Governing law and jurisdiction

This Privacy Policy is governed by the laws of the **State of Israel**, without regard to its conflict-of-laws rules. The courts of **Tel Aviv-Yafo, Israel** have exclusive jurisdiction over any dispute, except where mandatory local consumer law gives you the right to litigate in your country of residence.

---

## 13. One last note

We built Healthy Circle because we wanted it for our own families. We have no business model that depends on monetizing your data. We have no advertisers. We have no investors pressuring us to grow at the expense of privacy.

If anything in this policy is unclear, email us. We will explain.

— Erez Cohen
[healthy.support@erezults.com](mailto:healthy.support@erezults.com)
