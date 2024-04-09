const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.ENV_MONGO)
    .then(() => console.log('succesful connection to MongoDB !'))
    .catch(() => console.log('Impossible to connect to mongoDB !'));

app.use(cors());
app.use(express.json());

app.use('/todo', require('./routes/TodoRoutes'));

app.get('/', (re, res) => {
    return res.json('from backend side');
});

app.listen(3500, () => console.log(`Server listenning on port 3500`));