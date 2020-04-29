import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

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
              {allPermissionNames.map(name => <th key={name}>{name}</th>)}
              <th>👇</th>
            </tr>
          </thead>
          <tbody>
            {data.users.map(user => (
              <UserPermissions key={user.id} user={user} />
            ))}
          </tbody>
        </Table>
      </div>
    )}
  </Query>
)

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      id: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired
  };
  state = {
    permissions: this.props.user.permissions
  };
  handlePermissionChange = e => {
    // either add or remove to permission state
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    // figure out if we need to remove or add the permission
    if(checkbox.checked){
      // add the permission
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
    }
    this.setState({permissions: updatedPermissions})
    console.log(updatedPermissions);
  }
  render(){
    const user = this.props.user;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        {allPermissionNames.map(permission => (
          <td key={permission}>
            <label htmlFor={`${user.id}-permission-${permission}`}>
              <input 
                type="checkbox"
                checked={this.state.permissions.includes(permission)} 
                value={permission}
                onChange={this.handlePermissionChange}
              />
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