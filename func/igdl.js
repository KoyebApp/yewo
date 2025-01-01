import axios from 'axios';
import qs from 'qs';
import tinyurl from 'tinyurl-api';  // Use tinyurl-api for URL shortening

async function shortUrl(url) {
  const result = await tinyurl(url);  // Use tinyurl API to shorten the URL
  return result;
}

async function igdl(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = qs.stringify({
        url: url,
        locale: "id",
      });

      const o = {
        method: "POST",
        url: "https://downloadgram.org/video-downloader.php",
        headers: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
        },
        data: formData,
        timeout: 10000, // Increase the timeout to 10 seconds if necessary
        maxRedirects: 5, // Limit number of redirects to 5
      };

      const res = await axios(o);

      if (res.status === 200) {
        const responseData = res.data;  // Rename `data` to `responseData`
        const ownAPI = "@theazran_";

        const videoUrl = responseData
          .split("<br>")[1]
          .split(' rel="noopener noreferrer" href="')[1]
          .split('"')[0];

        const shortUrlResult = await shortUrl(videoUrl);

        resolve({
          result: {
            ownAPI,
            url: shortUrlResult,
          },
        });
      } else {
        console.log(`Error: Received unexpected status code ${res.status}`);
        reject(new Error(`Unexpected status code: ${res.status}`));
      }
    } catch (e) {
      console.error("Error during HTTP request or processing:", e);
      reject(e);
    }
  });
}

export default igdl;
