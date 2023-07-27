import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query {
    products {
        id,
        description,
        stock
    }
  }
`;

export const GET_PRODUCT_BY_ID_QUERY = gql`
  mutation UpdateProduct($input: UpdateProductInput!) {
    updateProduct(updateProductInput: $input) {
      id
      description
      stock
    }
  }
`;