const RouteConfig = require('../../routeConfig');

module.exports = class TestApiController {
  constructor(routeConfig) {
    this._routeConfig = routeConfig
  }

  init() {
    this._routeConfig.registerGetRoute('/api/test/get', this.getTestData);
    this._routeConfig.registerPostRoute('/api/test/post', this.postTestData);
  }

  getTestData(req, res) {
    const query = req.query;

    if (!query) {
      res.status(500);
      res.json({error: 'query is not exist'});
      return;
    }

    res.json(query);
  }

  postTestData(req, res) {
    /*
    var testData = {
      name: 'Epam',
      emp: [
        {name: 'Yuri', age: 27, cars: [{model: 'Acura'}, {model: 'Toyota'}]},
        {name: "Nastya", age: 22, cars: []}
      ]
    };
    */
    const body = req.body;

    if (!body) {
      res.status(500);
      res.json({error: 'body is not exist'});
      return;
    }

    res.json(body);
  }
}
