const fs = require('fs');
const wa = require('@open-wa/wa-automate');

(async () => {
  try {
    console.log('Starting open-wa to generate session token (pair-mode)...');

    const client = await wa.create({
      headless: true,
      useChrome: true,
      qrTimeout: 60,
      authTimeout: 0,
      disableSpins: true,
      sessionDataPath: './session.json',
      qrLogSkip: false,
      logLevel: 'info'
    });

    try {
      const session = await client.getSessionTokenBrowser();
      if (!session) {
        console.error('⚠️ No session token returned. WhatsApp might require QR/pairing.');
      } else {
        fs.writeFileSync('session.json', JSON.stringify(session, null, 2));
        console.log('✔️ session.json generated successfully.');
      }
    } catch (err) {
      console.error('Error retrieving session token:', err?.message || err);
    }

    try { await client.kill(); } catch {}
    process.exit(0);
  } catch (e) {
    console.error('Fatal error:', e?.message || e);
    process.exit(1);
  }
})();
