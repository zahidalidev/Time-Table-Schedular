const express = require('express');
const timeTable = require('./timeTable/timeTable');
var cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());
app.use('/api/timeTable', timeTable)


app.listen(5000, () => console.log('listining on port 5000...'))
