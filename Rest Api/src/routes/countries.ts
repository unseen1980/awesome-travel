import { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(__dirname, '../../../Countries/countries.json');

router.get('/', async (req, res, next) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    const countries = JSON.parse(data);
    
    // Query parameters
    const { region, subregion, currency, language, search } = req.query;
    
    let filtered = countries;
    
    if (region) {
      filtered = filtered.filter((c: any) => 
        c.region?.toLowerCase() === (region as string).toLowerCase()
      );
    }
    
    if (subregion) {
      filtered = filtered.filter((c: any) => 
        c.subregion?.toLowerCase().includes((subregion as string).toLowerCase())
      );
    }
    
    if (currency) {
      filtered = filtered.filter((c: any) => 
        c.currency?.some((cur: string) => 
          cur.toLowerCase() === (currency as string).toLowerCase()
        )
      );
    }
    
    if (language) {
      filtered = filtered.filter((c: any) => 
        c.languages && Object.values(c.languages).some((lang: any) => 
          lang.toLowerCase().includes((language as string).toLowerCase())
        )
      );
    }
    
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter((c: any) => 
        c.name?.common?.toLowerCase().includes(searchLower) ||
        c.name?.official?.toLowerCase().includes(searchLower) ||
        c.cca2?.toLowerCase().includes(searchLower) ||
        c.cca3?.toLowerCase().includes(searchLower)
      );
    }
    
    res.json(filtered);
  } catch (err) {
    next(err);
  }
});

// Get country by code
router.get('/:code', async (req, res, next) => {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    const countries = JSON.parse(data);
    const code = req.params.code.toUpperCase();
    
    const country = countries.find((c: any) => 
      c.cca2 === code || c.cca3 === code
    );
    
    if (!country) {
      return res.status(404).json({ error: 'Country not found' });
    }
    
    res.json(country);
  } catch (err) {
    next(err);
  }
});

export default router;
