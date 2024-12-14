import fetch from 'node-fetch'
import * as cheerio from 'cheerio'
import querystring from 'querystring'

async function igdl2(instaUrl) {
  const url = 'https://indownloader.app/request'
  
  // Validate Instagram URL format
  const instaUrlRegex = /^https:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+\/?.*/;
  if (!instaUrlRegex.test(instaUrl)) {
    throw new Error('Invalid Instagram URL');
  }

  const headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:130.0) Gecko/20100101 Firefox/130.0',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    Origin: 'https://indownloader.app',
    Connection: 'keep-alive',
    Referer: 'https://indownloader.app/',
    Cookie: 'PHPSESSID=n5nj64la8r4atsirs29oukcna3', // Potentially dynamic or stored in environment variables
    Priority: 'u=0',
  }

  const body = querystring.stringify({
    link: instaUrl,
    downloader: 'photo',
  })

  try {
    // Make the POST request
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    })
    
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json()

    // Handle error in API response
    if (data.error) {
      throw new Error('Error in API response');
    }

    if (!data.html) {
      throw new Error('Missing HTML content in API response');
    }

    const $ = cheerio.load(data.html)

    const thumbnail = $('.post-thumb img').attr('src')

    const downloadLinks = []
    $('.download-options a').each((index, element) => {
      downloadLinks.push({
        label: $(element).text().trim(),
        url: $(element).attr('href'),
      })
    })

    // Return the data
    return {
      creator: 'Qasim Ali',
      thumbnail,
      downloadLinks,
    }
  } catch (error) {
    // Log and rethrow error for proper handling in calling function
    console.error('Error:', error.message)
    throw new Error(error.message)
  }
}

export default igdl2
