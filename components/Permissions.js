import React from 'react';
import { Query, Mutation } from 'react-apollo';
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

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation updatePermissions($permissions: [Permission], $userId: ID!) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`;

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
  handlePermissionChange = (e, updatePermissions) => {
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
    // use callback to make sure state has been set before using method that references state
    this.setState({permissions: updatedPermissions}, updatePermissions);
    console.log(updatedPermissions);
  }
  render(){
    const user = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          // ...this.state,
          userId: this.props.user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          // added react fragment because we dont have a wrapping div around tr and error
          <>
            { error && <tr><td colspan="8"><Error error={error} /></td></tr> }
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {allPermissionNames.map(permission => (
                <td key={permission}>
                  <label htmlFor={`${user.id}-permission-${permission}`}>
                    <input 
                      id={`${user.id}-permission-${permission}`}
                      type="checkbox"
                      checked={this.state.permissions.includes(permission)} 
                      value={permission}
                      onChange={(e) => {
                        this.handlePermissionChange(e, updatePermissions);
                      }}
                      />
                  </label>
                </td>
              ))}
              <td>
                <UpdateButton 
                  type="button"
                  disabled={loading}
                  onClick={updatePermissions}
                >
                  Updat{loading ? 'ing' : 'e'}
                </UpdateButton>
              </td>
            </tr>
          </>
        )}
      </Mutation>
    )
  }
}

export default Permissions;