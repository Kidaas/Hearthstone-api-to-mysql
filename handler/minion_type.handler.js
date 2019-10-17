'use strict';

const Q_INSERT_MINION_CLASS = `
  INSERT INTO Minion_type (id, slug, name)
  VALUES (?, ?, ?)
`;

class MinionTypeHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (minionType) {
    return await this.connection.query(
      Q_INSERT_MINION_CLASS,
      [minionType.id, minionType.slug, minionType.name]
    );
  }
}

module.exports = MinionTypeHandler;
