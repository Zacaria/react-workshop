/**
 * The root file that combines all of our types
 */
import Recipe from './Recipe';
import Ingredient from './Ingredient';

const Query = /* GraphQL */`
  type Query {
    recipes(vegetarian: Boolean, ingredient: String): [Recipe!]
    ingredients: [Ingredient!]
  }
`;

// TODO: Define your mutations

const RecipeInput = `
  input RecipeInput {
      title: String!
      vegetarian: Boolean!
      ingredients: [ID!]!
      preparation: [String!]!
  }
`;

const Mutation = /* GraphQL */`
  type Mutation {
    submitIngredient (name: String!): Ingredient!
    submitRecipe (input: RecipeInput!): Recipe!
  }
`;

const Schema = /* GraphQL */`
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [Schema, Mutation, Query, Recipe, Ingredient, RecipeInput];
