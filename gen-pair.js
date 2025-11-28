import makeWASocket, { useMultiFileAuthState, Browsers } from "@whiskeysockets/baileys"

async function generatePairCode() {
  console.log("Requesting pairing code...")

  const { state, saveCreds } = await useMultiFileAuthState("./auth_info")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,   // IMPORTANT
    browser: Browsers.macOS("Safari"),
  })

  sock.ev.on("creds.update", saveCreds)

  try {
    const code = await sock.requestPairingCode("1")  // Jamaica ✔
    console.log("PAIR CODE:", code)
  } catch (err) {
    console.error("Error:", err)
  }
}

generatePairCode()
