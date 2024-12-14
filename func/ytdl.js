import ytdl from '@distube/ytdl-core'
import fs from 'fs/promises'
import path from 'path'
import { Client } from 'undici'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class YTDL {
  constructor() {
    this.client = null
  }

  async getCookies() {
    const cookiesPath = path.resolve(__dirname, '../public/cookies.json')
    try {
      const data = await fs.readFile(cookiesPath, 'utf-8')
      return JSON.parse(data)
    } catch (error) {
      throw new Error('Failed to read cookies file: ' + error.message)
    }
  }

  async createClient() {
    try {
      const cookies = await this.getCookies()
      const cookieHeader = cookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
      this.client = new Client('https://www.youtube.com', {
        headers: {
          Cookie: cookieHeader,
        },
      })
    } catch (error) {
      throw new Error('Failed to create client: ' + error.message)
    }
  }

  // Function to get best video with audio
  async ytvideo(url) {
    try {
      if (!this.client) {
        await this.createClient()
      }
      const yt = await ytdl.getInfo(url, { requestOptions: { client: this.client } })

      // Log available formats for debugging
      console.log(yt.formats);

      // Select the best video format (audio and video combined)
      let selectedFormat = null;
      // Prioritize video with both audio and video, and ensure it's not live
      for (let format of yt.formats) {
        if (format.hasVideo && format.hasAudio && !format.isLive && (format.isHLS || format.isDashMPD)) {
          if (!selectedFormat || format.bitrate > selectedFormat.bitrate) {
            selectedFormat = format;
          }
        }
      }

      if (!selectedFormat) {
        // If no suitable format is found, fallback to manually selecting the highest bitrate
        selectedFormat = yt.formats.filter(format => format.hasVideo && format.hasAudio)
          .reduce((bestFormat, currentFormat) => {
            if (!bestFormat || currentFormat.bitrate > bestFormat.bitrate) {
              return currentFormat;
            }
            return bestFormat;
          }, null);
      }

      if (!selectedFormat) {
        throw new Error('No suitable video format found');
      }

      return {
        creator: 'Qasim Ali',
        title: yt.videoDetails.title,
        author: yt.videoDetails.author.name,
        video_url: selectedFormat.url,
        description: yt.videoDetails.description,
      }
    } catch (error) {
      console.error('An error occurred while fetching video info:', error)
      return null
    }
  }

  // Function to get best audio
  async ytaudio(url) {
    try {
      if (!this.client) {
        await this.createClient()
      }
      const yt = await ytdl.getInfo(url, { requestOptions: { client: this.client } })

      // Log available formats for debugging
      console.log(yt.formats);

      // Select the best audio format
      let selectedAudioFormat = null;
      // Prioritize audio-only formats, ensuring it is not live and is either HLS or DASH
      for (let format of yt.formats) {
        if (format.hasAudio && !format.hasVideo && !format.isLive && (format.isHLS || format.isDashMPD)) {
          if (!selectedAudioFormat || format.audioBitrate > selectedAudioFormat.audioBitrate) {
            selectedAudioFormat = format;
          }
        }
      }

      if (!selectedAudioFormat) {
        // If no suitable format is found, fallback to manually selecting the highest audio bitrate
        selectedAudioFormat = yt.formats.filter(format => format.hasAudio && !format.hasVideo)
          .reduce((bestFormat, currentFormat) => {
            if (!bestFormat || currentFormat.audioBitrate > bestFormat.audioBitrate) {
              return currentFormat;
            }
            return bestFormat;
          }, null);
      }

      if (!selectedAudioFormat) {
        throw new Error('No suitable audio format found');
      }

      return {
        creator: 'Qasim Ali',
        title: yt.videoDetails.title,
        author: yt.videoDetails.author.name,
        audio_url: selectedAudioFormat.url,
        description: yt.videoDetails.description,
      }
    } catch (error) {
      console.error('An error occurred while fetching audio info:', error)
      return null
    }
  }
}

export default YTDL
