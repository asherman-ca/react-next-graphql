import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import Error from '../components/ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $image: String
    $largeImage: String
    $price: Int!
  ) {
    createItem(
      title: $title
      description: $description
      image: $image
      largeImage: $largeImage
      price: $price
    ) {
      id
    }
  }
`;

export default class CreateItem extends Component {
  state = {
    title: 'cool shoes',
    description: 'description words',
    image: 'dog.jpg',
    largeImage: 'lrgdog.jpg',
    price: 5000,
  }

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  }

  // TODO 4/21/20: check that image is done uploading before allowing item submission
  // TODO 4/21/20: instead of previewing just the image - preview the full card as it will appear

  uploadFile = async e => {
    console.log('uploading file...');
    const files = e.target.files;
    // use form data API to prep data
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'sickfits');

    const res = await fetch('https://api.cloudinary.com/v1_1/devwor0u0/image/upload', {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  }

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={async e => {
            e.preventDefault();
            const res = await createItem();
            // TODO: add pagination
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id }
            })
          }}>
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Image
                <input 
                  type="file" 
                  id="file" 
                  name="file"
                  placeholder="Upload an image" 
                  required
                  onChange={this.uploadFile}
                />
                {this.state.image && <img width="200" src={this.state.image} alt="Upload preview" />}
              </label>

              <label htmlFor="title">
                Title
                <input 
                  type="text" 
                  id="title" 
                  name="title"
                  placeholder="Title" 
                  required 
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="price">
                Price
                <input 
                  type="number" 
                  id="price" 
                  name="price"
                  placeholder="Price"
                  required 
                  value={this.state.price}
                  onChange={this.handleChange}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea 
                  type="text" 
                  id="description" 
                  name="description"
                  placeholder="Enter a description"
                  required 
                  value={this.state.description}
                  onChange={this.handleChange}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export { CREATE_ITEM_MUTATION };