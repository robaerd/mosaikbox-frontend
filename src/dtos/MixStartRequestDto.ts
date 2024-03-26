import {MixModel} from "@/dtos/AnalysisStartRequestDto";

export interface MixStartRequestDto {
  is_drum_removal_enabled: boolean
  is_vocal_removal_enabled: boolean
  mix_model: MixModel

}
