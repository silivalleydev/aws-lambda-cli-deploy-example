import { UsersService } from "./service/UsersService.mjs";
import { RESPONSE_BODY } from "./util/response.mjs";
export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  /**
   * event body ex:
   * {
    "name": {
        "S": "jack",
        "logical": "AND"
    },
    "id": {
        "S": "sdc",
        "logical": "AND"
    }
}
   */
  const body = JSON.parse(event.body) || {};

  console.log("body???", body);

  /**
   * ex: 
   * {
      ":name": { S: "steve" },
    }
   */
  let data;

  /**
   * event.body에 있는 각 필드당 있는 logical이라는 키에 AND OR 값이 오고 논리연산 의미
   */
  /**
   * ex: "#name = :name",
   */
  let FilterExpression;

  /**
   * ex:
   * {
      "#name": "name",
    }
   */
  let ExpressionAttributeNames;

  if (Object.keys(body).length > 0) {
    data = {};
    FilterExpression = "";
    ExpressionAttributeNames = {};

    Object.keys(body).forEach((key) => {
      if (FilterExpression.length === 0) {
        FilterExpression += `#${key} = :${key}`;
      } else {
        FilterExpression += ` ${body[key].logical} #${key} = :${key}`;
      }

      delete body[key]["logical"];

      data[`:${key}`] = body[key];
      ExpressionAttributeNames[`#${key}`] = key;
    });
  }

  console.log("data", data);
  console.log("FilterExpression", FilterExpression);
  console.log("ExpressionAttributeNames", ExpressionAttributeNames);

  let response;

  const usersService = new UsersService();
  const result = await usersService.find(
    data,
    FilterExpression,
    ExpressionAttributeNames
  );
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
