const { LocalStorage } = require('node-localstorage');

const dbSrc = new LocalStorage('./data');

/**
 * @param {String} table Table
 * @returns {Array}
 */
const load = (table) => JSON.parse(dbSrc.getItem(table) || '[]');

/**
 * @param {(value, index:Number = null) => any|undefined} predicate Search predicate
 * @param {Array} src Existing collection, if not provided will be loaded from db
 * @param {String} table Table
 */
const find = (predicate, src = null, table = null) => (src ? src : load(table)).find(predicate);

/**
 * @param {any} item Item that will be inserted
 * @param {(value, index:Number = null) => any|undefined} predicate Search predicate for existing item
 * @param {String} table Table
 */
const add = (item, predicate, table) => {
  const items = load(table);
  
  if (!items.find(predicate)) {
    items.push(item);
    console.log(items);
    dbSrc.setItem(table, JSON.stringify(items, null, 2));
    return true;
  } else {
    return false;
  }
}

/**
 * @param {any} item Item that will be inserted
 * @param {(value, index:Number = null) => any|undefined} predicate Search predicate for existing item
 * @param {String} table Table
 */
const update = (item, predicate, table) => {
  const items = load(table);
  const index = items.findIndex(predicate);
  
  if (index >= 0) {
    items[index] = item;
    dbSrc.setItem(table, JSON.stringify(items, null, 2));
    return true;
  } else {
    return false;
  }
}

/**
 * @param {(value, index:Number = null) => any|undefined} predicate Delete/Filter predicate
 * @param {String} table Table
 */
const remove = (predicate, table) => {
  const items = load(table);
  const item = items.find(predicate);

  if(item) {
    dbSrc.setItem(table, JSON.stringify(items.filter(x => x != item), null, 2));
    return true;
  }  else {
    return false;
  }
}

module.exports = {
  add,
  find,
  load,
  remove,
  update
};