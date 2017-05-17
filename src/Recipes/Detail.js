import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { compose, withState } from 'recompose';
import withLoading from '../withLoading';

const RecipeQuery = gql`
    query RecipeQuery($id: String) {
        recipe (id: $id){
            _id
            title
            vegetarian
            preparation
            ingredients {
                _id
                name
            }
        }
        ingredients {
            _id
            name
        }
    }
`;

const Detail = ({
  data,
}) => {
  console.log(data)
  const {preparation, ingredients} = data.recipe;
  return (
    <div>
      <h3>Preparation</h3>
      <div>
        {preparation.map(entry => <p key={entry}>{entry}</p>)}
      </div>
      <h3>Ingredients</h3>
      <div>
        {ingredients.map(ingredient => (
          <div key={ingredient._id}>
            {ingredient.name}
          </div>
        ))}
      </div>
    </div>
  )
};

const withFetch = graphql(RecipeQuery, {
  options: props => ({
    variables: {
      id: props.match.params.id,
    }
  })
});

const enhance = compose(
  withRouter,
  withFetch,
  withLoading,
);

export default enhance(Detail);
