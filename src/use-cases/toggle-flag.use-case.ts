import { type Flag } from '../domain/flag.ts';
import { type IFlagRepository } from '../repositories/flag-repository.interface.ts';

export class ToggleFlagUseCase{
  private readonly flagRepository: IFlagRepository;

  constructor(flagRepository: IFlagRepository) {
    this.flagRepository = flagRepository;
  }

  async execute(key: string, isEnabled: boolean): Promise<Flag | null>{
    return this.flagRepository.update(key, isEnabled);
  }
}
