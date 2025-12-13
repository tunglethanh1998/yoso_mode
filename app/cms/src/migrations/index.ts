import * as migration_20251213_012816 from './20251213_012816';

export const migrations = [
  {
    up: migration_20251213_012816.up,
    down: migration_20251213_012816.down,
    name: '20251213_012816'
  },
];
