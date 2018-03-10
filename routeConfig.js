module.exports = class RouteConfig {
  constructor(app) {
    this._app = app;
  };

  init() {
    this._app.get('/', (req, res) => {
      res.send('hello wolrd!!!');
    });
  };

  registerGetRoute(url, handler) {
    this._app.get(url, function () {
      try {
        handler(...arguments);
      } catch (error) {
        let response = arguments[1];
        response.status(500);
        response.send({
          errorMessage: error.message
        });
      }
    });
  }

  registerPostRoute(url, handler) {
    this._app.post(url, function () {
      try {
        handler(...arguments);
      } catch (error) {
        let response = arguments[1];
        response.status(500);
        response.send({
          errorMessage: error.message
        });
      }
    });
  }
};