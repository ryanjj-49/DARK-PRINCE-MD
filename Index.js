const { default: makeWASocket } = require("@whiskeysockets/baileys")

async function startBot() {
    const sock = makeWASocket()

    console.log("Bot started ✅")

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
