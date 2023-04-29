// Import the required modules
const express = require('express');
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'MummyRenu@2002',
  database: 'event_database',
});

// Create a new Express app
const app = express();

// Define the /api/createEvent endpoint
app.post('/api/createEvent', (req, res) => {
  // Parse the form data from the request body
  const { eventName, startTime, endTime, location, description, category, bannerImage } = req.body;

  // Define the SQL query for inserting the form data into the database
  const sql = `
    INSERT INTO events (eventName, startTime, endTime, location, description, category, bannerImage)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  // Execute the SQL query with the form data
  pool.query(sql, [eventName, startTime, endTime, location, description, category, bannerImage.name], (err, results) => {
    if (err) {
      console.error('Error inserting form data into database:', err);
      res.status(500).json({ error: 'Failed to create event' });
    } else {
      console.log('Form data inserted into database successfully!');
      res.status(200).json({ message: 'Event created successfully!' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
