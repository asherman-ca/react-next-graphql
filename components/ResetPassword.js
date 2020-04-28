import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';

const RESET_PASSWORD_MUTATION =  gql`
  mutation RESET_PASSWORD_MUTATION(
    $resetToken: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      resetToken: $resetToken
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

export default class ResetPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    resetToken: this.props.token,
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Mutation 
        mutation={RESET_PASSWORD_MUTATION} 
        variables={this.state}
      >
        {(resetPassword, { loading, error }) => (
          <Form method="post" onSubmit={async e => {
            e.preventDefault();
            await resetPassword();
            this.setState({
              password: '',
              confirmPassword: '',
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Reset Password</h2>
              <Error error={error} />
              {/* <p>{this.props.token}</p> */}
              <label htmlFor="password">
                  Password
                  <input 
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.saveToState}
                  />
                </label>
                <label htmlFor="confirmPassword">
                  Password
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="confirm password"
                    value={this.state.confirmPassword}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submut">Reset Password</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}