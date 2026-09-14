import { type Flag } from '../domain/flag';

export default interface IFlagRepository{
  findByKey(key: string): Promise<Flag | null>;
  findAll(): Promise<Flag[]>;
  create(flag: Omit<Flag, 'id' | 'createdAt' | 'updatedAt' >): Promise<Flag>;
  update(key: string, isEnabled: boolean): Promise<Flag |  null>;
}
