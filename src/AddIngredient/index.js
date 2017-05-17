import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, withState, withHandlers } from 'recompose';

const IngredientMutation = gql`
  mutation IngredientMutation ($name: String!) {
      submitIngredient(name: $name) {
          _id
          name
      }
  }
`;

const AddIngredient = ({ name, setName, addIngredient, successMessage }) => (
  <form onSubmit={addIngredient}>
    <input
      type="text"
      value={name}
      onChange={({ target }) => {
        setName(target.value);
      }}
    />
    <button type="submit">Create Ingredient</button>
    {successMessage || <div>{successMessage}</div>}
  </form>
);

const withMutation = graphql(IngredientMutation);

const enhance = compose(
  withState('name', 'setName', ''),
  withState('successMessage', 'setSuccessMessage', ''),
  // TODO add ingredient mutation here
  withMutation,
  withHandlers({
    addIngredient: props => event => {
      event.preventDefault();
      props.setSuccessMessage('');
      props.mutate({
        // refetchQueries: [{
        //   query: IngredientMutation,
        // }],
        variables: {
          name: props.name
        }
      }).then(({data: {submitIngredient}}) => {
        props.setSuccessMessage(`Successfully added ${submitIngredient.name} with id ${submitIngredient._id}`)
        props.setName('');
      });
    }
  }),
);

export default enhance(AddIngredient);
