const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

// routes
const playerRoutes = require('./routes/player');
const gamesRoutes = require('./routes/game-route');

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

// db
const mongoose = require('mongoose');
const uri = require('./db_connection');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// setup routes
app.use('/players', playerRoutes);
app.use('/games', gamesRoutes);

// home route
app.get('/', (req,res) => {
    res.json('API per app Battleship, sviluppata dal gruppo Fritti Misti durante il corso di Mobile Programming');
})

// // database connection
mongoose.connect(
    uri,
    {useNewUrlParser:true,useUnifiedTopology:true},
    () => {console.log('connected to DB');}
);

// listen on PORT
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})