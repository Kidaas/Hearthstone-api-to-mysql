'use strict';

const Q_INSERT_GROUP = `
  INSERT INTO \`Group\` (year, name, slug)
  VALUES (?, ?, ?)
`;

class GroupHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (group) {
    return await this.connection.query(
      Q_INSERT_GROUP,
      [group.year, group.name, group.slug]
    );
  }
}

module.exports = GroupHandler;
