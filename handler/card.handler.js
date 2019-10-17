'use strict';

const Q_INSERT_CARD = `
  INSERT INTO Card (id, class_id, card_type_id, card_set_id, rarity_id, minion_type_id, collectible, slug, \`text\`, flavor_text, artist_name, name, image_path, crop_image_path, health, attack, durability, mana_cost)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

class CardSetHandler {
  constructor (connection) {
    this.connection = connection;
  }

  async insert (card) {
    return await this.connection.query(
      Q_INSERT_CARD,
      [
        card.id,
        card.classId,
        card.cardTypeId,
        card.cardSetId,
        card.rarityId,
        card.minionTypeId,
        card.collectible,
        card.slug,
        card.text,
        card.flavorText,
        card.artistName,
        card.name,
        card.imagePath,
        card.cropImagePath,
        card.health,
        card.attack,
        card.durability,
        card.manaCost
      ]
    );
  }
}

module.exports = CardSetHandler;
