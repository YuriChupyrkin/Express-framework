const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ServerSettings = require('./serverSettings');
const RouteConfig = require('./routeConfig');
const ControllersBuilder = require('./controllers/controllersBuilder');
const MongoClient = require('mongodb').MongoClient;
const DataCollectionsBuilder = require('./DAL/dataCollectionsBuilder');

const app = express();
const routeConfig = new RouteConfig(app);
let controllersBuilder;

// body parser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(new bodyParser());

// setup client dir
app.use(express.static(path.join(__dirname, ServerSettings.ClientDir)));

// init routes
routeConfig.init();

// init controllers
controllersBuilder = new ControllersBuilder(routeConfig);
controllersBuilder.buildAll();

const dataBaseUrl = ServerSettings.DataBaseUrl;
const dataBaseName = ServerSettings.DataBaseName;

if (dataBaseUrl && dataBaseName) {
  MongoClient.connect(dataBaseUrl, (error, client) => {
    if (error) {
      return console.log(error);
    }

    const db = client.db(dataBaseName);

    // build collections
    new DataCollectionsBuilder(db).buildAll();

    // run server
    app.listen(ServerSettings.Port, () => {
      console.log(`server started on ${ServerSettings.Port} port`);
    });
  });
} else {
  // run server
  app.listen(ServerSettings.Port, () => {
    console.log(`server started on ${ServerSettings.Port} port`);
  });
}
