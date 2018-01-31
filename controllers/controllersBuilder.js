const TestApiController = require('./api/testApiController');

module.exports = class ControllersBuilder {
  constructor(routeConfig) {
    this._routeConfig = routeConfig;
  }

  build(controller) {
    new controller(this._routeConfig).init();
  }

  buildAll() {
    this.build(TestApiController);
  }
}