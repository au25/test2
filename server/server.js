const { createServer } = require("http");
const express = require('express');
const helmet = require('helmet')
const bodyParser = require('body-parser');
const Promise = require('promise');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes/routes');
const path = require('path');

app.use(helmet());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// **************************************************************************** //
//                    Gets Around CORS ISSUE                                    // 
//            Will be unneccesary once we serve the build file                  // 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/', routes);


// **************************************************************************** //

// *************************************************************** //
//                    Serving Our Build File                       //  

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

// *************************************************************** //

const server = createServer(app);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})