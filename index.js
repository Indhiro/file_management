const router = require('./routers/routes'); 
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => console.log('server sedang jalan di port ' + PORT + '...'));