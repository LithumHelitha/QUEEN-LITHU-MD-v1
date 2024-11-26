//======================= news command ====================
//=========================================================

const { cmd } = require('../command');
const Hiru = require('hirunews-scrap');
const Esana = require('@sl-code-lords/esana-news');
const axios = require('axios');
const config = require('../config');

let activeGroups = {};
let lastNewsTitles = {};

async function getLatestNews() {
    let newsData = [];
    
    // Hiru News
    try {
        const hiruApi = new Hiru();
        const hiruNews = await hiruApi.BreakingNews();
        newsData.push({
            title: hiruNews.results.title,
            content: hiruNews.results.news,
            date: hiruNews.results.date
        });
    } catch (err) {
        console.error(`Error fetching Hiru News: ${err.message}`);
    }

    // Esana News
    try {
        const esanaApi = new Esana();
        const esanaNews = await esanaApi.getLatestNews(); 
        if (esanaNews && esanaNews.title && esanaNews.description && esanaNews.publishedAt) {
            newsData.push({
                title: esanaNews.title,
                content: esanaNews.description,
                date: esanaNews.publishedAt
            });
        } else {
            console.error("Error: Esana News returned invalid data.");
        }
    } catch (err) {
        console.error(`Error fetching Esana News: ${err.message}`);
    }

    return newsData;
}

// Function to check for and post new news to the group
async function checkAndPostNews(conn, groupId) {
    const latestNews = await getLatestNews();
    latestNews.forEach(async (newsItem) => {
        if (!lastNewsTitles[groupId]) {
            lastNewsTitles[groupId] = [];
        }

        if (!lastNewsTitles[groupId].includes(newsItem.title)) {
            await conn.sendMessage(groupId, { 
                text: `📰 *${newsItem.title}*\n${newsItem.content}\n${newsItem.date}\n\n> ᴘᴀᴡᴇʀᴇᴅ ʙʏ Qᴜᴇᴇɴ ᴅᴇᴡ-ᴍᴅ` 
            });
            lastNewsTitles[groupId].push(newsItem.title);

            if (lastNewsTitles[groupId].length > 100) {
                lastNewsTitles[groupId].shift();
            }
        }
    });
}


// Command to activate the general news service in the group
cmd({
    pattern: "startnews",
    desc: "Enable Sri Lankan news updates in this group",
    isGroup: true,
    react: "📰",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, participants }) => {
    try {
        if (isGroup) {
            const isAdmin = participants.some(p => p.id === mek.sender && p.admin);
            const isBotOwner = mek.sender === conn.user.jid;

            if (isAdmin || isBotOwner) {
                if (!activeGroups[from]) {
                    activeGroups[from] = true;

                    await conn.sendMessage(from, { text: "📰 24/7 News Activated." });

                    if (!activeGroups['interval']) {
                        activeGroups['interval'] = setInterval(async () => {
                            for (const groupId in activeGroups) {
                                if (activeGroups[groupId] && groupId !== 'interval') {
                                    await checkAndPostNews(conn, groupId);
                                }
                            }
                        }, 60000); // Check for news every 60 seconds
                    }

                } else {
                    await conn.sendMessage(from, { text: "📰 24/7 News Already Activated." });
                }
            } else {
                await conn.sendMessage(from, { text: "🚫 This command can only be used by group admins or the bot owner." });
            }
        } else {
            await conn.sendMessage(from, { text: "This command can only be used in groups." });
        }
    } catch (e) {
        console.error(`Error in news command: ${e.message}`);
        await conn.sendMessage(from, { text: "Failed to activate the news service." });
    }
});

// stop news
cmd({
    pattern: "stopnews",
    desc: "Disable Sri Lankan news updates in this group",
    isGroup: true,
    react: "🛑",
    filename: __filename
}, async (conn, mek, m, { from, isGroup, participants }) => {
    try {
        if (isGroup) {
            const isAdmin = participants.some(p => p.id === mek.sender && p.admin);
            const isBotOwner = mek.sender === conn.user.jid;

            if (isAdmin || isBotOwner) {
                if (activeGroups[from]) {
                    delete activeGroups[from];
                    await conn.sendMessage(from, { text: "🛑 24/7 News Deactivated." });

                    if (Object.keys(activeGroups).length === 1 && activeGroups['interval']) {
                        clearInterval(activeGroups['interval']);
                        delete activeGroups['interval'];
                    }
                } else {
                    await conn.sendMessage(from, { text: "🛑 24/7 News is not active in this group." });
                }
            } else {
                await conn.sendMessage(from, { text: "🚫 This command can only be used by group admins or the bot owner." });
            }
        } else {
            await conn.sendMessage(from, { text: "This command can only be used in groups." });
        }
    } catch (e) {
        console.error(`Error in news command: ${e.message}`);
        await conn.sendMessage(from, { text: "Failed to deactivate the news service." });
    }
});

//======================= news command ====================
//=========================================================

const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ========HIRU NEWS

cmd({
    pattern: "hirunews",
    alias: ["hiru","news1"],
    react: "🗞️",
    desc: "",
    category: "news",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/hiru`)
  
const msg = `❖ *QUEEN-LITHU-MD HIRU NEWS* ❖

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url}

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ʟɪᴛʜᴜᴍ ʜᴇʟɪᴛʜᴀ`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ===========SIRASA NEWS

cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "🗞️",
    desc: "",
    category: "news",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, quoted }) => {
try{

const news = await fetchJson(`${apilink}/sirasa`)
  
const msg = `❖ *QUEEN-LITHU-MD SIRASA NEWS* ❖ 

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url}

> ᴘᴀᴡᴇʀᴇᴅ ʙʏ ʟɪᴛʜᴜᴍ ʜᴇʟɪᴛʜᴀ`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})
