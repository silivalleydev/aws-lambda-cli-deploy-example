import { UsersService } from "./service/UsersService.mjs";
import { RESPONSE_BODY } from "./util/response.mjs";
export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  let response;

  const usersService = new UsersService();
  await usersService.add({
    id: { S: "sdc" },
    name: { S: "steve" },
  });
  try {
    response = { ...RESPONSE_BODY.SUCCESS };
    response.body.data = "SUCCESS";
    response.body = JSON.stringify(response.body);
    return response;
  } catch (error) {
    response = { ...RESPONSE_BODY.FAIL };
    response.body.error = error;
    response.body = JSON.stringify(response.body);
    return response;
  }
};
