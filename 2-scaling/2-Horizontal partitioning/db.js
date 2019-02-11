const { LocalStorage } = require('node-localstorage');

const dbSrcs = [
  new LocalStorage('./data/src-a-m'),
  new LocalStorage('./data/src-n-z'),
  new LocalStorage('./data/src-0-9'), // default
];

const dbRegs = [/^[A-Ma-m]/, /^[N-Zn-z]/, /^.*/];

/**
 * @param {String} key
 * @returns {LocalStorage} 
 */
const resolve = (key) => dbSrcs[dbRegs.findIndex(p => key.match(p))];

/**
 * @param {LocalStorage} db Database resource 
 * @param {String} table Table
 * @returns {Array}
 */
const load = (db, table) => JSON.parse(db.getItem(table) || '[]');

/**
 * @param {String} table 
 */
const loadAll = (table) => dbSrcs.map(x => load(x, table)).reduce((res, cur) => [...res, ...cur], []);

/**
 * @param {(value, index:Number = null) => any|undefined} predicate Search predicate
 * @param {Array} src Existing collection, if not provided will be loaded from db
 * @param {LocalStorage} db Database resource 
 * @param {String} table Table
 */
const find = (predicate, src = null, db = null, table = null) => (src ? src : load(db, table)).find(predicate);

/**
 * @param {any} item Item that will be inserted
 * @param {(value, index:Number = null) => any|undefined} predicate Search predicate for existing item
 * @param {LocalStorage} db Database resource 
 * @param {String} table Table
 */
const add = (item, predicate, db, table) => {
  const items = load(db, table);
  
  if (!items.find(predicate)) {
    items.push(item);
    db.setItem(table, JSON.stringify(items, null, 2));
    return true;
  } else {
    return false;
  }
}

/**
 * @param {any} item Item that will be inserted
 * @param {(value, index:Number = null) => any|undefined} predicate Search predicate for existing item
 * @param {LocalStorage} db Database resource 
 * @param {String} table Table
 */
const update = (item, predicate, db, table) => {
  const items = load(db, table);
  const index = items.findIndex(predicate);
  
  if (index >= 0) {
    items[index] = item;
    db.setItem(table, JSON.stringify(items, null, 2));
    return true;
  } else {
    return false;
  }
}

/**
 * @param {(value, index:Number = null) => any|undefined} predicate Delete/Filter predicate
 * @param {LocalStorage} db Database resource 
 * @param {String} table Table
 */
const remove = (predicate, db, table) => {
  const items = load(db, table);
  const item = items.find(predicate);

  if(item) {
    db.setItem(table, JSON.stringify(items.filter(x => x != item), null, 2));
    return true;
  }  else {
    return false;
  }
}

module.exports = {
  add,
  find,
  resolve,
  load,
  loadAll,
  remove,
  update
};