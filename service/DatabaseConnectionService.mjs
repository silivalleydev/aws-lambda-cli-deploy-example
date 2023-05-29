import AWS from "aws-sdk";
const DynamoDB = new AWS.DynamoDB();

export class DatabaseConnectionService {
  constructor(tableName) {
    this.tableName = tableName;
  }

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
   * KeyConditionExpression example: "id = :id"
   * FilterExpression: 'category = :category AND price > :price',
   * FilterExpression
   */
  async find(data = {}, FilterExpression = "", ExpressionAttributeNames = {}) {
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
    console.log("params???", params);

    return await DynamoDB.scan(params).promise();
  }
}
