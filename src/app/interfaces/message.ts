export interface Message {
  id?: number;
  title: string;
  body: string;
  new: boolean;
  createdAt: number;
}
