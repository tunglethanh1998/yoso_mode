import * as migration_20251213_012816 from './20251213_012816';
import * as migration_20251213_025617_added_news from './20251213_025617_added_news';

export const migrations = [
  {
    up: migration_20251213_012816.up,
    down: migration_20251213_012816.down,
    name: '20251213_012816',
  },
  {
    up: migration_20251213_025617_added_news.up,
    down: migration_20251213_025617_added_news.down,
    name: '20251213_025617_added_news'
  },
];
