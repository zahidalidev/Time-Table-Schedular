const express = require('express');
const timeTable = require('./timeTable/timeTable');
var cors = require('cors')
const app = express();

//to except request from any url
app.use(cors())

//to work with json data to send and except
app.use(express.json());

//if request come from this end then goto timeTable
app.use('/api/timeTable', timeTable)

//listen on port 5000
app.listen(5000, () => console.log('listining on port 5000...'))
