import express from 'express';
import bodyParser from 'body-parser';
import Todo from './Todo'
import Files from './Files'
const fileUpload = require('express-fileupload');
var cors = require('cors')
/**
* Create express instance
*/
const app = express();

/**
 * Configure express to use budy parser, so data is already transformed
 * to JSON and can be used as the "request.body" property
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

/**
 * Have a shutdown listener to shut down the database connection. This code
 * is called when the node server is shutdown, e.g. STRG-C
 */
process.on('SIGINT', () => {
  db.close();
});



/**
 * Create the endpoints
 */
app.get('/', (req, res) => res.send('Quant-UX-TODO v1.0'))

/**
 * The endpoints for the event API delete gate to the repository. 
 */
app.get('/todo', function (req, res) {
  let all = Todo.findAll()
  res.send(all)
})

app.post('/todo', function (req, res) {
  /**
   * We read the body from the request and pass the values to the repository
   * class
   */
  let todo = req.body
  console.debug('post', todo)
  Todo.create(todo.name, todo.description)
  let all = Todo.findAll()
  res.send(all)
})

app.post('/files', function (req, res) {
  /**
   * We read the body from the request and pass the values to the repository
   * class
   */
  let files = req.files
  for (let key in files) {
    let file = files[key]
    Files.create(file.name, file.size)
  }
  let all = Files.findAll()
  res.send(all)
})

/** 
 * Export the app via commonJS exports
 */
module.exports = app;

