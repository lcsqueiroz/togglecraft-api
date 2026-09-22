import { type Flag } from '../domain/flag.ts';

export interface IFlagRepository{
  findByKey(key: string): Promise<Flag | null>;
  findAll(): Promise<Flag[]>;
  create(flag: Omit<Flag, 'id' | 'createdAt' | 'updatedAt' >): Promise<Flag>;
  update(key: string, isEnabled: boolean): Promise<Flag |  null>;
}
