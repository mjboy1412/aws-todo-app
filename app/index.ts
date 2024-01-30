import serverless from 'serverless-http';
import express from 'express';
import { addTodo, getTodos, getTodo, updateTodo, deleteTodo } from './services';

const app = express();
app.use(express.json());

app.get('/todo', async (req, res, next) => {
  try {
    const todos = await getTodos();

    return res.status(200).json({
      data: todos.Items,
    });
  } catch (err) {
    return res.status(500).json({
      data: [],
      message: err,
    });
  }
});

app.get('/todo/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const todo = await getTodo(id);

    return res.status(200).json({
      data: todo.Item,
      message: 'success',
    });
  } catch (err) {
    return res.status(500).json({
      data: {},
      message: err,
    });
  }
});

app.post('/todo', async (req, res) => {
  try {
    const title = req.body.title;
    const desc = req.body.desc;
    const todoAdded = await addTodo({ title: title, desc: desc });
    return res.status(200).json({
      data: todoAdded,
      message: 'todo added successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

app.put('/todo/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const desc = req.body.desc;
    const todoUpdated = await updateTodo(id, title, desc);

    return res.status(200).json({
      data: todoUpdated,
      message: 'todo updated successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

app.delete('/todo/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const todoUpdated = await deleteTodo(id);

    return res.status(200).json({
      data: todoUpdated,
      message: 'todo updated successfully',
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});

app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(404).send();
  }
);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500).send();
  }
);

export const handler = serverless(app);
