import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { compose, withState } from 'recompose';
import withLoading from '../withLoading';

const RecipesQuery = gql`
  query RecipesQuery($vegetarian: Boolean, $ingredient: String) {
      recipes (vegetarian: $vegetarian, ingredient: $ingredient){
          _id
          title
          vegetarian
      }
      ingredients {
          _id
          name
      }
  }
`;

const Recipes = ({
  data,
  vegetarianFilter,
  setVegetarianFilter,
  ingredientFilter,
  setIngredientFilter
}) => {
  return (
    <div>
      <h3>Vegetarian Filter</h3>
      <div>
        <button
          style={{ background: vegetarianFilter === null ? '#ccc' : '#fff' }}
          onClick={() => setVegetarianFilter(null)}
        >
          Off
        </button>
        <button
          style={{ background: vegetarianFilter === true ? '#ccc' : '#fff' }}
          onClick={() => setVegetarianFilter(true)}
        >
          Yes
        </button>
        <button
          style={{ background: vegetarianFilter === false ? '#ccc' : '#fff' }}
          onClick={() => setVegetarianFilter(false)}
        >
          No
        </button>
      </div>
      <h3>Ingredient Filter</h3>
      <div>
        <select
          value={ingredientFilter}
          onChange={({ target }) => {
            setIngredientFilter(target.value ? target.value : undefined);
          }}
        >
          <option value={''}>Not active</option>
          {data.ingredients.map(ingredient => (
            <option key={ingredient._id} value={ingredient._id}>{ingredient.name}</option>
          ))}
        </select>
      </div>
      <h1>Recipes</h1>
      {data.recipes.map(({ title, preparation, ingredients, _id }) => (
        <div key={_id}>
          <Link to={`${_id}`}><h2>{title}</h2></Link>
        </div>
      ))}
    </div>
  );
};

const withFetch = graphql(RecipesQuery, {
  options: props => ({
    variables: {
      vegetarian: props.vegetarianFilter,
      ingredient: props.ingredientFilter,
    }
  })
});

const enhance = compose(
  withState('vegetarianFilter', 'setVegetarianFilter', null),
  withState('ingredientFilter', 'setIngredientFilter', null),
  withFetch,
  withLoading,
);

export default enhance(Recipes);
