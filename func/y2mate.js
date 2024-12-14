import axios from "axios";
import _ from "lodash";

class Ytdl2 {
  constructor() {
    this.baseUrl = "https://tomp3.cc/api/ajax";
    this.headers = {
      accept: "*/*",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Origin": "https://tomp3.cc",  // Generalized Referer
      "Connection": "keep-alive",
      "Referer": "https://tomp3.cc",  // Generalized Referer
    };
  }

  // Retry logic for fetching video data in case of failure
  async fetchVideoData(videoUrl, retries = 3, delay = 2000) {
    const requestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}/search`,
      headers: this.headers,
      data: `query=${encodeURIComponent(videoUrl)}`,
    };

    try {
      const response = await axios.request(requestConfig);
      console.log("Video data response:", response.data); // Debug log to see the API response
      return response.data;
    } catch (error) {
      // Detailed error handling
      if (error.response) {
        // The request was made and the server responded with an error status
        console.error("Error Response:", error.response.data);
        console.error("Status Code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error Request:", error.request);
      } else {
        // Something went wrong in setting up the request
        console.error("Error Message:", error.message);
      }

      // Retry mechanism in case of failure
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, delay)); // Delay before retry
        return this.fetchVideoData(videoUrl, retries - 1, delay); // Retry the request
      }

      throw new Error("Request failed after multiple retries");
    }
  }

  formatVideoData(data, { type, quality }) {
    const formattedData = [];

    const processFormat = (format) => {
      formattedData.push({
        videoId: data.vid,
        formatId: format.k,
        fileSize: format.size,
        videoQuality: format.q,
        fileType: format.f,
      });
    };

    _.forOwn(data.links.mp4, processFormat);
    processFormat(data.links.mp3?.mp3128);
    processFormat(data.links["3gp"]?.["3gp@144p"]);

    return _.filter(
      formattedData,
      (format) =>
        (type ? format.fileType === type : true) &&
        (quality ? format.videoQuality === quality : true)
    );
  }

  async downloadMedia(videoId, formatId) {
    const requestConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.baseUrl}/convert`,
      headers: {
        ...this.headers,
        "accept-language": "en-US,en;q=0.9,en-IN;q=0.8",
      },
      data: `vid=${videoId}&k=${encodeURIComponent(formatId)}`,
    };

    try {
      const response = await axios.request(requestConfig);
      return response.data;
    } catch (error) {
      console.error("Error downloading media:", error);
      throw new Error("Request failed");
    }
  }

  async ytaud(videoUrl) {
    try {
      const videoData = await this.fetchVideoData(videoUrl);
      const [audioFormat] = this.formatVideoData(videoData, {
        type: "mp3",
      });
      const { formatId, videoId } = audioFormat || {};
      const downloadResponse =
        formatId && videoId ? await this.downloadMedia(videoId, formatId) : {};
      return {
        creator: "Qasim Ali",
        ...downloadResponse,
        fileSize: audioFormat?.fileSize,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/0.jpg`,
      };
    } catch (error) {
      console.error("Failed to get audio download link:", error);
      throw new Error("Failed to get audio");
    }
  }

  async ytvid(videoUrl, quality = "480p") {
    try {
      const videoData = await this.fetchVideoData(videoUrl);
      const [videoFormat] = this.formatVideoData(videoData, {
        type: "mp4",
        quality: quality,
      });
      const { formatId, videoId } = videoFormat || {};
      const downloadResponse =
        formatId && videoId ? await this.downloadMedia(videoId, formatId) : {};
      return {
        creator: "Qasim Ali",
        ...downloadResponse,
        fileSize: videoFormat?.fileSize,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/0.jpg`,
      };
    } catch (error) {
      console.error("Failed to get video download link:", error);
      throw new Error("Failed to get video");
    }
  }
}

export default Ytdl2;
