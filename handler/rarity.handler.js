'use strict';

const Q_INSERT_RARITY = `
  INSERT INTO Rarity (id, slug, name)
  VALUES (?, ?, ?)
`;

class RarityHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (rarity) {
    return await this.connection.query(
      Q_INSERT_RARITY,
      [rarity.id, rarity.slug, rarity.name]
    );
  }
}

module.exports = RarityHandler;
