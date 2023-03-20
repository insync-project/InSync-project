export const createProjectsMock = {
  createFullBody: {
    name: "Novo projeto",
    description:
      "Find my Duo é uma plataforma feita para aquelas pessoas que desejam ter um duo, em sua jogatina para se divertirem",
    devType: "Front-end",
    maxUsers: 5,
  },
  createInvalidBody: {
    name: ["Novo projeto"],
    description: ["qualquer outro valor"],
    devType: "outro valor",
    maxUsers: 11,
  },
  createInvalidBody2: {
    name: "Novo projeto",
  },
  createUniqueBody: {
    name: "Unico projeto",
    description:
      "Find my Duo é uma plataforma feita para aquelas pessoas que desejam ter um duo, em sua jogatina para se divertirem",
    devType: "Back-end",
    maxUsers: 4,
  },
};
