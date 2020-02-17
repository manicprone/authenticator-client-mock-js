import lodashObject from 'lodash/object';
import lodashLang from 'lodash/lang';
import lodashArray from 'lodash/array';
import lodashCollection from 'lodash/collection';

function mapKeysDeep(obj, fn) {
  const copy = {};

  lodashObject.forOwn(obj, (val, key) => {
    if (lodashLang.isPlainObject(val)) val = mapKeysDeep(val, fn);
    copy[fn(val, key)] = val;
  });

  return copy;
}

export default {
  get: lodashObject.get,
  has: lodashObject.has,
  mapKeys: lodashObject.mapKeys,
  mapValues: lodashObject.mapValues,
  isEmpty: lodashLang.isEmpty,
  cloneDeep: lodashLang.cloneDeep,
  remove: lodashArray.remove,
  includes: lodashCollection.includes,
  filter: lodashCollection.filter,
  mapKeysDeep,
};
