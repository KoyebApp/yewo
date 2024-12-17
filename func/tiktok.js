import TikTokScraper from 'tiktok-scraper';

// Function to get TikTok video metadata
async function TiktokData(url) {
    try {
        const videoMeta = await TikTokScraper.getVideoMeta(url);
        return {
            status: true,
            code: 200,
            creator: "Qasim Ali",
            judul: videoMeta.collector[0].text,
            video_URL: {
                vid_wm: videoMeta.collector[0].videoUrl,
                vid_nowm: videoMeta.collector[0].videoUrlNoWaterMark
            }
        };
    } catch (error) {
        throw new Error(`Error fetching video metadata: ${error.message}`);
    }
}

// Main TikTok function using async/await for clarity and consistency
const Tiktok = async (url) => {
    if (!url) {
        throw new Error('Provide a valid URL.');
    }
    try {
        const data = await TiktokData(url);
        return data;
    } catch (error) {
        throw new Error(error.message || 'Unknown error occurred');
    }
};

// Exporting the Tiktok function as default export
export default Tiktok;
