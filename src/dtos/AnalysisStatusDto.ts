import {AnalysisState} from "@/dtos/AnalysisState";

export interface AnalysisStatusDto {
  state: AnalysisState;
  error_message?: string;
}
