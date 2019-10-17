'use strict';

const Q_INSERT_CARD_SET = `
  INSERT INTO Card_set (id, slug, release_date, name)
  VALUES (?, ?, ?, ?)
`;

class CardSetHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (cardSet) {
    return await this.connection.query(
      Q_INSERT_CARD_SET,
      [cardSet.id, cardSet.slug, cardSet.releaseDate, cardSet.name]
    );
  }
}

module.exports = CardSetHandler;
