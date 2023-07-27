import { gql } from '@apollo/client';

export const CREATE_USERS_MUTATION = gql`
  mutation CreateUsers($input: CreateUsersInput!) {
    create(createUsersInput: $input) {
      id,
      email,
      isAdmin,
    }
  }
`;

export const UPDATE_USERS_MUTATION = gql`
  mutation UpdateUsers($input: UpdateUsersInput!) {
    update(updateUsersInput: $input) {
      id,
      email,
      password
      isAdmin,
    }
  }
`;

export const REMOVE_USERS_MUTATION = gql`
  mutation RemoveUsers($id: Int!) {
    remove(id: $id) {
      id,
      email
    }
  }
`;