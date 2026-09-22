import { test } from 'node:test';
import assert from 'node:assert/strict';
import { InMemoryFlagRepository } from '../../src/repositories/in-memory-flag.repository.ts';
import { FindAllFlagsUseCase } from '../../src/use-cases/find-all-flags.use-case.ts';

test('returns an empty list when there are no flags', async () => {
  const repository = new InMemoryFlagRepository();
  const useCase = new FindAllFlagsUseCase(repository);

  const flags = await useCase.execute();

  assert.deepEqual(flags, []);
});

test('returns every flag from the repository', async () => {
  const repository = new InMemoryFlagRepository();
  await repository.create({ key: 'flag-a', name: 'Flag A', isEnabled: false });
  await repository.create({ key: 'flag-b', name: 'Flag B', isEnabled: true });
  const useCase = new FindAllFlagsUseCase(repository);

  const flags = await useCase.execute();

  assert.equal(flags.length, 2);
});
