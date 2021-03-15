/* eslint-disable import/prefer-default-export */
export const ApiErrors = {
  invalidType: "O campo '$property' informado possui tipo inválido",
  nullField: "Campo '$property' é obrigatório",
  tooShortField: "O campo '$property' deve conter no mínimo '$constraints1' caracteres",
  tooLongField: "O campo '$property' deve conter no máximo '$constraints1' caracteres",

  userNotFound: (...fields: string[]): string =>
    `Usuário não encontrado com o(s) dado(s): ${fields.join(', ')}`,

  invalidEmail: 'Informe um endereço de email válido',
  invalidUsername: 'Nome de usuário só pode ter alfanuméricos, underscore e traços',
  invalidPassword:
    'A senha deve ter pelo menos uma letra maiúscula, uma minúscula, um número e um símbulo',
  passwordDiff: 'Senha incorreta',
};
