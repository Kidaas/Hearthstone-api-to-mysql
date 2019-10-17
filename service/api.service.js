'use strict';

const request = require('request-promise-native');

class ApiService {
  constructor (BNET_ID, BNET_SECRET) {
    this.BNET_ID = BNET_ID;
    this.BNET_SECRET = BNET_SECRET;
    this.token = '';
    this.metadata = '';
  }

  async getToken () {
    let response = await request({
      url: 'https://us.battle.net/oauth/token',
      method: 'POST',
      resolveWithFullResponse: true,
      auth: {
        user: this.BNET_ID,
        pass: this.BNET_SECRET
      },
      form: {
        grant_type: 'client_credentials'
      }
    });

    this.token = JSON.parse(response.body).access_token;

    return this;
  }

  async getMetadata () {
    let response = await request({
      url: 'https://us.api.blizzard.com/hearthstone/metadata?locale=en_US',
      method: 'GET',
      resolveWithFullResponse: true,
      auth: {
        bearer: this.token
      }
    });

    return JSON.parse(response.body);
  }

  async getCardBySet (setSlug) {
    try {
      var response = await request({
        url: 'https://us.api.blizzard.com/hearthstone/cards?pageSize=1000&locale=en_US&set=' + setSlug,
        method: 'GET',
        resolveWithFullResponse: true,
        auth: {
          bearer: this.token
        }
      });
    } catch (error) {
      console.log(error.statusCode, error.body);

      return [];
    }

    return JSON.parse(response.body).cards;
  }
}

module.exports = ApiService;
