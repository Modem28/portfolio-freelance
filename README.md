# พอร์ตฟอลิโอท้องฟ้าตามเวลา

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

## Portfolio content and browser-only works toggle

Edit profile text, contact URLs, video Drive URLs and `worksTogglePassword` in `client/src/lib/portfolio-content.ts`. The small works control requires that configured password and stores show/hide state in `localStorage` for the current browser profile only. It is a convenience toggle, not access control: the password and video URLs are part of client-side code and can be inspected or bypassed. Do not use it to hide confidential work.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.
