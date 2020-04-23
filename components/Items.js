import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from './Item';
import Pagination from './Pagination';
import { perPage } from '../config';

// TODO: cache invalidation - need to invalidate cache on item creation or delete. currently the pages get busted and user most likely needs to refresh.
// current best solution is fetchpolicy="network-only" on the items query but then no speed benefit from caching



const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(
      skip: $skip,
      first: $first,
      orderBy: updatedAt_DESC
    ) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

export default class Items extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query query={ALL_ITEMS_QUERY} variables={{
          skip: (this.props.page * perPage) - perPage
        }}>
          {({ data, error, loading }) => {
            if(loading) return <p>Loading...</p>
            if(error) return <p>Error: {error.message}</p>
            return <ItemsList>
              {data.items.map(item => {
                return <Item key={item.id} item={item} />
              })}
            </ItemsList>
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    )
  }
}

export { ALL_ITEMS_QUERY };