const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
const {JournalEntry} = require('./models');

const app = express();
const faker = require('faker');



app.use(express.static('public'));
app.use(morgan('common'));
app.use(express.json());


const {Entry} = require('./datastore')
let title = faker.address.country();




// GET request
app.get('/journal-entries', (req, res) => {
  Entry
  .find()
  .then(entries => {
    res.json({
      entries: entries.map(
        (entry) => entry.serialize())
    });
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({message: 'Internal server error'})
  });
});

// GET by id

app.get('/journal-entries/:id', (req, res) => {
  Entry
    .findById(req.params.id)
    .then(entry => res.json(entry.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});


//POST request
app.post('/journal-entries', (req, res) => {
  //ensure all the fields are in req body
  const requiredFields = ['title', 'travelDate', 'coverPhoto', 
  'description', 'memories'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing  ${field} field`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  Entry
    .create({
      title: req.body.title,
      travelDate: req.body.travelDate,
      coverPhoto: req.body.coverPhoto,
      description: req.body.description,
      memories: req.body.memories,
      words: req.body.words,
      morePhotos: req.body.morePhotos
    })
    .then(entry => res.status(201).json(entry.serialize()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'})
    });
});

// PUT request
app.put('/journal-entries/:id', (req, res) => {
  //ensure the the id in req path and the req body match
  if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = `Request path id (${req.params.id}) and request body id
    (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).json({message: message});
  }
  const toUpdate = {};
  const updateableFields = ['title', 'travelDate', 'coverPhoto', 'description',
  'memories', 'words'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[fields] = req.body[field];
    }
  });

  Entry
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(entry = res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}))

 });
  

// DELETE request
app.delete('/journal-entries/:id', (req,res) => {
  Entry
    .findByIdAndRemove(req.params.id)
    .then(entry => res.status(204).end())
    .catch(err => res.status(500).json{message: 'Internal server error'})
});









let server;


function runServer(databaseUrl, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if(err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  }); 
}


function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });  
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};



module.exports = {app, runServer, closeServer};