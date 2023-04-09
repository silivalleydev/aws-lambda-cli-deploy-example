import { sayHello, sayWorld } from "./sample.mjs";
import moment from "moment/moment.js";
import SampleClass from "./service/SampleClass.mjs";
import { getNewID } from "./util/util.mjs";
export const handler = async (event) => {
  const sample = new SampleClass();
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      moment().format("YYYY-MM-DD") +
        sayHello() +
        sayWorld() +
        sample.whatIsThis() +
        getNewID()
    ),
  };
  return response;
};
