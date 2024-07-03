import mysql from 'mysql';

// const db = mysql.createConnection({
//   host: '51.79.146.36',
//   port : 3306,
//   user: 'vhingo_db',
//   password: '!h@r!7N3z3Lh',
//   database: 'vhingo_db'
// });

const db = mysql.createConnection({
  host: '51.79.204.225',
  port : 2083,
  user: 'blivmi_socket',
  password: 'Ppu9NPJGuFrh',
  database: 'blivmi_crm',
  connectTimeout: 20000
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Wrap the query method with a promise
export const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

export default db;
