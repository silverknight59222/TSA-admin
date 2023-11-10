export interface TrainHistoryData {
  id: number;
  username: string;
  start_at: string;
  completed_at: string;
  created_at: string;
  status: TrainStatus;
  program_name: string;
}
export type TrainStatus =
  | 'completed'
  | 'pending'
  | 'failed'
  | 'training'
  | 'all';
