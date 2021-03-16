/* eslint-disable import/prefer-default-export */
export const ApiErrors = {
  invalidType: 'The field is in an invalid type',
  nullField: 'This field is required',
  tooShortField: 'The field must contains at least $constraint1 characters',
  tooLongField: 'The field must have less than $constraint1 characters',

  userNotFound: (...fields: string[]): string =>
    `User not found with the data: ${fields.join(', ')}`,

  invalidEmail: 'Type a valid email address',
  invalidUsername: 'Username must only contains letters, numbers, underscore and traces',
  invalidPassword:
    'The password must contains at least: letter (upper and lower case), number and symbol',
  passwordDiff: 'Incorrect password',
  userExists: 'Username/email already taken',
};
