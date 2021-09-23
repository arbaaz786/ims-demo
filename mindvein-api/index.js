import cors from 'cors';
import express from 'express';
import graphlHTTP from 'express-graphql';
import mongoose from 'mongoose';
//import schema from './graphql/GraphQL';
import schema from './graphql/schema';
import generatePdf from './utils/GeneratePdf';
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var config = require('./config/configFile.js');
const logger = require('./utils/loggers');
const xml2js = require('./utils/xmlToJs');

const accountSid = 'AC7a013a504a7e7b29c9eb108ce73b2ba4';
const authToken = '8b499d93a902e5ad56728d21f4f0f36e';
const TWILIO_PHONE_NUMBER = '+15108248735';
const client = require('twilio')(accountSid, authToken);

const app = express();
const PORT = 4300;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);

// app.configure(function () {
//...
// set the 'dbUrl' to the mongodb url that corresponds to the
// environment we are in
app.set('dbUrl', config.db[app.settings.env]);
// connect mongoose to the mongo dbUrl
mongoose
  .connect(app.get('dbUrl'), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    // console.log(`connection to database established`);
    logger.info({
      level: 'info',
      message: 'connection to database established.........!',
    });
  })
  .catch((err) => {
    console.log(`db error ${err.message}`);
    logger.info({
      level: 'info',
      message: 'database error ..! ',
    });
    process.exit(-1);
  });
//...
// });

// const client = twilio(obj.accountSid, obj.authToken);

// const client = require('twilio')(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/newjdent_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// var bodyData = '/foo.xml';
// const XMLDATA = xml2js.convertXMLToJS(bodyData);

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.post('/api/generatePdf64', (req, res) => {
  console.log(req.body);
  res.header('Content-Type', 'application/json');
  generatePdf
    .generatePdf('Invoice NO')
    .then(async (pdfBase64) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ pdf: pdfBase64 }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.post('/api/messages', (req, res) => {
  res.header('Content-Type', 'application/json');
  client.messages
    .create({
      from: TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body,
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.get('/', (req, res) => {
  res.json({
    message: 'IMS API v1',
  });
});
app.use(
  '/graphql',
  graphlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on PORT 💥 ${PORT} 💥 `);
});