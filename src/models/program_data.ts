export type ProgramDataStatus = 'completed' | 'pending' | 'failed' | 'training';

export interface ProgramData {
  id: number;
  program_id: number;
  module_num: string;
  session_title: string;
  over_goal: string;
  learn_obj: string;
  video_litmos: string;
  video_train: string;
  video_implement: string;
  doc_link: string;
  status: ProgramDataStatus;
  is_deleted: boolean;
  created_at: dateFns;
  created_by: number;
  updated_at: dateFns;
  updated_by: number;
}
