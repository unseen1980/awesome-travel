import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(__dirname, '../data/airports_by_IATA.json');

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    next(err);
  }
});

export default router;
