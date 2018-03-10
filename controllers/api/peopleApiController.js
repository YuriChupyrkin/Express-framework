const RouteConfig = require('../../routeConfig');
const DCB = require('../../DAL/dataCollectionsBuilder');

module.exports = class PeopleApiController {
  constructor(routeConfig) {
    this._routeConfig = routeConfig
  }

  init() {
    this._routeConfig.registerGetRoute(
      '/api/people/get',
      this.getPeople.bind(this)
    );
    this._routeConfig.registerPostRoute(
      '/api/people/add',
      this.addPerson.bind(this)
    );
  }

  sendErrorResut(error, response) {
    response.status(500);
    response.json({errorMessage: error});
  }

  getPeople(req, res) {
    // const query = req.query;
    const collection = DCB.getCollection('peopleCollection');
    collection.getPeople().then((people) => {
      res.json(people);
    }).catch((error) => {
      this.sendErrorResut(error, res);
    });
  }

  addPerson(req, res) {
    const person = req.body;

    if (!person.name || !person.age) {
      this.sendErrorResut('body is not exist', res);
      return;
    }

    // save in DB
    const collection = DCB.getCollection('peopleCollection');
    collection.addPerson(person).then(() => {
      res.json(person);
    }).catch((error) => {
      this.sendErrorResut(error, res);
    });
  }
}
