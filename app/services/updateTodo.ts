import { dynamodb, TABLE_NAME } from '../config';

const updateTodo = async (id: string, title: string, desc: string) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: id,
      },
      UpdateExpression: 'set #title = :title, #desc = :desc',
      ExpressionAttributeNames: {
        '#title': 'title',
        '#desc': 'desc',
      },
      ExpressionAttributeValues: {
        ':title': title,
        ':desc': desc,
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await dynamodb.update(params).promise();

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export { updateTodo };
