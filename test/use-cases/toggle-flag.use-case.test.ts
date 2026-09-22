import { test } from 'node:test';
import assert from 'node:assert/strict';
import { InMemoryFlagRepository } from '../../src/repositories/in-memory-flag.repository.ts';
import { ToggleFlagUseCase } from '../../src/use-cases/toggle-flag.use-case.ts';

test('toggles an existing flag', async () => {
  const repository = new InMemoryFlagRepository();
  await repository.create({ key: 'new-checkout', name: 'New checkout', isEnabled: false });
  const useCase = new ToggleFlagUseCase(repository);

  const flag = await useCase.execute('new-checkout', true);

  assert.equal(flag?.isEnabled, true);
});

test('returns null when the flag does not exist', async () => {
  const repository = new InMemoryFlagRepository();
  const useCase = new ToggleFlagUseCase(repository);

  const flag = await useCase.execute('missing', true);

  assert.equal(flag, null);
});
