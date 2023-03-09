const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

app.get('/messages', (req, res) => {
  db.all(
    'SELECT * FROM messages ORDER BY createdAt DESC',
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

app.post('/messages', (req, res) => {
  const { createdAt, text, user } = req.body;

  const sql = `INSERT INTO messages (createdAt, text, user) VALUES (?, ?, ?)`;
  const params = [createdAt, text, user];

  db.run(sql, params, (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    } else {
      res.status(201).send('Message added successfully.');

      const message = { createdAt, text, user };
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
  });
});

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

db.run(
  `CREATE TABLE IF NOT EXISTS messages (
     createdAt TEXT,
     text TEXT,
     user TEXT
   )`,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Table "messages" created successfully.');
    }
  }
);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
