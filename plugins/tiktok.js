const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();
//tiktok downloader
cmd({
    pattern: "tiktok",
    alias: ["tt"],
    desc: "Download tt videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("Please provide a valid Tiktok video URL!");
        const data = await fetchJson(`${baseUrl}/api/tiktokdl?url=${q}`);
        let desc = ` *QUEEN -ISHU-MD TikTok DOWNLOADER...⚙️*

*Reply This Message With Option*

*1 Download TikTok Video With Watermark*

*2 Download TikTok Video Without Watermark*


*3 Download Audio*

*©CREAT BY LAKSIDU NIMSARA*`;

        const vv = await conn.sendMessage(from, { image: { url: "https://i.imgur.com/9nNY1r6.jpeg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        await conn.sendMessage(from, { video: { url: data.data.wm }, mimetype: "video/mp4", caption: "*©Qᴜᴇᴇɴ ᴋʏʟɪᴇ-ᴍᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜッ*" }, { quoted: mek })  
                        break;
                    case '2':               
                    await conn.sendMessage(from, { video: { url: data.data.no_wm }, mimetype: "video/mp4", caption: "*©Qᴜᴇᴇɴ ᴋʏʟɪᴇ-ᴍᴅ ʙʏ ꜱᴀʜᴀꜱ ᴛᴇᴄʜッ*" }, { quoted: mek })
                        break;
                    case '3':               
                    await conn.sendMessage(from, { audio: { url: data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })
                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});


                      
