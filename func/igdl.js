import axios from "axios";

async function igdl(url) {
  try {
    return await new Promise(async (resolve, reject) => {
      // Validate URL
      if (!/^https?:\/\/(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[a-zA-Z0-9_-]+\/?.*/.test(url)) {
        reject("invalid url input!");
      }

      // Headers with potential Authorization (replace with actual API key if needed)
      const headers = {
        headers: {
          "Content-Type": "application/json",
          "Origin": "https://publer.io",
          "Referer": "https://publer.io/",
          "User-Agent": "axios/1.7.9",
          "Authorization": "Bearer YOUR_API_KEY"  // Ensure you replace this with the correct key if necessary
        }
      };

      // POST request to Publer API
      axios.post("https://app.publer.io/hooks/media", { iphone: false, url }, headers)
        .then(async res => {
          const task_id = res.data.job_id;
          const task = async () => (await axios.get(`https://app.publer.io/api/v1/job_status/${task_id}`, headers)).data;

          // Polling to check the status of the media download
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
            setTimeout(process, 1000);  // Retry every 1 second
          }

          await process();  // Start the polling process
        })
        .catch(e => reject(e));  // Catch errors in POST request
    });
  } catch (e) {
    return {
      success: false,
      errors: [e]
    };
  }
}

export default igdl;
