/**
 *  Repository class to handle all interaction with the data base,
 */
export default class Events {

  constructor (db) {
    this.db = db
    this.setup()
  }

  /**
   * Setups up the event table if no table is there
   */
  setup() {
    console.log('Events.setup > enter');
    let sql = `CREATE TABLE IF NOT EXISTS events (id INTEGER PRIMARY KEY AUTOINCREMENT, device VARCHAR(255), type VARCHAR(255), value DOUBLE)`
    this.db.run(sql)
  }
  
  /**
   * Creates a new event row in the table
   * 
   * @param {*} device The id of the device which send the event
   * @param {*} type The type of measurement, all strings will work
   * @param {*} value The value of the measurement, must be double
   */
  create(device, type, value) {
    console.log('Events.create > enter', device, type, value);
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO events(device, type, value) VALUES(?, ?, ?)`
      this.db.run(sql, [device, type, value], function (err) { // we use function() instead of arrow to have access to this.lastID!
        if (err) {
          reject(err)
          return
        }
        resolve(this.lastID)
      })
    })
  }


  /**
   * Returns all events from the event table
   */
  findAll () {
    console.debug('Events.findAll() > enter ')
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT * FROM events`, [], (err, rows ) => {
        if (err) {
          reject(err)
          return
        }
        resolve(rows)
      })
    })
  }

}
