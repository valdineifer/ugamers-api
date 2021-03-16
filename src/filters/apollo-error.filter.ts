/* eslint-disable import/prefer-default-export */
/* eslint-disable class-methods-use-this */
import { Catch } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { ApolloError } from 'apollo-server-express';
import { InputResponse } from 'src/types';

@Catch(ApolloError)
export class ApolloErrorFilter implements GqlExceptionFilter {
  catch(exception: ApolloError): InputResponse {
    const errors = exception.extensions.invalidArgs.map((item) => {
      let { message } = item; // in case if it is a SemanticException

      if (item.constraints) {
        Object.keys(item.constraints).forEach((constr) => {
          message = item.constraints[constr];
        });
      }

      return {
        field: item.property,
        message,
      };
    });

    return { errors };
  }
}
