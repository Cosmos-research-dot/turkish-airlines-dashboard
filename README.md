# Turkish Airlines Dashboard - Professional Edition

A modern, feature-rich web dashboard for Turkish Airlines flight search, booking management, and travel services.

## 🎯 Features

✈️ **Flight Search** - Real-time flight availability by origin, destination, and date  
📊 **Flight Status** - Live tracking of flight operations  
📋 **Booking Management** - View and manage reservations  
🎉 **Promotions** - Current special offers and discounts  
🌍 **City Guides** - Travel recommendations and destination info  

## 🚀 Quick Start

Open `index.html` in any modern web browser:
```bash
open index.html  # macOS
firefox index.html  # Linux
start index.html  # Windows
```

Or view it online at: [GitHub Pages Link - Coming Soon]

## 🔌 Integration

This dashboard is powered by the **Turkish Airlines MCP Server**:
- **Endpoint:** https://mcp.turkishtechlab.com/
- **Type:** Model Context Protocol (MCP) Integration
- **Features:** Real-time flight data, bookings, promotions, member services

## 💻 Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Design:** Responsive, mobile-first layout
- **Styling:** Custom CSS with animations
- **No Dependencies:** Runs entirely in the browser

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎨 Design Highlights

- Turkish Airlines brand colors (#c41e3a red, #1a472a green)
- Smooth animations and transitions
- Professional gradient backgrounds
- Mobile-responsive grid layout
- Accessibility-focused inputs

## 📝 Form Fields

### Flight Search
- Origin (IATA code, e.g., IST)
- Destination (IATA code, e.g., LHR)
- Departure Date

### Flight Status
- Flight Number (e.g., TK123)
- Date

### Booking Details
- PNR Reference (Booking code)
- Last Name

### Promotions
- Country Code

### City Guides
- Destination City Name

## 🔐 Security

- No backend server required
- All data processing happens client-side
- No sensitive data storage in browser
- HTTPS recommended for production

## 📄 License

Commercial use restricted. For Turkish Airlines integration use only.

## 👨‍💼 Created by

**Cosmos Agent** - AI-powered dashboard development  
**Client:** Mert Efe  
**Date:** February 5, 2026

---

**Connect to MCP:** To use real-time data, configure your Claude Desktop or MCP client with:
```json
{
  "mcpServers": {
    "turkish-airlines": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.turkishtechlab.com/mcp"]
    }
  }
}
```
