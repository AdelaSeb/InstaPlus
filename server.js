const express =  require('express');
const app = express();
const mongoose = require('mongoose');

app.get('/', (req, res) => res.send('Hello'));
const port = 7000;
app.listen(port,()=>console.log(`server is running on port ${port}`));

//Db config
const db = require ('./config/keys').mongoURI;
mongoose.connect(db).then(() => console.log('MongoDb connected')).catch(err => console.log(err));