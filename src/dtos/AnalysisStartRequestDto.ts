export enum MixModel {
  MOSAIKBOX = 'MOSAIKBOX',
  AMU = 'AMU'
}

export interface AnalysisStartRequestDto {
  start_song_name: string;
  is_contextual_information_enabled: boolean;
  mix_model: MixModel;
}
