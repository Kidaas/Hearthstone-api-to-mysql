'use strict';

const Q_CARD_KEYWORD = `DELETE FROM Card_keyword`;
const Q_CARD = `DELETE FROM Card`;
const Q_GROUP_CARD_SET = `DELETE FROM Group_card_set`;
const Q_CARD_SET = `DELETE FROM Card_set`;
const Q_GROUP = `DELETE FROM \`Group\``;
const Q_CARD_TYPE = `DELETE FROM Card_type`;
const Q_RARITY = `DELETE FROM Rarity`;
const Q_CLASS = `DELETE FROM Class`;
const Q_MINION_TYPE = `DELETE FROM Minion_type`;
const Q_KEYWORD = `DELETE FROM Keyword`;

class DatabaseHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async clean (heroClass) {
    await this.connection.query(Q_CARD_KEYWORD, []);
    await this.connection.query(Q_CARD, []);
    await this.connection.query(Q_GROUP_CARD_SET, []);
    await this.connection.query(Q_CARD_SET, []);
    await this.connection.query(Q_GROUP, []);
    await this.connection.query(Q_CARD_TYPE, []);
    await this.connection.query(Q_RARITY, []);
    await this.connection.query(Q_CLASS, []);
    await this.connection.query(Q_MINION_TYPE, []);
    await this.connection.query(Q_KEYWORD, []);

    return true;
  }
}

module.exports = DatabaseHandler;
