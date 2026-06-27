const fetch = require('node-fetch');

const handler = async (m, { text, client }) => {
    const args = text.split('|');
    if (args.length < 2) {
        return client.sendMessage(
            m.chat,
            { text: 'Kirim teks dengan format: .meme teks_atas|teks_bawah' },
            { quoted: m }
        );
    }

    const topText = args[0].trim();
    const bottomText = args[1].trim();

    try {
        // API untuk membuat meme
        const response = await fetch(
            `https://api.memegen.link/images/custom/${encodeURIComponent(topText)}/${encodeURIComponent(bottomText)}.png?background=https://via.placeholder.com/500`
        );

        if (!response.ok) {
            throw new Error('Gagal membuat meme. Coba lagi nanti!');
        }

        const memeUrl = response.url;

        // Kirim meme ke pengguna
        await client.sendMessage(
            m.chat,
            {
                image: { url: memeUrl },
                caption: `🎉 Meme berhasil dibuat!\n🔹 *Teks Atas:* ${topText}\n🔹 *Teks Bawah:* ${bottomText}`,
            },
            { quoted: m }
        );
    } catch (error) {
        console.error(error);
        client.sendMessage(m.chat, { text: 'Ups, terjadi kesalahan saat membuat meme!' }, { quoted: m });
    }
};

handler.help = ['meme <teks_atas>|<teks_bawah>'];
handler.tags = ['main'];
handler.command = ['meme'];

module.exports = handler;