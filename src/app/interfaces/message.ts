export interface Message {
  id?: number;
  user: string;
  title: string;
  body: string;
  new: boolean;
  createdAt: number;
}
