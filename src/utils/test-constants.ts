export const item = {
  _id: "60d3b41abdacab0026a733cd",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  __v: 0,
  id: "nBqri7WF7nNN28RQry5fC",
};

export const secondItem = {
  _id: "60d3b41abdacab0026a733cc",
  name: "Соус Spicy-X",
  type: "sauce",
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  __v: 0,
  id: "oTDx7WEykfIsfTU-ieMH0",
};

export const bun = {
  _id: "60d3b41abdacab0026a733c7",
  name: "Флюоресцентная булка R2-D3",
  type: "bun",
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: "https://code.s3.yandex.net/react/code/bun-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
  __v: 0,
  id: "DIdhEjVnleEa4X9M2Prz4",
};

export const dragIndex = 1;
export const hoverIndex = 3;

export const orders = {
  success: true,
  orders: [
    {
      _id: "63862edc9b518a001bb8944e",
      ingredients: [
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733c7",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c9",
        "60d3b41abdacab0026a733ca",
      ],
      status: "done",
      name: "Бессмертный флюоресцентный space метеоритный бургер",
      createdAt: "2022-11-29T16:10:04.491Z",
      updatedAt: "2022-11-29T16:10:04.919Z",
      number: 31313,
    },
    {
      _id: "63862dd29b518a001bb8944b",
      ingredients: [
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733c6",
        "60d3b41abdacab0026a733d4",
        "60d3b41abdacab0026a733d3",
        "60d3b41abdacab0026a733ce",
        "60d3b41abdacab0026a733c8",
      ],
      status: "done",
      name: "Люминесцентный экзо-плантаго краторный астероидный традиционный-галактический бургер",
      createdAt: "2022-11-29T16:05:38.243Z",
      updatedAt: "2022-11-29T16:05:38.655Z",
      number: 31312,
    },
    {
      _id: "63862d6c9b518a001bb8944a",
      ingredients: [
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733cd",
        "60d3b41abdacab0026a733c6",
      ],
      status: "done",
      name: "Space краторный бургер",
      createdAt: "2022-11-29T16:03:56.747Z",
      updatedAt: "2022-11-29T16:03:57.186Z",
      number: 31311,
    },
  ],
  total: 31222,
  totalToday: 175,
};

export const data = [
  {
    _id: "60d3b41abdacab0026a733c8",
    name: "Филе Люминесцентного тетраодонтимформа",
    type: "main",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/meat-03.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
    __v: 0,
    key: "60d3b41abdacab0026a733c8",
  },
  {
    _id: "60d3b41abdacab0026a733c7",
    name: "Флюоресцентная булка R2-D3",
    type: "bun",
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    __v: 0,
    key: "60d3b41abdacab0026a733c7",
  },
];

export const user = {
  email: "@kad.ru",
  name: "Antont",
  password: "asdfae",
};

export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODI1OGU2OWI1MThhMDAxYmI4ODBiMyIsImlhdCI6MTY2OTc0MDIyOSwiZXhwIjoxNjY5NzQxNDI5fQ.fe8_m9IesAkeCXWncfFMuAEKRwCNA83iSy_Nq4ddDNQ";

export const payload = {
  success: true,
  user: {
    email: "@mail.ru",
    name: "Maxim",
    token,
  },
};
