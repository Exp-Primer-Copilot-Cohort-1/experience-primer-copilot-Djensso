//create webserver 
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

//create database connection
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'comments'
});
//connect to database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

//use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get all comments
app.get('/comments', (req, res) => {
    let sql = 'SELECT * FROM comments';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

//get a comment
app.get('/comments/:id', (req, res) => {
    let sql = `SELECT * FROM comments WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

//add a comment
app.post('/comments', (req, res) => {
    let data = {name: req.body.name, comment: req.body.comment};
    let sql = 'INSERT INTO comments SET ?';
    let query = db.query(sql, data,(err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

//update a comment
app.put('/comments/:id', (req, res) => {
    let sql = `UPDATE comments SET name = '${req.body.name}', comment = '${req.body.comment}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

//delete a comment
app.delete('/comments/:id', (req, res) => {
    let sql = `DELETE FROM comments WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});