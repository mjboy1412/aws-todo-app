import { dynamodb, TABLE_NAME } from '../config';

const deleteTodo = async (id: string) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id: id,
      },
    };

    const result = await dynamodb.delete(params).promise();

    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export { deleteTodo };
