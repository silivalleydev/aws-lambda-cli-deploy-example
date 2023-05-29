import AWS from "aws-sdk";
const DynamoDB = new AWS.DynamoDB();

export class DatabaseConnectionService {
  constructor(tableName) {
    this.tableName = tableName;
  }
  /**
   * {
   *    id: { S: "sdc" },
    name: { S: "steve" },
  }
   */
  async add(data = {}) {
    const params = {
      TableName: this.tableName,
      Item: data,
    };

    return await DynamoDB.putItem(params).promise();
  }
  async findOne(data = {}) {
    const params = {
      TableName: this.tableName,
      Key: data,
    };

    return await DynamoDB.getItem(params).promise();
  }

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
  async find(body = {}) {
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

    const params = {
      TableName: this.tableName,
      FilterExpression,
      ExpressionAttributeNames,
      ExpressionAttributeValues: data,
    };

    if (!FilterExpression) {
      delete params["FilterExpression"];
    }
    if (Object.keys(ExpressionAttributeNames).length === 0) {
      delete params["ExpressionAttributeNames"];
    }

    if (Object.keys(data).length === 0) {
      delete params["ExpressionAttributeValues"];
    }

    return await DynamoDB.scan(params).promise();
  }

  /**
     * body ex:
   * {
   "data":{ 
       "name": {
            "S": "jack"
        }
    },
    "target":{
        "id": {
            "S": "sdc"
        }
    }
}
   */
  async update(body = {}) {
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
    let UpdateExpression;
    let ExpressionAttributeNames;

    /**
     * ex:
     * {
        "#name": "name",
      }
     */
    let Key;

    if (
      Object.keys(body.target).length > 0 &&
      Object.keys(body.data).length > 0
    ) {
      data = {};
      UpdateExpression = "";
      ExpressionAttributeNames = {};
      Key = {};

      Object.keys(body.target).forEach((key) => {
        Key[`${key}`] = body.target[key];
      });
      Object.keys(body.data).forEach((key) => {
        UpdateExpression += `SET #${key} = :value`;
        ExpressionAttributeNames[`#${key}`] = key;
        data[`:value`] = body.data[key];
      });
    }

    console.log("data", data);
    console.log("UpdateExpression", UpdateExpression);
    console.log("Key", Key);
    const params = {
      TableName: this.tableName,
      Key,
      UpdateExpression,
      ExpressionAttributeValues: data,
      ExpressionAttributeNames,
    };

    return await DynamoDB.updateItem(params).promise();
  }

  /**
   *
   * TODO: delete 서비스 구현할것
   */
  async delete(data = {}) {
    const params = {
      TableName: this.tableName,
      Key: data,
    };

    return await DynamoDB.getItem(params).promise();
  }
}
