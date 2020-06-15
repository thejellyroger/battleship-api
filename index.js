const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

// routes
const playerRoutes = require('./routes/player');
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/game-route');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// db
const mongoose = require('mongoose');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// setup routes
app.use('/players', playerRoutes);
app.use('/auth', authRoutes);
app.use('/games', gamesRoutes);

// home route
app.get('/', (req,res) => {
    res.json('hello');
})

// database connection
const uri = 'mongodb+srv://frittimisti:lor1ale2giu3@battleship-xlj4m.mongodb.net/test?retryWrites=true&w=majority';
// mongoose.connect(
//     process.env.MONGO_URI,
//     {useNewUrlParser:true,useUnifiedTopology:true},
//     () => {console.log('connected to DB');}
// );

mongoose.connect(
    uri,
    {useNewUrlParser:true,useUnifiedTopology:true},
    () => {console.log('connected to DB');}
);

// listen on PORT
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})