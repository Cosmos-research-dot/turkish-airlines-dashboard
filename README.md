# Turkish Airlines Dashboard - Live MCP Integration

A professional, feature-rich web dashboard for Turkish Airlines flight search, booking management, and travel services with real-time MCP integration.

## 🎯 Features

✈️ **Flight Search** - Real-time flight availability by origin, destination, and date  
📊 **Flight Status** - Live tracking of flight operations  
📋 **Booking Management** - View and manage reservations  
🎉 **Promotions** - Current special offers and discounts  
🌍 **City Guides** - Travel recommendations and destination info  

## 🚀 Quick Start

### Option 1: Static HTML (GitHub Pages)
Open `index.html` in any browser. Uses mock data for demonstration.

**Live URL:** https://cosmos-research-dot.github.io/turkish-airlines-dashboard/

### Option 2: With Live MCP Integration (Local Server)

**Requirements:**
- Node.js 14+
- npm

**Setup:**
```bash
# Install dependencies
npm install

# Start the server
npm start
```

Server runs on `http://localhost:3000`

## 🔌 MCP Integration

This dashboard connects to the **Turkish Airlines MCP Server** for real-time data:

- **MCP Server:** https://mcp.turkishtechlab.com/
- **Protocol:** Model Context Protocol (MCP)
- **Features:** Real-time flight search, status, bookings, promotions, city guides

### How It Works

1. **Dashboard (Frontend)** - `index.html`
   - Responsive UI for flight searches and booking queries
   - Communicates with backend via REST API

2. **API Server (Backend)** - `server.js`
   - Express.js backend
   - Proxies requests to Turkish Airlines MCP Server
   - Falls back to mock data if MCP unavailable
   - RESTful endpoints for frontend

3. **MCP Server (External)**
   - Turkish Airlines MCP integration
   - Returns real live data for flights, bookings, status
   - Requires authentication for member services

### API Endpoints

```
POST /api/search-flights
  { origin, destination, date, passengers }

POST /api/flight-status
  { flightNumber, date }

POST /api/booking-details
  { pnr, surname }

POST /api/promotions
  { country }

POST /api/city-guide
  { city }

GET /api/health
  Check server and MCP connection status
```

## 💻 Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Node.js + Express.js
- **MCP Client:** Direct HTTP integration to Turkish Airlines MCP
- **Hosting:** GitHub Pages (static) + Local Node Server (with MCP)
- **No external dependencies:** Pure vanilla JavaScript on frontend

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Design

- Turkish Airlines brand colors (#c41e3a red, #1a472a green)
- Professional gradient backgrounds
- Smooth animations and transitions
- Fully responsive mobile-first layout
- Real-time API status indicators

## 🔐 Security

- No sensitive data stored client-side
- Secure MCP token handling (if configured)
- CORS enabled for development
- Environment variables for sensitive config (recommended for production)

## 📝 Configuration

### Production Deployment

For production use with real MCP data:

1. Set environment variables:
```bash
PORT=3000
MCP_SERVER=https://mcp.turkishtechlab.com
MCP_TOKEN=your_token_here (if required)
```

2. Deploy Node server to your hosting platform
3. Update frontend API_BASE to point to your server

## 📚 Files

- `index.html` - Frontend UI
- `server.js` - Express.js backend with MCP integration
- `package.json` - Node.js dependencies
- `README.md` - This file

## 🚀 Deployment Options

### GitHub Pages (Static)
```bash
git push origin main
# Automatically hosted at: https://cosmos-research-dot.github.io/turkish-airlines-dashboard/
```

### Heroku (With MCP)
```bash
heroku create
git push heroku main
```

### Local Development
```bash
npm install
npm start
# Open http://localhost:3000
```

## 🔄 How MCP Integration Works

```
User Input (Dashboard)
    ↓
JavaScript API Call
    ↓
Express Backend (/api/*)
    ↓
MCP Server Integration
    ↓
Turkish Airlines Live Data
    ↓
JSON Response
    ↓
Display in Dashboard
```

## 📊 Status Indicators

- 🟢 **LIVE** - Connected to real MCP server
- 🟡 **MOCK MODE** - Using fallback data
- 🔴 **ERROR** - Connection failed

## 🛠️ Development

To modify the dashboard:

1. Edit `index.html` for UI changes
2. Edit `server.js` for API/MCP integration changes
3. Test locally: `npm start`
4. Commit and push to GitHub for automatic deployment

## 📞 Support

For MCP integration issues, visit: https://mcp.turkishtechlab.com/

## 📄 License

Commercial use restricted. For Turkish Airlines integration use only.

## 👨‍💼 Created by

**Cosmos Agent** - AI-powered dashboard development  
**Client:** Mert Efe  
**Date:** February 5, 2026

---

**Version:** 1.0.0 with Live MCP Integration  
**Last Updated:** February 5, 2026
