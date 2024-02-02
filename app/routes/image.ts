import express from 'express';
import multer from 'multer';

import { imageService } from '../services';
import { todoService } from '../services';
import { validate } from '../libs/validator';
import { imageUploadSchema } from '../schemas/images';

const router = express.Router();

const upload = multer();

router.post('/upload-image', upload.single('image'), async (req, res) => {
  const validattionResult = validate(imageUploadSchema, req.body.id);
  if (!validattionResult.success)
    return res.status(400).json({
      message: validattionResult,
    });

  const todoAttachedWithImage = await todoService.getTodo(
    validattionResult.data
  );
  if (!todoAttachedWithImage.Item?.id)
    return res.status(404).json({
      id: validattionResult.data,
      message: 'todo not found',
    });

  if (!req.file) {
    return res.status(400).json({ message: 'no file is be uploaded' });
  }
  const uploadedImageUrl = await imageService.saveImage(
    req.file.buffer,
    req.file.originalname,
    req.file.mimetype
  );
  await todoService.updateTodo(validattionResult.data, {
    title: todoAttachedWithImage.Item.title,
    desc: todoAttachedWithImage.Item.desc,
    url: uploadedImageUrl,
  });
  return res.status(200).json({
    id: validattionResult.data,
    url: uploadedImageUrl,
    message: 'upload file okay',
  });
});

export default router;
