import { gql } from '@apollo/client';

export const CREATE_USERS_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id,
      email,
      isAdmin
    }
  }
`;

export const UPDATE_USERS_MUTATION = gql`
  mutation UpdateUsers($input: UpdateUsersInput!) {
    updateUser(updateUsersInput: $input) {
      id,
      email,
      password
      isAdmin,
    }
  }
`;

export const REMOVE_USERS_MUTATION = gql`
  mutation RemoveUsers($id: Int!) {
    removeUser(id: $id) {
      id,
      email
    }
  }
`;