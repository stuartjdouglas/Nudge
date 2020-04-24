const express = require('express');
const path = require('path');
const config = require('./config');
const port = process.env.PORT || config.httpPort;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => console.log(`Server listening on :${config.httpPort}`));