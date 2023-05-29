import { DatabaseConnectionService } from "./DatabaseConnectionService.mjs";

export class UsersService {
  constructor() {
    this.connection = new DatabaseConnectionService("users");
  }

  /**
   * {
   *    id: { S: "sdc" },
    name: { S: "steve" },
  }
   */
  async add(data) {
    return await this.connection.add(data);
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
    return await this.connection.find(body);
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
    return await this.connection.update(body);
  }
}
