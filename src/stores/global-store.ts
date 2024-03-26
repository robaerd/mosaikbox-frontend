import { defineStore } from 'pinia'
import {AnalysisState} from "@/dtos/AnalysisState";
import {SongScheduleItemDto} from "@/dtos/SongScheduleItemDto";

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      isSidebarMinimized: false,
      userName: 'Vasili S',
      mixSessionId: '',
      mixGenerationInitiated: false,
      mixGenerationState: AnalysisState.NOT_STARTED,
      mixGenerationErrorMessage: '',
      mixGenerationIsError: false,
      uploadedSongs: [] as File[],
      songSchedule: [] as SongScheduleItemDto[],
    }
  },

  actions: {
    toggleSidebar() {
      this.isSidebarMinimized = !this.isSidebarMinimized
    },

    changeUserName(userName: string) {
      this.userName = userName
    },

    setMixSessionId(mixSessionId: string) {
      this.mixSessionId = mixSessionId
    },

    setSongSchedule(songSchedule: SongScheduleItemDto[]) {
      this.songSchedule = songSchedule
    },

    setMixGenerationState(mixGenerationState: AnalysisState) {
      this.mixGenerationState = mixGenerationState
    },

    setMixGenerationErrorMessage(mixGenerationErrorMessage: string) {
      this.mixGenerationErrorMessage = mixGenerationErrorMessage
    },

    setMixGenerationIsError(mixGenerationIsError: boolean) {
      this.mixGenerationIsError = mixGenerationIsError
    },

    setMixGenerationInitiated(mixGenerationInitiated: boolean) {
      this.mixGenerationInitiated = mixGenerationInitiated
    }

  },

})
