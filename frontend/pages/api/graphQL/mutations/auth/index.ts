import { gql } from '@apollo/client';

export const SIGN_IN_MUTATION = gql`
  mutation SessionInput($signIn: SessionInput!) {
    signIn(sessionInput: $signIn) {
      token
    }
  }
`;