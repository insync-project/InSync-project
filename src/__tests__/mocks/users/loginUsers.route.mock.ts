export const userLoginMock = {
  userActive: {
    name: "Fabio",
    email: "fabio@kenzie.com.br",
    password: "12345678",
    nickname: "fabio",
    admin: false,
  },
  userToInactive: {
    name: "Cauan",
    email: "cauan@kenzie.com.br",
    password: "1234",
    nickname: "Cauan",
  },
  userInvalidCredential1: {
    user: "fabio@kenzie.com.br",
    password: "invalid_credentials",
  },
  userInvalidCredential2: {
    user: "invalid_credentials@kenzie.com.br",
    password: "1234",
  },
};
