/// DEPENDENCIES ///
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';

/// FILES ///
import routes from './ServerAssets/routes';
import authentication from './ServerAssets/passport';
import { mongoUri, corsOptions, port, expressConfig } from './config/session';

///////////////////////
// INSERT MIDDLEWARE //
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session(expressConfig));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(mongoUri);
mongoose.connection.once('open', () => {
  console.log('Connected to mongo at ' + mongoUri);
});

authentication(passport);
routes(app);

app.listen(port, () => {
  console.log('listening on ' + port);
});
