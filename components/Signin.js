import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const SIGNIN_MUTATION =  gql`
  mutation SIGNIN_MUTATION(
    $email: String!
    $password: String!
  ) {
    signin(
      email: $email
      password: $password
    ) {
      id
      email
    }
  }
`;

export default class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  saveToState = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Mutation 
        mutation={SIGNIN_MUTATION} 
        variables={this.state}
        // the refetch goes into the Apollo store and refetches after the mutation is complete. avoids refresh. better name would be postQueries?
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
        {(signup, { loading, error }) => (
          <Form method="post" onSubmit={async e => {
            e.preventDefault();
            await signup();
            this.setState({
              name: '',
              email: '',
              password: '',
            })
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign in to your account</h2>
              <Error error={error} />
                <label htmlFor="email">
                  Email
                  <input 
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>  
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

                <button type="submut">Sign In</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}