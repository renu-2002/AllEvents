const express= require('express');
const mysql= require('mysql2');
const cors= require('cors');

const app= express()
app.use(cors())

const db= mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'MummyRenu@2002',
    database: 'event_database'
})

app.get('/', (re, res) => {
    return res.json("from backend side");
})



app.listen(8081, () => {
    console.log("listening");
})

// app.listen(3001, 'localhost'); // or server.listen(3001, '0.0.0.0'); for all interfaces
// app.on('listening', function() {
//     console.log('Express server started on port %s at %s', server.address().port, server.address().address);
// });


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/events', (req, res) => {
    const sql= "SELECT * FROM events";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

var bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/events', function(req, res) {
    res.sendFile(__dirname+'/eventForm')
})

app.post('/events', (req, res) => {
    const { eventName, startTime, endTime, location, description, category } = req.body;
    const sql = `INSERT INTO events (eventName, startTime, endTime, location, description, category) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [eventName, startTime, endTime, location, description, category], (err, result) => {
      if (err) throw err;
      res.json({ message: "Event added successfully", eventId: result.insertId });
    });
});
  


app.get('/user', (req, res) => {
    const sql= "SELECT * FROM user";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/user')
})

app.post('/user', (req, res) => {
    const { email, name} = req.body;
    const sql = `INSERT INTO user (email, name) VALUES (?, ?)`;
    db.query(sql, [email, name], (err, result) => {
      if (err) throw err;
      res.json({ message: "user added successfully", email: result.insertId });
    });
});


app.get('/book_ticket', (req, res) => {
    const sql= "SELECT * FROM book_ticket";
    db.query(sql, (err, data) => {
        if(err) return res.json(err);
        return res.json(data);
    })
})
  
app.post('/book_ticket', (req, res) => {
    const {event_id, name, email, phone, tickets} = req.body;
    const sql = `INSERT INTO book_ticket (event_id, name, email, phone, tickets) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [event_id, name, email, phone, tickets], (err, result) => {
      if (err) throw err;
      res.json({ message: "tickets booked successfully", id: result.insertId });
    });
});