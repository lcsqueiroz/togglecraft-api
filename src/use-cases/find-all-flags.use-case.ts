import { type Flag } from '../domain/flag.ts';
import { type IFlagRepository } from '../repositories/flag-repository.interface.ts';

export class FindAllFlagsUseCase{
  private readonly flagRepository: IFlagRepository;

  constructor(flagRepository: IFlagRepository) {
    this.flagRepository = flagRepository;
  }

  async execute(): Promise<Flag[]>{
    return this.flagRepository.findAll();
  }
}
