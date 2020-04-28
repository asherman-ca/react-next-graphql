import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from './ErrorMessage';
import Table from './styles/Table';
import UpdateButton from './styles/SickButton';

const allPermissionNames = [
  'ADMIN',
  'USER',
  'ITEMCREATE',
  'ITEMUPDATE',
  'ITEMDELETE',
  'PERMISSIONUPDATE'
];

const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const Permissions = (props) => (
  <Query query={ALL_USERS_QUERY}>
    {({data, loading, error}) => (
      <div>
        <Error error={error} />
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>email</th>
              {allPermissionNames.map(name => <th>{name}</th>)}
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <User user={user} />
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </Query>
)

class User extends React.Component {
  render(){
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {allPermissionNames.map(name => (
          <td>
            <label htmlFor={`${user.id}-permission-${name}`}>
              <input type="checkbox"/>
            </label>
          </td>
        ))}
        <td>
          <UpdateButton>Update</UpdateButton>
        </td>
      </tr>
    )
  }
}

export default Permissions;