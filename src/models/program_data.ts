export type ProgramDataStatus = 'completed' | 'pending' | 'failed';

export interface ProgramData {
  id: number;
  status: ProgramDataStatus;
  program_id: number;
  module_num: string;
  session_title: string;
  video_link: string;
  doc_link: string;
  is_deleted: boolean;
  created_at: dateFns;
  created_by: number;
  updated_at: dateFns;
  updated_by: number;
}
