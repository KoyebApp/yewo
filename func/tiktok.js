import TikTokScraper from 'tiktok-scraper';

// Function to get TikTok video metadata
async function TiktokData(url) {
    const videoMeta = await TikTokScraper.getVideoMeta(url);
    return ({
        status: true,
        code: 200,
        creator: "Qasim Ali",
        judul: videoMeta.collector[0].text,
        video_URL: {
            vid_wm: videoMeta.collector[0].videoUrl,
            vid_nowm: videoMeta.collector[0].videoUrlNoWaterMark
        }
    });
}

// Main TikTok function
const Tiktok = (url) => new Promise((resolve, reject) => {
    if (url === 'undefined') { 
        reject('Provide Text Bro.'); 
    }
    try {
        TiktokData(url).then(data => {
            resolve(data);
        });
    } catch (error) {
        reject({
            code: 400,
            message: error
        });
    }
});

// Exporting the Tiktok function as default export
export default Tiktok;
