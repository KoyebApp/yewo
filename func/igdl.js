import puppeteer from 'puppeteer';

/**
 * Download media from Instagram URL using Publer Media Downloader with Puppeteer.
 * @param {string} url - The Instagram URL (reel, post, tv) to download media from.
 * @returns {Promise<object>} - Returns a success/failure object with media links.
 */
async function igdl(url) {
  try {
    // Validate URL format
    console.log('Validating URL:', url);
    const regex = /^https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+\/?.*/;
    if (!regex.test(url)) {
      console.log('Invalid URL format');
      throw new Error("Invalid Instagram URL.");
    }
    console.log('URL validated successfully.');

    // Launch Puppeteer browser instance
    console.log('Launching Puppeteer browser...');
    const browser = await puppeteer.launch({ 
      headless: true,  // Make sure the browser runs in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Common flags to resolve some issues in certain environments
    });
    const page = await browser.newPage();
    console.log('Browser launched successfully.');

    // Go to the new Publer media downloader page
    console.log('Navigating to Publer media downloader page...');
    await page.goto('https://publer.com/tools/media-downloader', { waitUntil: 'domcontentloaded' });
    console.log('Navigation successful.');

    // Wait for the input field and submit button to be available
    console.log('Waiting for input field and submit button to load...');
    await page.waitForSelector('input[name="url"]');
    await page.waitForSelector('button[type="submit"]');
    console.log('Input field and submit button loaded.');

    // Type the URL into the input field and submit the form
    console.log('Typing URL into input field and submitting form...');
    await page.type('input[name="url"]', url);
    await page.click('button[type="submit"]');
    console.log('Form submitted successfully.');

    // Wait for the result (this might vary, so adjust selector accordingly)
    console.log('Waiting for the media download link to appear...');
    await page.waitForSelector('.download-url', { visible: true });
    console.log('Media download link appeared.');

    // Extract the media URL from the page
    console.log('Extracting media URL...');
    const mediaUrl = await page.evaluate(() => {
      const mediaElement = document.querySelector('.download-url a');  // Adjust selector based on the correct one
      return mediaElement ? mediaElement.href : null;
    });

    // Close the Puppeteer browser instance
    console.log('Closing Puppeteer browser...');
    await browser.close();

    if (mediaUrl) {
      console.log('Media URL extracted successfully:', mediaUrl);
      return {
        success: true,
        media: [
          {
            type: 'video',  // Assuming it's a video; modify if it's an image or other media type
            url: mediaUrl,
            thumb: `https://img.youtube.com/vi/${url.split('/').pop()}/0.jpg`,  // Thumbnail placeholder
          }
        ]
      };
    } else {
      console.log('No media URL found.');
      throw new Error('Media URL not found.');
    }
  } catch (error) {
    console.error('Error during media download process:', error);
    return {
      success: false,
      errors: [error.message],
    };
  }
}

export default igdl;
