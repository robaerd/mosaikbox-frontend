import axios from 'axios';

import { AnalysisStartRequestDto } from '../dtos/analysisStartRequestDto';
import {useGlobalStore} from "../stores/global-store";
import {computed} from "vue";
import {AnalysisStatusDto} from "@/dtos/AnalysisStatusDto";
import { storeToRefs } from 'pinia'
import {MixStartRequestDto} from "@/dtos/MixStartRequestDto";
import {SongScheduleItemDto} from "@/dtos/SongScheduleItemDto";


const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // other default config
});

const globalStore= useGlobalStore();

const setSessionId = (sessionId: string) => {
    globalStore.setMixSessionId(sessionId);
};

export const requestMixingSession = async () => {
  try {
    const response = await apiClient.post('/mix');
    const sessionId = response.data['session_id']; // fixme: after testing
    // const sessionId = "680c4239-9bb1-4d50-9a28-27807af7d7fd"; // fixme: after testing

    setSessionId(sessionId);
    return sessionId;
  } catch (error) {
    // Error handling logic
    throw error;
  }
};

export const uploadAudioFile = async (file: File, session_id: string) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post(`/mix/${session_id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const cancelMixingSession = async (session_id: string) => {
  try {
    const response = await apiClient.delete(`/mix/${session_id}`);
    return response.data;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const startAnalysis = async (session_id: string, dto: AnalysisStartRequestDto) => {
  try {
    const response = await apiClient.put(`/mix/${session_id}`, dto);
    return response.data;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const startMixing = async (session_id: string, dto: MixStartRequestDto) => {
  try {
    const response = await apiClient.put(`/mix/${session_id}/start_mix`, dto);
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const getMixStatus = async (session_id: string): Promise<AnalysisStatusDto> => {
  console.debug('GET mix status for session_id: ', session_id);
  try {
    const response = await apiClient.get<AnalysisStatusDto>(`/mix/${session_id}/status`);
    return response.data;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const getSongSchedule = async (session_id: string): Promise<SongScheduleItemDto[]> => {
  console.debug("GET song schedule for session_id: ", session_id)
  try {
    const response = await apiClient.get<SongScheduleItemDto[]>(`/mix/${session_id}/schedule`);
    return response.data;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const getMixAudio = async (session_id: string) => {
  try {
    const response = await apiClient.get(`/mix/${session_id}`, {
      responseType: 'arraybuffer',
      headers: {
        'Content-Type': 'audio/mpeg',
      }
    });
    const blob = new Blob([response.data], {
      type: 'audio/mp3'
    });
    return blob;
  } catch (error) {
    // Error handling logic
    throw error;
  }
}

export const downloadMixAudioAndReturnUrl = async (session_id: string) => {
  console.debug('downloading mix audio for session_id: ', session_id)
  const audioBlob = await getMixAudio(session_id)
  return URL.createObjectURL(audioBlob)
}

