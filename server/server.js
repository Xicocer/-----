const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const adminRoutes = require('./routes/admin.router');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'mysecret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, 
    secure: false, 
  },
}));

app.use(express.json());
app.use('/admin', adminRoutes);

const start = () => {
    try{
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }catch (e) {
        console.log(e);
    }
}


start()