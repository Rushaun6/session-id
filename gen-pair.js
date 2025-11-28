import makeWASocket, { useMultiFileAuthState, Browsers } from "@whiskeysockets/baileys"

async function generatePairCode() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth_info")

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: Browsers.ubuntu("Chrome"),
        syncFullHistory: false,
        markOnlineOnConnect: false,
        connectTimeoutMs: 30_000,
    })

    sock.ev.on("creds.update", saveCreds)

    try {
        console.log("Requesting pairing code...")
        const code = await sock.requestPairingCode("1") // your phone number country code only
        console.log("PAIR CODE:", code)
    } catch (err) {
        console.error("Error:", err)
    }
}

generatePairCode()
