// Netlify Server entrypoint. Starts the app's existing Express + Wisp server,
// which listens on process.env.PORT and handles the /wisp/ WebSocket upgrades.
import '../../server.js';
