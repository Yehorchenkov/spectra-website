import * as migration_20260127_194349_init from './20260127_194349_init';
import * as migration_20260731_164641_add_seo_meta_to_expert_opinions from './20260731_164641_add_seo_meta_to_expert_opinions';
import * as migration_20261023_092138_add_reset_password_requested_at from './20261023_092138_add_reset_password_requested_at';

export const migrations = [
  {
    up: migration_20260127_194349_init.up,
    down: migration_20260127_194349_init.down,
    name: '20260127_194349_init',
  },
  {
    up: migration_20260731_164641_add_seo_meta_to_expert_opinions.up,
    down: migration_20260731_164641_add_seo_meta_to_expert_opinions.down,
    name: '20260731_164641_add_seo_meta_to_expert_opinions',
  },
  {
    up: migration_20261023_092138_add_reset_password_requested_at.up,
    down: migration_20261023_092138_add_reset_password_requested_at.down,
    name: '20261023_092138_add_reset_password_requested_at'
  },
];
