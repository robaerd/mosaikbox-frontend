export interface SongScheduleItemDto {
  audio_path: string;
  mashability?: number;
  start_time: number;
  end_time: number;
  total_play_time_start: number;
  total_play_time_end: number;
  original_tempo: number;
  target_tempo?: number;
  original_key: string;
  target_key: string;
  key_shift: number;
  h_contr: number;
  l_contr: number;
  r_contr: number;
  timbral_contr: number;
  segment_factor: number;
  mix_model: string;
}
