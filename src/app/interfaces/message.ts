export interface Message {
  id?: string;
  user: string;
  title: string;
  body: string;
  new: boolean;
  createdAt: number;
}
