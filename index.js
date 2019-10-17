'use strict';
/*
 * Libs
 */
require('dotenv').config();

const mysql = require('mysql2/promise');

/*
* Local libs
*/
const ApiService = require('./service/api.service.js');
const CardHandler = require('./handler/card.handler.js');
const CardKeywordHandler = require('./handler/card_keyword.handler.js');
const CardSetHandler = require('./handler/card_set.handler.js');
const CardTypeHandler = require('./handler/card_type.handler.js');
const ClassHandler = require('./handler/class.handler.js');
const DatabaseHandler = require('./handler/database.handler.js');
const GroupCardSetHandler = require('./handler/group_card_set.handler.js');
const GroupHandler = require('./handler/group.handler.js');
const KeywordHandler = require('./handler/keyword.handler.js');
const MinionTypeHandler = require('./handler/minion_type.handler.js');
const RarityHandler = require('./handler/rarity.handler.js');

class Process {
  async run () {
    let cards = [];
    let setsForSearch = [];

    this.connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE
    });

    this.apiService = new ApiService(process.env.BNET_ID, process.env.BNET_SECRET);
    this.cardHandler = new CardHandler(this.connection);
    this.cardKeywordHandler = new CardKeywordHandler(this.connection);
    this.cardSetHandler = new CardSetHandler(this.connection);
    this.cardTypeHandler = new CardTypeHandler(this.connection);
    this.classHandler = new ClassHandler(this.connection);
    this.databaseHandler = new DatabaseHandler(this.connection);
    this.groupCardSetHandler = new GroupCardSetHandler(this.connection);
    this.groupHandler = new GroupHandler(this.connection);
    this.keywordHandler = new KeywordHandler(this.connection);
    this.minionTypeHandler = new MinionTypeHandler(this.connection);
    this.rarityHandler = new RarityHandler(this.connection);

    await this.databaseHandler.clean();

    await this.apiService.getToken();
    let metadata = await this.apiService.getMetadata();

    metadata = this.fixMetadata(metadata);

    for (let i = 0; i < metadata.types.length; i++) {
      await this.cardTypeHandler.insert(metadata.types[i]);
    }

    for (let i = 0; i < metadata.rarities.length; i++) {
      await this.rarityHandler.insert(metadata.rarities[i]);
    }

    for (let i = 0; i < metadata.classes.length; i++) {
      if (metadata.classes[i].slug !== 'all') {
        await this.classHandler.insert(metadata.classes[i]);
      }
    }

    for (let i = 0; i < metadata.minionTypes.length; i++) {
      await this.minionTypeHandler.insert(metadata.minionTypes[i]);
    }

    for (let i = 0; i < metadata.keywords.length; i++) {
      await this.keywordHandler.insert(metadata.keywords[i]);
    }

    for (let i = 0; i < metadata.sets.length; i++) {
      await this.cardSetHandler.insert(metadata.sets[i]);
      setsForSearch[metadata.sets[i].id] = metadata.sets[i].slug;
      let response = await this.apiService.getCardBySet(metadata.sets[i].slug);
      cards = cards.concat(response);
    }

    for (let i = 0; i < metadata.setGroups.length; i++) {
      let group = await this.groupHandler.insert(metadata.setGroups[i]);

      metadata.setGroups[i].id = group[0].insertId;

      for (let j = 0; j < metadata.setGroups[i].cardSets.length; j++) {
        await this.groupCardSetHandler.insert(
          metadata.setGroups[i].id,
          setsForSearch.indexOf(metadata.setGroups[i].cardSets[j])
        );
      }
    }

    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      await this.cardHandler.insert(card);

      if (card.hasOwnProperty('keywordIds') === true) {
        for (let j = 0; j < card.keywordIds.length; j++) {
          await this.cardKeywordHandler.insert(
            card.id,
            card.keywordIds[j]
          );
        }
      }
    }
    this.connection.end();
  }

  fixMetadata (metadata) {
    // fix wild-event doesn't in metadata..
    metadata.sets.push({
      id: 1439, // pas sur de l'id
      slug: 'wild-event',
      releaseDate: '2019-10-08T00:00:00',
      name: 'Wild event'
    });
    // Fix, blizard have missing the "all" type for amalgam
    metadata.minionTypes.push({
      id: 26,
      slug: 'all',
      name: 'All'
    });
    // Fix Specifics discover (Kabal courier)
    // who discover a Mage/Priest/Warlock cards
    metadata.keywords.push({
      id: 29,
      slug: 'tri-class',
      name: 'Tri class',
      ref_text: null,
      text: 'Tri class card'
    });
    // Star of the game ability use by Prince Malchezaar
    metadata.keywords.push({
      id: 64,
      slug: 'start-of-the-game',
      name: 'Start of the game',
      ref_text: null,
      text: 'Ability which activates at the start of the game'
    });

    return metadata;
  }
}

var a = new Process();
a.run();
