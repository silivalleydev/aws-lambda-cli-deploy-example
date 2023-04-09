import { sayHello, sayWorld } from "./sample.mjs";
import moment from "moment/moment.js";
export const handler = async (event) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      moment().format("YYYY-MM-DD") + sayHello() + sayWorld()
    ),
  };
  return response;
};
