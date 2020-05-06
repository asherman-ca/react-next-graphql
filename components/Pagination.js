import React from 'react';
import Head from 'next/head';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Query } from 'react-apollo';
import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = (props) => (
  <Query 
    query={PAGINATION_QUERY}
  >
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return <PaginationStyles data-test="pagination">
        <Head>
          <title>Sick fits | Page {page} / {pages}</title>
        </Head>
        <Link 
          prefetch
          href={{
            pathname: 'items',
            query: { page: page - 1 }
          }}>
          <a className="prev" aria-disabled={page <= 1}>◀ Prev</a>
        </Link>
        <p>page {page} of {pages}</p>
        {/* <p>{count} items total</p> */}
        <Link 
          prefetch
          href={{
            pathname: 'items',
            query: { page: page + 1 }
          }}>
          <a className="prev" aria-disabled={page >= pages}>Next ▶</a>
        </Link>
      </PaginationStyles>
    }}
  </Query>  
)

export default Pagination;
export { PAGINATION_QUERY };