import { type Flag } from '../domain/flag.ts';
import { type IFlagRepository } from '../repositories/flag-repository.interface.ts';

export class CreateFlagUseCase{
  private readonly flagRepository: IFlagRepository;

  constructor(flagRepository: IFlagRepository) {
    this.flagRepository = flagRepository;
  }

  async execute(data: Omit<Flag, 'id' | 'createdAt' | 'updatedAt'>): Promise<Flag>{
    return this.flagRepository.create(data);
  }
}
