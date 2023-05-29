export const RESPONSE_STATUS = {
  SUCCESS: "OK",
  FAIL: "FAIL",
};
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,ANY,PUT,DELETE",
  "Access-Control-Allow-Credentials": true,
  "Access-Control-Allow-Headers":
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
};
export const RESPONSE_BODY = {
  BAD_REQUEST: {
    statusCode: 400,
    headers,
    body: {
      status: RESPONSE_STATUS.FAIL,
      message: `BadRequest`,
    },
  },
  SUCCESS: {
    statusCode: 200,
    headers,
    body: {
      status: RESPONSE_STATUS.SUCCESS,
    },
  },
  UNAUTHORIZED: {
    statusCode: 401,
    headers,
    body: {
      status: RESPONSE_STATUS.FAIL,
      code: "Unautorized",
    },
  },
  INCORRECT_USERNAME_OR_PASSWORD: {
    statusCode: 400,
    headers,
    body: {
      status: RESPONSE_STATUS.FAIL,
      code: "INCORRECT_USERNAME_OR_PASSWORD",
    },
  },
  FAIL: {
    statusCode: 200,
    headers,
    body: {
      status: RESPONSE_STATUS.FAIL,
    },
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    headers,
    body: {
      status: "FAIL",
      code: `InternalServerError`,
    },
  },
};
