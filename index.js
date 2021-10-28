const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    res.send('This is from support network server')
})

app.listen(port, () => {
    console.log('server is running at port', port)
})