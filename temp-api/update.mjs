import { UsersService } from "./service/UsersService.mjs";
import { RESPONSE_BODY } from "./util/response.mjs";
export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const body = JSON.parse(event.body) || {};

  let response;

  const usersService = new UsersService();
  const result = await usersService.update(body);
  try {
    response = { ...RESPONSE_BODY.SUCCESS };
    response.body.data = result;
    response.body = JSON.stringify(response.body);
    return response;
  } catch (error) {
    response = { ...RESPONSE_BODY.FAIL };
    response.body.error = error;
    response.body = JSON.stringify(response.body);
    return response;
  }
};
