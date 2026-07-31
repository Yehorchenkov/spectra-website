import * as migration_20260127_194349_init from './20260127_194349_init';
import * as migration_20260731_164641_add_seo_meta_to_expert_opinions from './20260731_164641_add_seo_meta_to_expert_opinions';

export const migrations = [
  {
    up: migration_20260127_194349_init.up,
    down: migration_20260127_194349_init.down,
    name: '20260127_194349_init',
  },
  {
    up: migration_20260731_164641_add_seo_meta_to_expert_opinions.up,
    down: migration_20260731_164641_add_seo_meta_to_expert_opinions.down,
    name: '20260731_164641_add_seo_meta_to_expert_opinions'
  },
];
