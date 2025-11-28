import makeWASocket, {
  useMultiFileAuthState,
  Browsers
} from "@whiskeysockets/baileys"

async function generatePairCode() {
  console.log("Requesting pairing code...")

  const { state, saveCreds } = await useMultiFileAuthState("./auth_info")

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: false,
    syncFullHistory: false,   // REQUIRED
    browser: Browsers.macOS("Safari"), // RECOGNIZED DEVICE
  })

  sock.ev.on("creds.update", saveCreds)

  try {
    // PUT YOUR REAL NUMBER HERE
    const code = await sock.requestPairingCode("1876XXXXXXX")
    console.log("PAIR CODE:", code)
  } catch (err) {
    console.error("Error:", err)
  }
}

generatePairCode()
