const PeopleApiController = require('./api/peopleApiController');

module.exports = class ControllersBuilder {
  constructor(routeConfig) {
    this._routeConfig = routeConfig;
  }

  build(controller) {
    new controller(this._routeConfig).init();
  }

  buildAll() {
    console.log('controllers are building...');
    this.build(PeopleApiController);
  }
}