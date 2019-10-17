'use strict';

const Q_INSERT_KEYWORD = `
  INSERT INTO Keyword (id, slug, name, ref_text, \`text\`)
  VALUES (?, ?, ?, ?, ?)
`;

class KeywordHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (keyword) {
    return await this.connection.query(
      Q_INSERT_KEYWORD,
      [keyword.id, keyword.slug, keyword.name, keyword.ref_text, keyword.text]
    );
  }
}

module.exports = KeywordHandler;
