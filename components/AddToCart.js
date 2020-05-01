import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

// TODO: determine if this needs to be a statefull component
// TODO: setup update and optimistic response like remove from cart
  // item attributes will need to be passed into this component along with the id to properly update cache
export default class AddToCart extends Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation 
        mutation={ADD_TO_CART_MUTATION} 
        variables={{id}}
        // the refetch updates the user, which updates the cart because cart is connected to the user query
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(addToCart, { loading }) => (
          <button disabled={loading} onClick={addToCart}>
            Add{loading && 'ing'} To Cart 🛒
          </button>
        )}
      </Mutation>
    )
  }
}
