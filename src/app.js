import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3'
import Events from './Events'

/**
* Create express instance
*/
const app = express();

/**
 * Configure express to use budy parser, so data is already transformed
 * to JSON and can be used as the "request.body" property
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Create data base which runs for now in memory, We can also use a persitatnt one, by
 * passing a file name, e.g 
 * let db = new sqlite3.Database('./db/test.db', sqlite3.OPEN_READWRITE);
 */
let db = new sqlite3.Database(':memory:'); 

/**
 * Have a shutdown listener to shut down the database connection. This code
 * is called when the node server is shutdown, e.g. STRG-C
 */
process.on('SIGINT', () => {
  db.close();
});


/**
 * Create events repository
 */
let eventsRepository = new Events(db)


/**
 * Create the endpoints
 */
app.get('/', (req, res) => res.send('Hello World!'))

app.get('/hello/:name', function (req, res) {
  res.send(`Hello ${req.params.name}`)
})

/**
 * The endpoints for the event API delete gate to the repository. 
 */
app.get('/events', function (req, res) {
  eventsRepository.findAll().then(rows => {
    res.send(rows)
  })
})

app.post('/events', function (req, res) {
  /**
   * We read the body from the request and pass the values to the repository
   * class
   */
  let event = req.body
  eventsRepository.create(event.device, event.type, event.value).then(id => {
    res.send({id: id})
  })
})


/** 
 * Export the app via commonJS exports
 */
module.exports = app;

