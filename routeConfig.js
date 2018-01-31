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
    this._app.get(url, handler);
  }

  registerPostRoute(url, handler) {
    this._app.post(url, handler);
  }
};