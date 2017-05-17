/**
 * The root file that combines all of our resolvers
 */

import {getIngredient, getIngredients} from '../models/Ingredient';
import {getRecipes} from '../models/Recipe';

// TODO: Write your resolvers
export default {
	Query: {
		recipes: (_, {vegetarian, ingredient}) => getRecipes({
				vegetarian,
        ingredient,
		}),
    ingredients: getIngredients
	},
	Recipe: {
		ingredients: obj =>  obj.ingredients.map(getIngredient)
	}
};
