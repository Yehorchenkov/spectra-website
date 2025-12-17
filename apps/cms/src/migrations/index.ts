import * as migration_20250426_082942 from './20250426_082942';
import * as migration_20251211_190354_rename_project_to_projects from './20251211_190354_rename_project_to_projects';

export const migrations = [
  {
    up: migration_20250426_082942.up,
    down: migration_20250426_082942.down,
    name: '20250426_082942',
  },
  {
    up: migration_20251211_190354_rename_project_to_projects.up,
    down: migration_20251211_190354_rename_project_to_projects.down,
    name: '20251211_190354_rename_project_to_projects'
  },
];
