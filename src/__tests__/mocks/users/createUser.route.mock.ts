export const userCreateMock = {
  userComplete: {
    name: "Fabio",
    email: "fabio@kenzie.com.br",
    password: "1234",
    nickname: "fabio",
    admin: false,
  },
  userWithoutAdmin: {
    name: "Cauan",
    email: "cauan@kenzie.com.br",
    password: "1234",
    nickname: "Cauan",
  },
  userUniqueEmail: {
    name: "Maykel",
    email: "maykel@kenzie.com.br",
    password: "1234",
    nickname: "Maykel",
  },
  userUniqueNickname: {
    name: "Maykel",
    email: "maykel2@kenzie.com.br",
    password: "1234",
    nickname: "Maykel",
  },
  userInvalidBodyType: {
    name: 1234,
    email: [],
    password: 1234,
    nickname: {},
  },
  userInvalidKeys: {
    email: "fabio@kenzie.com.br",
    password: "123456",
    admin: false,
  },
  userInvalidBody: {
    name: "um nome com mais de 50 caracteres!!!!!!!!!!!!!!!!!!",
    email: "um nome com mais de 50 caracteres!!!!!!!!!!!!!!!!!!",
    password: "123456",
    nickname: "um nome com mais de 30 caracteres!!!!!!!!!!!!!!!!!",
  },
};
