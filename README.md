# Twala Kitchen

A responsive restaurant website for Twala Kitchen, featuring Kenyan food, catering, the restaurant story, and WhatsApp enquiries. There is no database or custom backend.

## Update the placeholders

- **Menu and prices:** Edit the six menu entries and `$` prices in `src/routes/index.tsx`.
- **Phone and WhatsApp:** Replace `+254000000000` in phone links and `254000000000` in WhatsApp links with the real Kenyan number. Use digits only (including the country code) in `wa.me` links.
- **Email, location, and opening hours:** Replace `hello@twala.example`, `[Add your address here]`, and `[Add opening days and hours]` with the restaurant's real details.
- **Founder’s story:** Replace the bracketed story in the About section with Twala’s own words.
- **Food photographs:** The original illustrative food photos live in `src/assets/`. To use restaurant photography, replace these files or their imports in `src/routes/index.tsx` and update the image descriptions.

The contact form checks its required fields, then prepares a message in WhatsApp; it does not store or send information through a backend. Update the WhatsApp number before using it with customers.

## Run locally

This site is part of the project's TanStack Start app, rather than a standalone `index.html` file. Install the project's dependencies, then start its local preview:

```sh
bun install
bun run dev
```
