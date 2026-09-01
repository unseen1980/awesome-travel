import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(__dirname, '../../../Airlines/airlines.json');

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    const airlines = JSON.parse(data);
    
    // Query parameters
    const { country, iata, icao, search } = req.query;
    
    let filtered = airlines;
    
    if (country) {
      filtered = filtered.filter((a: any) => 
        a.country?.toLowerCase().includes((country as string).toLowerCase())
      );
    }
    
    if (iata) {
      filtered = filtered.filter((a: any) => 
        a.iata?.toLowerCase() === (iata as string).toLowerCase()
      );
    }
    
    if (icao) {
      filtered = filtered.filter((a: any) => 
        a.icao?.toLowerCase() === (icao as string).toLowerCase()
      );
    }
    
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter((a: any) => 
        a.name?.toLowerCase().includes(searchLower) ||
        a.alias?.toLowerCase().includes(searchLower)
      );
    }
    
    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

export default router;
