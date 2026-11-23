# ChemEase account setup

## Project configuration

Use the HTTPS Project URL (not the db. PostgreSQL host) and a publishable key in `.env.local`, following `.env.example`. Never put a service-role key, database password or Google secret in the frontend.

Run `supabase/migrations/202611230001_accounts.sql` once in Supabase SQL Editor. It creates owner-protected workspace storage, atomic revision writes and a private docking bucket. The migration policies are tested locally with PostgreSQL/PGlite in `tests/account-policies.test.ts`.

## Authentication

Authentication > URL Configuration:
- Site URL: https://loveless-rx.github.io/ChemEase/
- Redirect URLs: http://localhost:5174/, http://localhost:5174/?recovery=1, https://loveless-rx.github.io/ChemEase/, https://loveless-rx.github.io/ChemEase/?recovery=1

Google Auth Platform: configure branding and External audience, add test users while in Testing, create a Web application OAuth client. Authorized redirect URI: https://gjdonijrhntdyychhecv.supabase.co/auth/v1/callback . Enter the client ID and secret only in Supabase Authentication > Providers > Google, enable and save. Use production audience settings when opening access beyond Google test users.

Enable email/password with email confirmation. Configure custom SMTP for production confirmation and password-reset delivery. PKCE email links should be opened in the browser that requested them.

## Data behavior

Guest data stays in the local-device IndexedDB workspace. Account data is loaded from Supabase; no guest data is silently uploaded. Account settings offer explicit guest import. Duplicate IDs stop import instead of overwriting data. Account switching clears the editor and undo history and invalidates pending mutations. Expired sessions and cloud load failures do not create a writable empty account.

Projects, molecules, immutable versions, results and report references are saved as one versioned workspace document (20 MB limit). Writes use a database compare-and-swap revision to detect other-device changes. Failed writes retain the live drawing; download a backup before reloading after conflicts. Offline cloud writes are not queued or marked saved.

Browser docking files upload when Save run to workspace / reports is selected. Completed receptor, ligand and job records are private account objects (50 MB per record), downloaded on another device when opening docking. Running jobs and unsaved preparations remain device-local. Native backend files are not automatically uploaded. PDF and CSV reports are regenerated from their saved snapshots.

## GitHub Pages

Set repository Actions variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. The Pages workflow passes them at build time. Local `.env.local` is ignored by Git. No server secrets belong in these variables.

## Release checks

Run npm test, npm run lint and npm run build. Then verify with real accounts: email registration/confirmation, password reset, Google sign-in, sign-out, guest import, two-account isolation, another-device loading and conflicting saves. Check saved docking viewer and downloads on both devices. These external account flows require the configured provider and real user interaction; local tests are not evidence that Google credentials or email delivery are configured correctly.

References: https://supabase.com/docs/guides/auth/social-sign-in/auth-google , https://supabase.com/docs/guides/database/postgres/row-level-security , https://supabase.com/docs/guides/auth/auth-smtp
