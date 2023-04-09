import { sayHello, sayWorld } from "./sample.mjs";

export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(sayHello() + sayWorld()),
  };
  return response;
};
