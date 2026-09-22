import { test } from 'node:test';
import assert from 'node:assert/strict';
import { InMemoryFlagRepository } from '../../src/repositories/in-memory-flag.repository.ts';

test('create stores a flag and assigns id/timestamps', async () => {
  const repository = new InMemoryFlagRepository();

  const flag = await repository.create({ key: 'new-checkout', name: 'New checkout', isEnabled: false });

  assert.equal(flag.id, 1);
  assert.equal(flag.key, 'new-checkout');
  assert.equal(flag.isEnabled, false);
  assert.ok(flag.createdAt instanceof Date);
  assert.ok(flag.updatedAt instanceof Date);
});

test('findByKey returns null when the flag does not exist', async () => {
  const repository = new InMemoryFlagRepository();

  const flag = await repository.findByKey('missing');

  assert.equal(flag, null);
});

test('findByKey returns the matching flag', async () => {
  const repository = new InMemoryFlagRepository();
  await repository.create({ key: 'new-checkout', name: 'New checkout', isEnabled: false });

  const flag = await repository.findByKey('new-checkout');

  assert.ok(flag);
  assert.equal(flag?.key, 'new-checkout');
});

test('findAll returns every stored flag', async () => {
  const repository = new InMemoryFlagRepository();
  await repository.create({ key: 'flag-a', name: 'Flag A', isEnabled: false });
  await repository.create({ key: 'flag-b', name: 'Flag B', isEnabled: true });

  const flags = await repository.findAll();

  assert.equal(flags.length, 2);
});

test('update flips isEnabled and bumps updatedAt', async () => {
  const repository = new InMemoryFlagRepository();
  const created = await repository.create({ key: 'new-checkout', name: 'New checkout', isEnabled: false });

  const updated = await repository.update('new-checkout', true);

  assert.ok(updated);
  assert.equal(updated?.isEnabled, true);
  assert.ok((updated?.updatedAt.getTime() ?? 0) >= created.updatedAt.getTime());
});

test('update returns null when the flag does not exist', async () => {
  const repository = new InMemoryFlagRepository();

  const updated = await repository.update('missing', true);

  assert.equal(updated, null);
});
