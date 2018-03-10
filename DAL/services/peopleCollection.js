module.exports = class PeopleCollection {
  constructor (db) {
    this._db = db;
    this._name = 'people';
    this._collection = this._db.collection(this._name);
  }

  addPerson(person) {
    return new Promise((resolve, reject) => {
      this._collection.insert(person, (err, result) => {
        if (err) {
          console.log('people save error');
          reject('people save error');
          return;
        }

        resolve(result)
      });
    });
  }

  getPersonById(id) {

  }

  getPeople() {
    return new Promise((resolve, reject) => {
      this._collection.find().toArray((err, docs) => {
        if (err) {
          console.log('get people ERROR');
          reject('get people ERROR');
          return;
        }

        resolve(docs);
      });
    });
  }
};