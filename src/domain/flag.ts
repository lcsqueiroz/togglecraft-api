export interface Flag{
  id: number,
  key: string,
  name: string,
  description?: string,
  isEnabled: boolean,
  createdAt: Date,
  updatedAt: Date,
}
