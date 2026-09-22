import { type Flag } from '../domain/flag.ts';
import { type IFlagRepository } from './flag-repository.interface.ts';

export class InMemoryFlagRepository implements IFlagRepository{
  private flags: Flag[] = [];
  private nextId = 1;

  async findByKey(key: string): Promise<Flag | null>{
    return this.flags.find((flag) => flag.key === key) ?? null;
  }

  async findAll(): Promise<Flag[]>{
    return [...this.flags];
  }

  async create(data: Omit<Flag, 'id' | 'createdAt' | 'updatedAt'>): Promise<Flag>{
    const now = new Date();
    const flag: Flag = {
      ...data,
      id: this.nextId++,
      createdAt: now,
      updatedAt: now,
    };
    this.flags.push(flag);
    return flag;
  }

  async update(key: string, isEnabled: boolean): Promise<Flag | null>{
    const flag = this.flags.find((f) => f.key === key);
    if(!flag){
      return null;
    }
    flag.isEnabled = isEnabled;
    flag.updatedAt = new Date();
    return flag;
  }
}
