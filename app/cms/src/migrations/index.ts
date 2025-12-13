import * as migration_20251211_031001 from './20251211_031001';

export const migrations = [
  {
    up: migration_20251211_031001.up,
    down: migration_20251211_031001.down,
    name: '20251211_031001'
  },
];
