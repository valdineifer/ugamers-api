import { GraphQLError, GraphQLFormattedError } from 'graphql';

export default (error: GraphQLError): GraphQLFormattedError => {
  if (error.message === 'VALIDATION_ERROR') {
    const extensions = {
      code: 'VALIDATION_ERROR',
      errors: [],
    };

    Object.keys(error.extensions.invalidArgs).forEach((key) => {
      const constraints = [];
      Object.keys(error.extensions.invalidArgs[key].constraints).forEach((keyy) => {
        constraints.push(error.extensions.invalidArgs[key].constraints[keyy]);
      });

      extensions.errors.push({
        field: error.extensions.invalidArgs[key].property,
        errors: constraints,
      });
    });

    const graphQLFormattedError: GraphQLFormattedError = {
      message: 'VALIDATION_ERROR',
      extensions,
    };

    return graphQLFormattedError;
  }
  return error;
};
