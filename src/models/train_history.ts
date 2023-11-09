export interface TrainHistoryData {
  id: number;
  username: string;
  start_at: string;
  completed_at: string;
  data: object;
  created_at: string;
  status: TrainStatus;
}
export type TrainStatus =
  | 'completed'
  | 'pending'
  | 'failed'
  | 'training'
  | 'all';
