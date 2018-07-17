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
  res.json(JournalEntries.get());
});

// GET by id

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
  const entry = JournalEntries.create(req.body.title, req.body.travelDate, req.body.coverPhoto,
    req.body.description, req.body.memories, req.body.words, req.body.morePhotos);
  console.log(`Creating new journal entry ${req.body.title}`);
  res.status(201).json(entry);

})

// PUT request
app.put('/journal-entries/:id', (req, res) => {
  //ensure the req has required fields
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
  //ensure that journal id in url path and req match
  if (req.params.id !== req.body.id) {
    const message = `Request path id ${req.params.id} and request body id ${req.body.id} must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  //if everyting is ok, the entry will be updated
    console.log(`Updating blog post ${req.params.id}`);
    JournalEntries.update({
      id: req.params.id,
      title: req.body.title,
      travelDate: req.body.travelDate,
      coverPhoto: req.body.coverPhoto,
      description: req.body.description,
      memories: req.body.memories,
      words: req.body.words,
      morePhotos: req.body.morePhotos
    });
    res.status(204).end(); //Can we return it???
})

// DELETE request
app.delete('/journal-entries/:id', (req,res) => {
  JournalEntries.delete(req.params.id);
  console.log(`Deleting blog post ${req.params.id}`);
  res.status(204).end();
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