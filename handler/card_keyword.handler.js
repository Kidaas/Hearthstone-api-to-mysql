'use strict';

const Q_INSERT_CARD_KEYWORD = `
  INSERT INTO Card_keyword (card_id, keyword_id)
  VALUES (?, ?)
`;

class CardKeywordHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (cardId, keywordId) {
    return await this.connection.query(
      Q_INSERT_CARD_KEYWORD,
      [cardId, keywordId]
    );
  }
}

module.exports = CardKeywordHandler;
