import { test } from 'node:test';
import assert from 'node:assert/strict';
import { InMemoryFlagRepository } from '../../src/repositories/in-memory-flag.repository.ts';
import { EvaluateFlagUseCase } from '../../src/use-cases/evaluate-flag.use-case.ts';

test('returns false when the flag does not exist', async () => {
  const repository = new InMemoryFlagRepository();
  const useCase = new EvaluateFlagUseCase(repository);

  const result = await useCase.execute('missing');

  assert.equal(result, false);
});

test('returns the flag isEnabled value when it exists', async () => {
  const repository = new InMemoryFlagRepository();
  await repository.create({ key: 'new-checkout', name: 'New checkout', isEnabled: true });
  const useCase = new EvaluateFlagUseCase(repository);

  const result = await useCase.execute('new-checkout');

  assert.equal(result, true);
});
