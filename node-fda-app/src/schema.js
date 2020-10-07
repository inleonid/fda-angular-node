'use strict'

module.exports = [`

  type Language {    
    name: String
    iso639_1: String
  }

  type Currency {
    code: String
    name: String
    symbol: String
  }

  type Country {
    name: String!,
    callingCodes: [String],
    capital: String
    region: String
    languages : [Language]
    currencies: [Currency]
    flag: String
  }

  type Region{
    id: ID !
    code: Int
    name: String!
  }

  type Query {
    all: [Country]
    regions: [Region]
    countries(name: String!): [Country]
  }

  schema {
    query: Query
  }
`];
