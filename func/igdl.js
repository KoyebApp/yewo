import puppeteer from 'puppeteer';

/**
 * Download media from Instagram URL using Publer Media Downloader with Puppeteer.
 * @param {string} url - The Instagram URL (reel, post, tv) to download media from.
 * @returns {Promise<object>} - Returns a success/failure object with media links.
 */
async function igdl(url) {
  try {
    // Validate URL format
    const regex = /^https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+\/?.*/;
    if (!regex.test(url)) {
      throw new Error("Invalid Instagram URL.");
    }

    // Launch Puppeteer browser instance
    const browser = await puppeteer.launch({ headless: true });  // headless: false if you want to see the browser actions
    const page = await browser.newPage();

    // Go to the new Publer media downloader page
    await page.goto('https://publer.com/tools/media-downloader', { waitUntil: 'domcontentloaded' });

    // Wait for the input field and submit button to be available
    await page.waitForSelector('input[name="url"]');
    await page.waitForSelector('button[type="submit"]');

    // Type the URL into the input field and submit the form
    await page.type('input[name="url"]', url);
    await page.click('button[type="submit"]');

    // Wait for the result (this might vary, so adjust selector accordingly)
    await page.waitForSelector('.download-url');  // Update based on correct selector

    // Get the media URL (this is just an example, adjust based on what the website returns)
    const mediaUrl = await page.evaluate(() => {
      const mediaElement = document.querySelector('.download-url a'); // Update based on correct selector
      return mediaElement ? mediaElement.href : null;
    });

    // Close the Puppeteer browser instance
    await browser.close();

    if (mediaUrl) {
      return {
        success: true,
        media: [
          {
            type: 'video',  // Assuming it's a video
            url: mediaUrl,
            thumb: `https://img.youtube.com/vi/${url.split('/').pop()}/0.jpg`,  // Thumbnail placeholder
          }
        ]
      };
    } else {
      throw new Error('Media URL not found.');
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      errors: [error.message],
    };
  }
}

export default igdl;
