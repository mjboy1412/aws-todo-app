import { v4 as uuidv4 } from 'uuid';
import { dynamodb } from '../libs/dynamo';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export interface ITodo {
  title: string;
  desc: string;
  url: string;
}

const todoTableName = 'aws-todo-app';

class TodoService {
  private dbClient: DocumentClient;
  private tableName: string = todoTableName;

  constructor() {
    this.dbClient = dynamodb;
  }

  async getTodo(id: string) {
    const params = {
      TableName: this.tableName,
      Key: {
        id: id,
      },
    };
    try {
      return await this.dbClient.get(params).promise();
    } catch (err: any) {
      console.log('err', err.message);
      throw new Error(`TodoService.getTodo error: ${err.message}`);
    }
  }

  async getAllTodo() {
    try {
      const params = {
        TableName: this.tableName,
      };

      const response = await this.dbClient.scan(params).promise();

      return response;
    } catch (err: any) {
      console.log(err);
      throw new Error(`TodoService.getAllTodo error: ${err.message}`);
    }
  }

  async createTodo(item: ITodo) {
    const params = {
      TableName: this.tableName,
      Item: {
        id: uuidv4(),
        title: item.title,
        desc: item.desc,
        url: item.url,
      },
    };

    try {
      return await this.dbClient.put(params).promise();
    } catch (err: any) {
      console.log(err, params);
      throw new Error(`TodoService.createTodo error: ${err.message}`);
    }
  }

  async updateTodo(id: string, item: ITodo) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          id: id,
        },
        UpdateExpression: 'set #title = :title, #desc = :desc, #url = :url',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#desc': 'desc',
          '#url': 'url',
        },
        ExpressionAttributeValues: {
          ':title': item.title,
          ':desc': item.desc,
          ':url': item.url,
        },
        ReturnValues: 'ALL_NEW',
      };

      const response = await this.dbClient.update(params).promise();

      return response;
    } catch (err: any) {
      throw new Error(`TodoService.updateTodo error: ${err.message}`);
    }
  }

  async deleteTodo(id: string) {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          id: id,
        },
      };

      const response = await this.dbClient.delete(params).promise();

      return response;
    } catch (err: any) {
      throw new Error(`TodoService.getAllTodo error: ${err.message}`);
    }
  }
}

export const todoService = new TodoService();
