const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ServerSettings = require('./serverSettings');
const RouteConfig = require('./routeConfig');
const ControllersBuilder = require('./controllers/controllersBuilder');

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

// run server
app.listen(ServerSettings.Port, () => {
  console.log(`server started on ${ServerSettings.Port} port`);
});
