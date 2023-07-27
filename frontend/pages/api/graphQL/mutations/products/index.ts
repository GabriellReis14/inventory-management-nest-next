import { gql } from '@apollo/client';

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      id,
      description,
      stock
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(updateProductInput: $input) {
      id
      description
      stock
    }
  }
`;

export const REMOVE_PRODUCT_MUTATION = gql`
  mutation RemoveProduct($id: Int!) {
    removeProduct(id: $id) {
      id
      description
      stock
    }
  }
`;