import { type IFlagRepository } from '../repositories/flag-repository.interface.ts';

export class EvaluateFlagUseCase{
  private readonly flagRepository: IFlagRepository;

  constructor(flagRepository: IFlagRepository) {
    this.flagRepository = flagRepository;
  }

  async execute (key: string):Promise<boolean>{
    const flag = await this.flagRepository.findByKey(key);

    if(!flag){
      return false;
    }
    return flag.isEnabled;
  }
}
