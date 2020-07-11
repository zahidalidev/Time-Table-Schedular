const express = require('express');
const timeTable = require('./timeTable/timeTable');

const app = express();

app.use(express.json());
app.use('/api/timeTable', timeTable)


app.listen(3000, () => console.log('listining on port 3000...'))
