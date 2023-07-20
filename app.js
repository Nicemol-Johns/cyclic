const mongoose = require('mongoose')
const express = require('express');                                           
const app = express();  

require("dotenv").config();                                                   
   

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const cors = require('cors');
app.use(cors());
                                                 
const PORT = 3000; 

const db = require('./db/index');
const api=require('./routers/router');
app.use('/api',api);

const path = require('path');
app.use(express.static('./dist/frontend'));
app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname +
        '/dist//frontend/index.html'));});

        require("dotenv").config();                                                   
        const ConnectionString = process.env.CONNECTION_STRING; 
               

        const connectDB = async () => {
                try {
                  const conn = await mongoose.connect(ConnectionString);
                  console.log(`MongoDB Connected: ${conn.connection.host}`);
                } catch (error) {
                  console.log(error);
                  process.exit(1);
                }
              }        

connectDB().then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        })
    })