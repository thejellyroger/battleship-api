const express = require('express');
const http = require('http');
const cors = require('cors');

const app = express();

// routes
const playerRoutes = require('./routes/player');
const authRoutes = require('./routes/auth');

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
app.use('/player', playerRoutes);
app.use('/auth', authRoutes);

// home route
app.get('/', (req,res) => {
    res.json('hello');
})

// database connection
mongoose.connect(
    process.env.MONGO_URI,
    {useNewUrlParser:true,useUnifiedTopology:true},
    () => {console.log('connected to DB');}
);

// listen on PORT
server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})