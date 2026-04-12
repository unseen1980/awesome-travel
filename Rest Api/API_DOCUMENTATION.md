# Awesome Travel REST API Documentation

A comprehensive REST API providing access to global aviation and travel data including airports, airlines, and countries.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### 🛫 Airports

#### Get All Airports
```http
GET /api/airports
```

**Response:**
```json
{
  "IST": {
    "type": "large_airport",
    "name": "Istanbul Airport",
    "latitude_deg": 41.275278,
    "longitude_deg": 28.751944,
    "elevation_ft": 325,
    "continent": "EU",
    "municipality": "Istanbul",
    "iata_code": "IST"
  },
  ...
}
```

**Response Format:** Object with IATA codes as keys

---

### ✈️ Airlines

#### Get All Airlines
```http
GET /api/airlines
```

**Query Parameters:**
- `country` (string) - Filter by country name
- `iata` (string) - Filter by IATA code
- `icao` (string) - Filter by ICAO code
- `search` (string) - Search in name and alias

**Examples:**
```http
GET /api/airlines?country=Turkey
GET /api/airlines?iata=TK
GET /api/airlines?search=Turkish
```

**Response:**
```json
[
  {
    "name": "Turkish Airlines",
    "alias": null,
    "iata": "TK",
    "icao": "THY",
    "callsign": "TURKAIR",
    "country": "Turkey",
    "is_active": true
  },
  ...
]
```

**Response Format:** Array of airline objects

---

### 🌍 Countries

#### Get All Countries
```http
GET /api/countries
```

**Query Parameters:**
- `region` (string) - Filter by region (e.g., "Europe", "Asia")
- `subregion` (string) - Filter by subregion
- `currency` (string) - Filter by currency code
- `language` (string) - Filter by language
- `search` (string) - Search in country names and codes

**Examples:**
```http
GET /api/countries?region=Europe
GET /api/countries?currency=EUR
GET /api/countries?search=Turkey
```

**Response:**
```json
[
  {
    "name": {
      "common": "Turkey",
      "official": "Republic of Turkey",
      "native": {...}
    },
    "tld": [".tr"],
    "cca2": "TR",
    "cca3": "TUR",
    "currency": ["TRY"],
    "callingCode": ["90"],
    "capital": "Ankara",
    "region": "Asia",
    "subregion": "Western Asia",
    "languages": {
      "tur": "Turkish"
    },
    "population": 84339067,
    "area": 783562,
    ...
  },
  ...
]
```

#### Get Country by Code
```http
GET /api/countries/:code
```

**Parameters:**
- `code` - ISO 3166-1 alpha-2 (TR) or alpha-3 (TUR) country code

**Examples:**
```http
GET /api/countries/TR
GET /api/countries/TUR
```

**Response:** Single country object (same format as above)

**Error Response (404):**
```json
{
  "error": "Country not found"
}
```

---

## Data Models

### Airport
```typescript
{
  type: string;              // "large_airport", "medium_airport", "small_airport"
  name: string;              // Airport name
  latitude_deg: number;      // Latitude coordinate
  longitude_deg: number;     // Longitude coordinate
  elevation_ft: number;      // Elevation in feet
  continent: string;         // Two-letter continent code
  municipality: string;      // City/municipality
  iata_code: string;         // IATA code (3 letters)
}
```

### Airline
```typescript
{
  name: string;              // Airline name
  alias: string | null;      // Alternative name
  iata: string | null;       // IATA code (2 letters)
  icao: string | null;       // ICAO code (3 letters)
  callsign: string | null;   // Radio callsign
  country: string;           // Country name
  is_active: boolean;        // Operating status
}
```

### Country
```typescript
{
  name: {
    common: string;          // Common name
    official: string;        // Official name
    native: object;          // Native language names
  };
  tld: string[];             // Top-level domains
  cca2: string;              // ISO 3166-1 alpha-2 code
  cca3: string;              // ISO 3166-1 alpha-3 code
  currency: string[];        // Currency codes
  callingCode: string[];     // Phone calling codes
  capital: string;           // Capital city
  region: string;            // Geographic region
  subregion: string;         // Geographic subregion
  languages: object;         // Spoken languages
  population: number;        // Population count
  area: number;              // Area in km²
  borders: string[];         // Bordering countries (codes)
  ...
}
```

---

## Response Codes

| Code | Description |
|------|-------------|
| 200  | Success |
| 304  | Not Modified (cached) |
| 404  | Resource not found |
| 500  | Internal server error |

---

## CORS

Currently, CORS is not configured. For production use, add CORS middleware:

```typescript
import cors from 'cors';
app.use(cors());
```

---

## Rate Limiting

No rate limiting is currently implemented. For production use, consider adding rate limiting:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Examples

### JavaScript (Fetch)
```javascript
// Get all airports
const airports = await fetch('http://localhost:3000/api/airports')
  .then(res => res.json());

// Search airlines
const turkishAirlines = await fetch('http://localhost:3000/api/airlines?country=Turkey')
  .then(res => res.json());

// Get country by code
const turkey = await fetch('http://localhost:3000/api/countries/TR')
  .then(res => res.json());
```

### cURL
```bash
# Get all airports
curl http://localhost:3000/api/airports

# Filter airlines by country
curl "http://localhost:3000/api/airlines?country=Turkey"

# Search countries
curl "http://localhost:3000/api/countries?search=Turkey"

# Get specific country
curl http://localhost:3000/api/countries/TR
```

### Python
```python
import requests

# Get all airlines
response = requests.get('http://localhost:3000/api/airlines')
airlines = response.json()

# Filter by country
response = requests.get('http://localhost:3000/api/airlines', 
                       params={'country': 'Turkey'})
turkish_airlines = response.json()

# Get country
response = requests.get('http://localhost:3000/api/countries/TR')
turkey = response.json()
```

---

## Web Interface

The API includes a modern web interface for browsing data:

- **Airports:** http://localhost:3000/
- **Airlines:** http://localhost:3000/airlines.html
- **Countries:** http://localhost:3000/countries.html

---

## Development

### Installation
```bash
cd "Rest Api"
npm install
```

### Run Development Server
```bash
npm start
```

### Run Tests
```bash
npm test
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## Contributors

This REST API and web interface was developed by:

**ADN Bilişim Teknolojileri**  
🌐 [www.adnbilisim.com.tr](https://www.adnbilisim.com.tr)

---

## License

MIT License - see LICENSE file for details
