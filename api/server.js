const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());


// Knex Setup
const knex = require('knex');

const config = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
};

const db = knex(config);

//execute();

// endpoints here

server.get('/api/zoos/', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .first()
  .then(zoo => {
    if(zoo) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({ message: "Zoo by ID not found" })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "Error getting zoo by ID" })
  })
})

server.post('/api/zoos/', (req,res) => {
  db('zoos')
  .insert(req.body, 'id')
  .then(ids => {
    db('zoos')
      .where({id: ids[0]})
      .first()
      .then(zoo => {
        res.status(201).json(zoo)
      })
      .catch(err =>{
        res.status(500).json({ error: "Error posting data" })
      })
  })
})

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .del()
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: `${count} record deleted`})
    } else {
      res.status(404).json({ message: "Zoo by ID does not exist"})
    }
  })
  .catch(err => {
    res.status(500).json({ error: "Error deleting data" })
  })
})

server.put('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .update(req.body)
  .then(count => {
    if(count > 0) {
      res.status(200).json({ message: `${count} record updated`})
    } else {
      res.status(404).json({ message: "Zoo by ID does not exist"})
    }
  })
  .catch(err => {
    res.status(500).json({ error: "Error updating data" })
  })
})

module.exports = server;