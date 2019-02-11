const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');

const app = express();
const port = parseInt(process.argv[2] || 3000);
const table = 'groceries';

app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  const items = db.loadAll(table);
  console.log(`Request received at ${new Date().toISOString()}`);
  res.status(200);
  return res.json(items);
});

app.post('/', async (req, res) => {
  const { name, color } = req.body;
  const dbSrc = db.resolve(name);
  const isSet = db.add({ name, color }, x => x.name == name, dbSrc, table);

  res.status(isSet ? 200 : 422);
  return res.json(isSet);
});

app.get('/:name', async (req, res) => {
  const { name } = req.params;
  const dbSrc = db.resolve(name);
  const item = db.find(x => x.name == name, null, dbSrc, table);

  res.status(item ? 200 : 404);
  return res.json(item || null);
});

app.patch('/:name', async (req, res) => {
  const _name = req.params.name;
  const { name, color } = req.body;
  const dbSrc = db.resolve(_name);
  const isModified = db.update({ name, color }, x => x.name == _name, dbSrc, table);

  res.status(isModified ? 200 : 404);
  return res.json(isModified);
});

app.delete('/:name', async (req, res) => {
  const { name } = req.params;
  const dbSrc = db.resolve(name);
  const isDel = db.remove(x => x.name == name, dbSrc, table);

  res.status(isDel ? 200 : 422);
  return res.json(isDel);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))