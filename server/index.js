const express = require('express');
const cors = require('cors');
const app = express();
const apiPort = 8000;

const db = require('./db');

const router = require('./routes/index.routes');

app.use(express.json());
app.use(cors());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('Hello World');
});
app.use('/api', router);

app.listen(apiPort, () => {
  console.log('app is up and running');
});
