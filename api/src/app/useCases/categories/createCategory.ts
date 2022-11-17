import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function createCategory(req: Request,res: Response) {
  try {
    const { icon, name } = req.body;

    if (!name) {
      res.send(400).json('Name is required');
    }

    if (!icon) {
      res.send(400).json('icon is required');
    }

    const category = await Category.create({ icon,name });

    res.status(201).json(category);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
