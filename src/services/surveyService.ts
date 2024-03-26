import axios from 'axios';
import {useGlobalStore} from "../stores/global-store";
import {allSurveyModels} from "@/constants/survey-model-mapping";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // other default config
});

const globalStore= useGlobalStore();

console.log("baseUrl: ", import.meta.env.VITE_API_URL)

export const getSongAudio = async (session_id: string, song_name: string) => {
  try {
    const response = await apiClient.get(`/song/${session_id}/${song_name}`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'audio/mpeg',
      }
    });
    const blob = new Blob([response.data], {
      type: 'audio/wav' // TODO: change to normal mp3
    });
    return blob;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const downloadSongAudioAndReturnUrl = async (session_id: string, song_name: string) => {
  console.debug('downloading mix audio for session_id: ', session_id)
  const audioBlob = await getSongAudio(session_id, song_name)
  return URL.createObjectURL(audioBlob)
}

export const removeDownloadedAudio = (url: string) => {
  console.debug('removing downloaded audio: ', url)
  URL.revokeObjectURL(url)
}

export const uploadSurveyResults = async (surveyResults: any) => {
  console.debug('uploading survey results: ', surveyResults)
  try {
    const response = await apiClient.post('/survey', surveyResults);
    return response.data;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}
