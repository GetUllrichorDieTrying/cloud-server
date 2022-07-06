'use strict';

// THIS IS THE STRETCH GOAL ...
// It takes in a schema in the constructor and uses that instead of every collection
// being the same and requiring their own schema. That's not very DRY!

class DataCollection {
  constructor(model) {
    this.model = model;
  }

  get(id) {
    try {
      if (id) {
        return this.model.findOne({ where: { id } });
      } else {
        return this.model.findAll({});
      }
    } catch (e) {
      console.error(e.message);
      return e;
    }
  }

  create(record) {
    try {
      return this.model.create(record);
    } catch (e) {
      console.error(e.message);
      return e;
    }
  }

  update(id, data) {
    try {
      return this.model
        .findOne({ where: { id } })
        .then((record) => record.update(data));
    } catch (e) {
      console.error(e.message);
      return e;
    }
  }

  delete(id) {
    try {
      return this.model.destroy({ where: { id } });
    } catch (e) {
      console.error(e.message);
      return e;
    }
  }
}

module.exports = DataCollection;
