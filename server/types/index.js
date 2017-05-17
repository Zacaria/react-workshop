/**
 * The root file that combines all of our types
 */

// TODO: Define your queries

const Ingredient = /* GraphQL */ `
  type Ingredient {
    _id: ID!
    name: String!
  }  
`;

const Recipe = /* GraphQL */ `
  type Recipe {
    _id: ID!
    title: String!
    vegetarian: Boolean!
    ingredients: [Ingredient!]!
    preparation: [String!]!
  }  
`;

const Query = /* GraphQL */`
	type Query {
		dummy: String
		recipes(vegetarian: Boolean, ingredient: String): [Recipe!]!
		ingredients: [Ingredient!]!
	}
`;

const Schema = /* GraphQL */`
	schema {
		query: Query
	}
`;


// TODO: Add all of your types to this array
export default [Schema, Query, Recipe, Ingredient];
