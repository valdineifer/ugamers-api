/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { InputResponse } from 'src/types';

@Catch(ApolloError)
export class ApolloErrorFilter implements GqlExceptionFilter {
  catch(exception: ApolloError): InputResponse {
    const errors = [];

    Object.keys(exception.extensions.invalidArgs).forEach((key) => {
      const constraints = [];
      Object.keys(exception.extensions.invalidArgs[key].constraints).forEach((keyy) => {
        constraints.push(exception.extensions.invalidArgs[key].constraints[keyy]);
      });

      errors.push({
        field: exception.extensions.invalidArgs[key].property,
        message: constraints,
      });
    });

    return { errors };
  }
}
