import { test } from 'node:test';
import assert from 'node:assert/strict';
import { InMemoryFlagRepository } from '../../src/repositories/in-memory-flag.repository.ts';
import { CreateFlagUseCase } from '../../src/use-cases/create-flag.use-case.ts';

test('creates a flag through the repository', async () => {
  const repository = new InMemoryFlagRepository();
  const useCase = new CreateFlagUseCase(repository);

  const flag = await useCase.execute({ key: 'new-checkout', name: 'New checkout', isEnabled: false });

  assert.equal(flag.key, 'new-checkout');
  assert.equal(await repository.findByKey('new-checkout') !== null, true);
});
