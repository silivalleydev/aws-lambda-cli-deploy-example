import { DatabaseConnectionService } from "./DatabaseConnectionService.mjs";

export class UsersService {
  constructor() {
    this.connection = new DatabaseConnectionService("users");
  }

  async add(data) {
    return await this.connection.add(data);
  }

  async find(data, FilterExpression, ExpressionAttributeNames) {
    return await this.connection.find(
      data,
      FilterExpression,
      ExpressionAttributeNames
    );
  }
}
