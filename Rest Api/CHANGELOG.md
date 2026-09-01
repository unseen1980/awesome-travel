# Changelog

All notable changes to the Awesome Travel REST API will be documented in this file.

## [Unreleased] - 2025-11-16

### Contributors
- **ADN Bilişim Teknolojileri** - [www.adnbilisim.com.tr](https://www.adnbilisim.com.tr)

### Added
- **Airlines Endpoint** - Complete REST API for airlines data
  - Filter by country, IATA code, ICAO code
  - Full-text search in airline names and aliases
  - Returns 5,929 airlines from around the world
  
- **Countries Endpoint** - Comprehensive countries data API
  - Filter by region, subregion, currency, language
  - Get country by ISO code (alpha-2 or alpha-3)
  - Full-text search in country names
  - Returns 248 countries with detailed information
  
- **Modern Web Interface** - Professional, clean UI for all endpoints
  - Airports browser with search and filtering
  - Airlines browser with country and status filters
  - Countries browser with region and subregion filters
  - Responsive design with professional color scheme
  - Real-time search and filtering
  - Statistics dashboard for each data type
  
- **API Documentation** - Comprehensive API documentation
  - Detailed endpoint descriptions
  - Request/response examples
  - Data models and schemas
  - Usage examples in multiple languages (JavaScript, Python, cURL)
  
### Changed
- Updated web interface design to professional, minimal style
  - Removed colorful gradients in favor of clean gray palette
  - Improved typography and spacing
  - Better mobile responsiveness
  - Enhanced accessibility

### Technical Details
- TypeScript implementation with Express.js
- Modular route structure
- Query parameter filtering
- Error handling
- Unit tests with Jest

### Data Coverage
- ✈️ **9,000+** Airports worldwide
- 🛫 **5,929** Airlines (including 38 Turkish airlines)
- 🌍 **248** Countries with detailed information

---

## Previous Versions

See git history for changes prior to this version.
