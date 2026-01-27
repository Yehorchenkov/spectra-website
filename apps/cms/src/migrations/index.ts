import * as migration_20260127_194349_init from './20260127_194349_init';

export const migrations = [
  {
    up: migration_20260127_194349_init.up,
    down: migration_20260127_194349_init.down,
    name: '20260127_194349_init'
  },
];
