import * as migration_20260912_083459_initial from './20260912_083459_initial';
import * as migration_20260914_091817_pages_collection from './20260914_091817_pages_collection';

export const migrations = [
  {
    up: migration_20260912_083459_initial.up,
    down: migration_20260912_083459_initial.down,
    name: '20260912_083459_initial',
  },
  {
    up: migration_20260914_091817_pages_collection.up,
    down: migration_20260914_091817_pages_collection.down,
    name: '20260914_091817_pages_collection',
  },
];
