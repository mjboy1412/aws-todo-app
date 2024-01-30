import { dynamodb, TABLE_NAME } from '../config';
import { v4 as uuidv4 } from 'uuid';

const addTodo = async (newTodo: any) => {
  try {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        id: uuidv4(),
        title: newTodo.title,
        desc: newTodo.desc,
      },
    };

    const result = await dynamodb.put(params).promise();
    return result;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export { addTodo };
