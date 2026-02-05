const express = require('express');
const cors = require('cors');
const http = require('http');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;
const MCP_SERVER = 'https://mcp.turkishtechlab.com';

let mcpToken = null;
let authenticated = false;

// Initialize MCP connection
async function initMCP() {
    try {
        console.log('🔌 Connecting to Turkish Airlines MCP Server...');
        // Try to get initial connection info
        const response = await axios.get(`${MCP_SERVER}/health`, {
            timeout: 5000
        });
        console.log('✅ MCP Server is available');
        return true;
    } catch (error) {
        console.warn('⚠️ MCP Server connection warning:', error.message);
        console.log('📝 Running in fallback mode with enhanced mock data');
        return false;
    }
}

// Call MCP Server
async function callMCPServer(endpoint, method = 'GET', data = null) {
    try {
        const config = {
            method,
            url: `${MCP_SERVER}${endpoint}`,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        if (data) {
            config.data = data;
        }

        if (mcpToken) {
            config.headers['Authorization'] = `Bearer ${mcpToken}`;
        }

        const response = await axios(config);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`MCP Error calling ${endpoint}:`, error.message);
        return { success: false, error: error.message };
    }
}

// Flight Search - Real MCP Integration
app.post('/api/search-flights', async (req, res) => {
    try {
        const { origin, destination, date, passengers } = req.body;

        // Try real MCP call first
        const mcpResult = await callMCPServer('/api/search-flights', 'POST', {
            origin,
            destination,
            departureDate: date,
            passengers: passengers || 1
        });

        if (mcpResult.success && mcpResult.data) {
            return res.json({
                success: true,
                origin,
                destination,
                date,
                passengers,
                flights: mcpResult.data.flights || generateMockFlights(),
                source: 'LIVE_MCP',
                timestamp: new Date().toISOString()
            });
        }

        // Fallback to enhanced mock data
        res.json({
            success: true,
            origin,
            destination,
            date,
            passengers,
            flights: generateMockFlights(),
            source: 'MOCK_DATA',
            note: 'Real MCP data unavailable - showing realistic sample flights',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Flight Status - Real MCP Integration
app.post('/api/flight-status', async (req, res) => {
    try {
        const { flightNumber, date } = req.body;

        // Try real MCP call
        const mcpResult = await callMCPServer('/api/flight-status', 'POST', {
            flightNumber,
            date
        });

        if (mcpResult.success && mcpResult.data) {
            return res.json({
                success: true,
                ...mcpResult.data,
                source: 'LIVE_MCP',
                timestamp: new Date().toISOString()
            });
        }

        // Fallback
        res.json({
            success: true,
            flight: flightNumber,
            date: date,
            status: 'ON TIME',
            departure: {
                airport: 'IST',
                city: 'Istanbul',
                scheduled: '09:00',
                actual: '09:05',
                gate: 'B12'
            },
            arrival: {
                airport: 'LHR',
                city: 'London',
                scheduled: '13:35',
                estimated: '13:40',
                gate: 'A5'
            },
            aircraft: 'Boeing 777-300ER',
            source: 'MOCK_DATA',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Booking Details - Real MCP Integration
app.post('/api/booking-details', async (req, res) => {
    try {
        const { pnr, surname } = req.body;

        // Try real MCP call
        const mcpResult = await callMCPServer('/api/booking-details', 'POST', {
            pnr,
            surname
        });

        if (mcpResult.success && mcpResult.data) {
            return res.json({
                success: true,
                ...mcpResult.data,
                source: 'LIVE_MCP',
                timestamp: new Date().toISOString()
            });
        }

        // Fallback
        res.json({
            success: true,
            pnr,
            passenger: surname,
            bookingStatus: 'CONFIRMED',
            bookingDate: '2026-01-15',
            flights: [{
                number: 'TK123',
                route: 'IST → LHR',
                date: '2026-02-15',
                departure: '09:00',
                arrival: '13:35',
                seat: '12A',
                seatClass: 'Economy'
            }],
            baggage: {
                checkedBags: 2,
                bagWeight: 23,
                unit: 'kg'
            },
            milesCredited: 3450,
            totalPrice: 245,
            currency: 'USD',
            source: 'MOCK_DATA',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Promotions - Real MCP Integration
app.post('/api/promotions', async (req, res) => {
    try {
        const { country } = req.body;

        // Try real MCP call
        const mcpResult = await callMCPServer('/api/promotions', 'POST', { country });

        if (mcpResult.success && mcpResult.data) {
            return res.json({
                success: true,
                country,
                offers: mcpResult.data.offers || generateMockPromotions(),
                source: 'LIVE_MCP',
                timestamp: new Date().toISOString()
            });
        }

        // Fallback
        res.json({
            success: true,
            country,
            offers: generateMockPromotions(),
            source: 'MOCK_DATA',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// City Guide - Real MCP Integration
app.post('/api/city-guide', async (req, res) => {
    try {
        const { city } = req.body;

        // Try real MCP call
        const mcpResult = await callMCPServer('/api/city-guide', 'POST', { city });

        if (mcpResult.success && mcpResult.data) {
            return res.json({
                success: true,
                ...mcpResult.data,
                source: 'LIVE_MCP',
                timestamp: new Date().toISOString()
            });
        }

        // Fallback
        res.json({
            success: true,
            city,
            highlights: generateCityGuide(city),
            flights: 'Multiple daily flights from Istanbul',
            timezone: 'GMT',
            currency: 'GBP',
            source: 'MOCK_DATA',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health Check
app.get('/api/health', async (req, res) => {
    const mcpStatus = await callMCPServer('/');
    res.json({
        status: 'operational',
        mcp: mcpStatus.success ? 'connected' : 'fallback_mode',
        mcpServer: MCP_SERVER,
        timestamp: new Date().toISOString()
    });
});

// Helper Functions
function generateMockFlights() {
    return [
        {
            id: 'TK123',
            number: 'TK123',
            departure: '09:00',
            arrival: '13:35',
            duration: '4h 35m',
            price: 245,
            currency: 'USD',
            airline: 'Turkish Airlines',
            aircraft: 'Boeing 777-300ER',
            seats: 234,
            class: 'Economy'
        },
        {
            id: 'TK125',
            number: 'TK125',
            departure: '14:00',
            arrival: '18:15',
            duration: '4h 15m',
            price: 198,
            currency: 'USD',
            airline: 'Turkish Airlines',
            aircraft: 'Boeing 787-9',
            seats: 156,
            class: 'Economy'
        },
        {
            id: 'TK127',
            number: 'TK127',
            departure: '19:30',
            arrival: '23:45',
            duration: '4h 15m',
            price: 189,
            currency: 'USD',
            airline: 'Turkish Airlines',
            aircraft: 'Airbus A350',
            seats: 312,
            class: 'Economy'
        }
    ];
}

function generateMockPromotions() {
    return [
        {
            id: 1,
            name: 'Spring Sale',
            discount: '25% OFF',
            description: 'Get 25% discount on selected routes',
            validFrom: '2026-02-01',
            validUntil: '2026-03-31',
            code: 'SPRING25'
        },
        {
            id: 2,
            name: 'Miles Multiplier',
            bonus: '3x miles',
            description: 'Earn 3x Miles&Smiles on all bookings',
            validFrom: '2026-02-01',
            validUntil: '2026-02-28',
            code: 'MILES3X'
        },
        {
            id: 3,
            name: 'Double Loyalty Points',
            bonus: '2x points',
            description: 'Earn double loyalty points',
            validFrom: '2026-02-01',
            validUntil: '2026-02-14',
            code: 'DOUBLE2X'
        }
    ];
}

function generateCityGuide(city) {
    const guides = {
        london: [
            'Big Ben & Parliament',
            'Tower of London',
            'British Museum',
            'London Eye',
            'Shopping on Oxford Street'
        ],
        paris: [
            'Eiffel Tower',
            'Louvre Museum',
            'Notre-Dame Cathedral',
            'Arc de Triomphe',
            'Champs-Élysées'
        ],
        istanbul: [
            'Blue Mosque',
            'Hagia Sophia',
            'Topkapi Palace',
            'Grand Bazaar',
            'Bosphorus Cruise'
        ]
    };

    const cityLower = city.toLowerCase();
    return guides[cityLower] || [
        'Major attractions and landmarks',
        'Recommended hotels and restaurants',
        'Local transportation guide',
        'Weather and best season to visit'
    ];
}

// Start Server
const server = http.createServer(app);

async function start() {
    try {
        await initMCP();

        server.listen(PORT, () => {
            console.log(`\n✅ Turkish Airlines Dashboard API Server running`);
            console.log(`📊 Live at: http://localhost:${PORT}`);
            console.log(`🔌 MCP Server: ${MCP_SERVER}\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

start();
