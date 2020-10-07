'use strict'

const rp = require('request-promise');

const API_URL = 'https://restcountries.eu/rest/v2/all';
const REGION_NAME_API_URL = 'https://restcountries.eu/rest/v2/region';

module.exports = {
  Query: {
    all: () => rp({
      uri: API_URL,
      json: true
    }),
    regions: () => rp({
      uri: API_URL,
      json: true
    }).then(function (data) {
      console.log('regions');
      return data.reduce((unique, item) => {
        return item.region != '' && unique.includes(item.region) ? unique : [...unique, item.region];
      }, [])
        .filter((region) => {
          return region != '';
        }).map((region, index) => {
          if (region != "") {
            return {
              id: index,
              code: index + 1,
              name: region
            };
          }
        });
    }),
    countries: (root, { name }) => rp({
      uri: `${REGION_NAME_API_URL}/${name}`,
      json: true
    })
  }
};
