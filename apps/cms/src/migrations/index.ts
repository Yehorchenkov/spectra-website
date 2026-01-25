import * as migration_20260125_092400_init from './20260125_092400_init';

export const migrations = [
  {
    up: migration_20260125_092400_init.up,
    down: migration_20260125_092400_init.down,
    name: '20260125_092400_init'
  },
];
