'use strict';

const Q_INSERT_CLASS = `
  INSERT INTO Class (id, slug, name, card_id)
  VALUES (?, ?, ?, ?)
`;

class ClassHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (heroClass) {
    return await this.connection.query(
      Q_INSERT_CLASS,
      [heroClass.id, heroClass.slug, heroClass.name, heroClass.cardId]
    );
  }
}

module.exports = ClassHandler;
