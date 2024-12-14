import axios from "axios";

/*
  Created by https://github.com/ztrdiamond !
  Source: https://whatsapp.com/channel/0029VagFeoY9cDDa9ulpwM0T
  "Aku janji jika hapus watermark ini maka aku rela miskin hingga 7 turunan"
*/

async function igdl(url) {
  try {
    return await new Promise(async(resolve, reject) => {
      // Check for valid Instagram URL format
      if (!/^https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+\/?.*/.test(url)) {
        reject("invalid url input!");
      }

      // Headers with the correct format
      const headers = {
        headers: {
          "Content-Type": "application/json",  // Corrected Content-Type
          "Origin": "https://publer.io",
          "Referer": "https://publer.io/",
          "User-Agent": "axios/1.7.9",
          // Add authorization token if required
          // "Authorization": "Bearer YOUR_API_KEY"
        }
      };

      // Making the POST request
      axios.post("https://app.publer.io/hooks/media", { iphone: false, url }, headers)
        .then(async res => {
          const task_id = res.data.job_id;
          const task = async() => (await axios.get(`https://app.publer.io/api/v1/job_status/${task_id}`, headers)).data;

          // Polling the task status
          async function process() {
            const { status, payload } = await task();
            if (status === "complete") {
              if (payload[0].error) return reject(payload[0].error);
              const media = payload.map(d => ({
                type: d.type,
                url: d.path,
                thumb: d.thumbnail
              }));
              return resolve({
                success: true,
                media
              });
            }
            setTimeout(process, 1000);  // Retry after 1 second
          }

          await process();  // Start polling the task
        })
        .catch(e => reject(e));  // Catch any errors
    });
  } catch (e) {
    return {
      success: false,
      errors: [e]  // Return errors
    };
  }
}

export default igdl;
