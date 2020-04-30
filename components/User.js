import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

// passes the query payload and any props down
// the child of user must be a function that receives payload as an argument
const User = props => (
  <Query { ...props } query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };