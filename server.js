const express = require('express'),
      app = express(),
      mongoose = require('mongoose'),
      mongoUri = require('./config/session').mongoUri,
      bodyParser = require('body-parser'),
      cors = require('cors'),
      corsOptions = require('./config/session').corsOptions,
      port = require('./config/session').port;


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

// require('./ServerAssets/trainee/trainee_routes')( app );
require('./ServerAssets/trainer/trainer_routes')( app );

app.listen(port, () => {
  console.log('listening on ' + port);
});
