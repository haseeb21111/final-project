
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.json());
app.use(cors());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Haseeb@2111',
  database: 'appointments'
});


db.connect((err) => {
  if (err) {
    console.log('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});


app.get('/api/appointments', (req, res) => {
  const sql = 'SELECT * FROM appointments';
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error fetching appointments');
    }
    res.json(results);
  });
});


app.post('/api/appointments', (req, res) => {
  const { name, date, time, description } = req.body;
  const sql = 'INSERT INTO appointments (name, date, time, description) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, date, time, description], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error creating appointment');
    }
    res.json({ message: 'Appointment created successfully', appointmentId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.put('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { name, date, time, description } = req.body;
  
  const sql = 'UPDATE appointments SET name=?, date=?, time=?, description=? WHERE id=?';
  
  db.query(sql, [name, date, time, description, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error updating appointment');
    }
    res.json({ message: 'Appointment updated successfully!' });
  });

  app.delete('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM appointments WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error deleting appointment');
      }
      res.json({ message: 'Appointment deleted successfully!' });
  });

});