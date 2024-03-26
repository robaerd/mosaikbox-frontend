import {CANCELLED} from "node:dns";

export enum AnalysisState {
  NOT_STARTED = "NOT_STARTED",
  UPLOAD = "UPLOAD",
  STARTED = "STARTED",
  LYRICS_DOWNLOADING = "LYRICS_DOWNLOADING",
  MSS = "MSS",
  ANALYSIS = "ANALYSIS",
  SCHEDULING = "SCHEDULING",
  WAITING_FOR_MIXING = "WAITING_FOR_MIXING",
  MIXING = "MIXING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED"
}
