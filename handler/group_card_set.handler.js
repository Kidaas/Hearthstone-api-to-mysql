'use strict';

const Q_INSERT_GROUP_CARD_SET = `
  INSERT INTO Group_card_set (group_id, card_set_id)
  VALUES (?, ?)
`;

class GroupCardSetHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (groupId, cardSetId) {
    return await this.connection.query(
      Q_INSERT_GROUP_CARD_SET,
      [groupId, cardSetId]
    );
  }
}

module.exports = GroupCardSetHandler;
