const PeopleCollection = require('./services/peopleCollection');

const Collections = {};

module.exports = class DataCollectionsBuilder {
  constructor(dataBase) {
    this._dataBase = dataBase;
  }

  build(collectionName, collectionService) {
    const service = new collectionService(this._dataBase);
    Collections[collectionName] = service;
  }

  buildAll() {
    console.log('collections are building...');
    this.build('peopleCollection', PeopleCollection);
  }

  static getCollection(collectionName) {
    return Collections[collectionName]
  }
}

