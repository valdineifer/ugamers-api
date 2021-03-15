type ApiError = {
  field: string;
  message: string;
};

/* eslint-disable import/prefer-default-export */
export const ApiErrors = {
  invalidType: (field: string): ApiError => ({
    field,
    message: 'Dado com tipo inválido',
  }),
  userNotFound: (field: string): ApiError => ({
    field,
    message: 'Usuário não encontrado com os dados informados',
  }),
  nullField: (field: string): ApiError => ({
    field,
    message: 'Campo obrigatório',
  }),
  tooShortField: (field: string, min: number): ApiError => ({
    field,
    message: `O campo deve conter no mínimo ${min} caracteres`,
  }),
  tooLongField: (field: string, max: number): ApiError => ({
    field,
    message: `O campo deve conter no máximo ${max} caracteres`,
  }),

  invalidEmail: {
    field: 'email',
    message: 'Informe um endereço de email válido',
  },
  invalidUsername: {
    field: 'username',
    message: 'Nome de usuário só pode ter alfanuméricos, underscore e traços',
  },
  invalidPassword: {
    field: 'password',
    message:
      'A senha deve ter pelo menos uma letra maiúscula, uma minúscula, um número e um símbulo',
  },
  passwordDiff: {
    field: 'password',
    message: 'Senha incorreta',
  },
};
