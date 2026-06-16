const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session")
    const { version } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        auth: state,
        printQRInTerminal: false
    })

    // Pairing system
    if (!sock.authState.creds.registered) {
        const phoneNumber = "254712345678" // 🔴 PUT YOUR NUMBER HERE

        const code = await sock.requestPairingCode(phoneNumber)
        console.log("Your Pairing Code:", code)
    }

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0]
        if (!msg.message) return

        const text = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (text === "ping") {
            await sock.sendMessage(msg.key.remoteJid, { text: "pong 🏓" })
        }
    })
}

startBot()
