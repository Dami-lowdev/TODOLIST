const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');


mongoose.connect(process.env.ENV_MONGO)
    .then(() => console.log('succesful connection to MongoDB !'))
    .catch(() => console.log('Impossible to connect to mongoDB !'));

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'front'))); // Add this line

app.use('/todo', require('./routes/TodoRoutes'));

// This should be the last route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front', 'index.html')); // Change this line
});

app.listen(3500, () => console.log(`Server listenning on port 3500`));