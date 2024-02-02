import express from 'express';

import { todoService } from '../services';
import {
  todoCreateSchema,
  todoGetSchema,
  todoUpdateSchema,
  todoDeleteSchema,
} from '../schemas';
import { validate } from '../libs/validator';

const router = express.Router();

router.get('/todo', async (_req, res) => {
  try {
    const todos = await todoService.getAllTodo();
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

router.get('/todo/:id', async (req, res) => {
  const validattionResult = validate(todoGetSchema, req.params);
  if (!validattionResult.success) {
    return res.status(400).json({
      message: validattionResult,
    });
  }
  const todo = await todoService.getTodo(validattionResult.data.id);

  if (!todo.Item?.id)
    return res.status(404).json({
      id: validattionResult.data.id,
      message: 'todo not found',
    });

  return res.status(200).json({
    data: todo,
    message: 'todo found',
  });
});

router.post('/todo', async (req, res) => {
  const validattionResult = validate(todoCreateSchema, req.body);
  if (!validattionResult.success) {
    return res.status(400).json({
      message: validattionResult,
    });
  }

  await todoService.createTodo(validattionResult.data);

  return res.status(200).json({
    data: validattionResult.data,
    message: 'todo added successfully',
  });
});

router.put('/todo/:id', async (req, res) => {
  const paramsValidattionResult = validate(todoGetSchema, req.params);
  const bodyValidattionResult = validate(todoUpdateSchema, req.body);
  if (!bodyValidattionResult.success) {
    return res.status(400).json({
      message: bodyValidattionResult,
    });
  }
  if (!paramsValidattionResult.success) {
    return res.status(400).json({
      message: paramsValidattionResult,
    });
  }

  const todoToBeUpdated = await todoService.getTodo(
    paramsValidattionResult.data.id
  );

  if (!todoToBeUpdated.Item?.id) {
    return res.status(404).json({
      id: paramsValidattionResult.data.id,
      message: 'todo not found',
    });
  }

  const todoUpdated = await todoService.updateTodo(
    paramsValidattionResult.data.id,
    bodyValidattionResult.data
  );

  return res.status(200).json({
    data: todoUpdated,
    message: 'todo updated successfully',
  });
});

router.delete('/todo/:id', async (req, res) => {
  const validattionResult = validate(todoDeleteSchema, req.params);
  if (!validattionResult.success) {
    return res.status(400).json({
      message: validattionResult,
    });
  }

  const todoToBeDeleted = await todoService.getTodo(validattionResult.data.id);
  if (!todoToBeDeleted.Item?.id) {
    return res.status(404).json({
      id: validattionResult.data.id,
      message: 'todo not found',
    });
  }

  const todoDeleted = await todoService.deleteTodo(validattionResult.data.id);
  return res.status(200).json({
    data: todoDeleted,
    message: 'todo updated successfully',
  });
});

export default router;
