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

//Knex Methods - resolve to promises
// function find() {
//   return db('zoos');
// }

// function findById(id) {
//   return db('zoos').where('id', id);
// }

// async function execute() {
//   const users = await find();
//   console.log(users);
// }

//execute();

// endpoints here

server.get('/zoos/', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    console.log(err)
  })
});

// server.post('/zoos/', async (req, res) => {
//   try {
//     db('zoos').insert(req.body, 'id').then(ids => {
//       return db('zoos').where({ id : ids[0] }).first().then(zoo => {
//         res.status(200).json(zoo);
//       })
//     })
//   } catch {
//     res.status(500).json({error: "There was en error adding the data"})
//   }
// })

// server.get('/zoos/', async (req, res) => {
//   try {
//     db('zoos').then(zoos => {
//       res.status(200).json(zoos)
//     });
//   } catch {
//     res.status(500).json({error: "There was an error fetching the data"})
//   }
// })

// server.get('/zoos/:id', async (req, res) => {
//   try {

//   } catch {
    
//   }
// })

// server.delete('/zoos/:id', async (req, res) => {
//   try {

//   } catch {
    
//   }
// })

// server.put('/zoos/:id', async (req, res) => {
//   try {

//   } catch {
    
//   }
// })

module.exports = server;