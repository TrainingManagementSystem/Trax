import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './ServerAssets/routes';
import { mongoUri, corsOptions, port } from './config/session';

const app = express();


// var session = require('express-session'),
// sessionConfig = require('./config/session'),
// app.use(session(sessionConfig));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose.connect(mongoUri);
mongoose.connection.once('open', () => {
  console.log('Connected to mongo at ' + mongoUri);
});

routes(app);

app.listen(port, () => {
  console.log('listening on ' + port);
});
