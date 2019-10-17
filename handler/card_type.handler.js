'use strict';

const Q_INSERT_CARD_TYPE = `
  INSERT INTO Card_type (id, slug, name)
  VALUES (?, ?, ?)
`;

class CardTypeHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (cardType) {
    return await this.connection.query(
      Q_INSERT_CARD_TYPE,
      [cardType.id, cardType.slug, cardType.name]
    );
  }
}

module.exports = CardTypeHandler;
