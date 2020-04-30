import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

// TODO: determine if this needs to be a statefull component
export default class AddToCart extends Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{id}}>
        {addToCart => <button onClick={addToCart}>Add To Cart</button>}
      </Mutation>
    )
  }
}
