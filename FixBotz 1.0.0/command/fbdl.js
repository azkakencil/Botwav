const fetch = require('node-fetch');

const handler = async (m, { text, client }) => {
    if (!text) {
        return client.sendMessage(m.chat, { text: 'woi mana link nya' }, { quoted: m });
    }

    try {
        const response = await fetch(`https://api.vreden.web.id/api/fbdl?url=${encodeURIComponent(text)}`);
        const result = await response.json();

        if (!result || !result.data || (!result.data.hd_url && !result.data.sd_url)) {
            return client.sendMessage(m.chat, { text: 'error mek😹😹. Cek URL atau coba lagi nanti.' }, { quoted: m });
        }

        const { hd_url, sd_url, title, durasi } = result.data;
        const videoUrl = hd_url || sd_url;

        await client.sendMessage(
            m.chat,
            {
                video: { url: videoUrl },
                caption: `🎥 *Judul:* ${title}\n⏳ *Durasi:* ${durasi}`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        client.sendMessage(m.chat, { text: 'ahh error lari.' }, { quoted: m });
    }
};

handler.help = ['fb <url>'];
handler.tags = ['downloader'];
handler.command = ['facebook'];

module.exports = handler;