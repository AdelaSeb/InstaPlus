const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Db config
const db = require('./config/keys').mongoURI;
mongoose.connect(db).then(() => console.log('mongodb connected!!')).catch(err => console.log(err));

app.get('/', (req, res) => res.send('hello')); 
const port = 7000;
app.listen(port, () => console.log(`sewrver is running on port ${port}`));
