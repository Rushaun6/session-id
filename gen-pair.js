import makeWASocket, { useMultiFileAuthState, fetchLatestBaileysVersion } from "@whiskeysockets/baileys";

async function generatePairCode() {
    const { state, saveCreds } = await useMultiFileAuthState("./auth_info_baileys");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false
    });

    // Request WhatsApp Pair Code
    const code = await sock.requestPairingCode("18763991485");

    console.log("======================================");
    console.log("         YOUR WHATSAPP PAIR CODE      ");
    console.log("======================================");
    console.log("Pair Code:", code);
    console.log("======================================");

    sock.ev.on("creds.update", saveCreds);
}

generatePairCode();
