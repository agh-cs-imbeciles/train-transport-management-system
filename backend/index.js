const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('TTMS backend works!');
});

app.listen(port, () => {
    console.log('Server started');
    console.log(`Listening on: http://localhost:${port}/`);
});