import { ApolloError } from 'apollo-server-express';

export default class SemanticException extends ApolloError {
  constructor(argumentName: string, message: string) {
    super(message, 'GRAPHQL_VALIDATION_FAILED', {
      invalidArgs: [{ property: argumentName, message }],
    });

    Object.defineProperty(this, 'name', { value: 'SemanticException' });
  }
}
