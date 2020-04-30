// next with apollo handles server side rendering issues
import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart';

// this is where we create our Apollo client and store
function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          // 3rd argument is the apollo client. its destructured into cache here
          toggleCart(_, variables, { cache }){
            // read cartOpen from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            })
            console.log('cartOpen', cartOpen);
            // write cart state
            const data = {
              data: {
                cartOpen: !cartOpen
              }
            }
            cache.writeData(data);
            return data;
          }
        }
      },
      defaults: {
        cartOpen: true,
      }
    }
  });
}

export default withApollo(createClient);
