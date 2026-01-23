import * as migration_20260123_165151_init from './20260123_165151_init';

export const migrations = [
  {
    up: migration_20260123_165151_init.up,
    down: migration_20260123_165151_init.down,
    name: '20260123_165151_init'
  },
];
