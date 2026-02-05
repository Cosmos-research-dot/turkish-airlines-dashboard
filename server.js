const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const { spawn } = require('child_process');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

const PORT = process.env.PORT || 3000;

// MCP Remote Client connection
let mcpProcess = null;
let mcpConnected = false;

// Start MCP Remote Client
function startMCPClient() {
    return new Promise((resolve) => {
        console.log('Starting MCP Remote Client...');
        mcpProcess = spawn('npx', ['-y', 'mcp-remote', 'https://mcp.turkishtechlab.com/mcp'], {
            stdio: 'pipe',
            shell: true
        });

        mcpProcess.stdout.on('data', (data) => {
            console.log(`[MCP] ${data.toString()}`);
            if (data.toString().includes('Connected') || data.toString().includes('Ready')) {
                mcpConnected = true;
                resolve();
            }
        });

        mcpProcess.stderr.on('data', (data) => {
            console.error(`[MCP Error] ${data.toString()}`);
        });

        // Timeout after 5 seconds
        setTimeout(() => resolve(), 5000);
    });
}

// Flight Search
app.post('/api/search-flights', async (req, res) => {
    try {
        const { origin, destination, date, passengers } = req.body;

        // Mock data for now - in production, this would call MCP tools
        const flights = [
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

        res.json({
            success: true,
            origin,
            destination,
            date,
            passengers,
            flights,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Flight Status
app.post('/api/flight-status', async (req, res) => {
    try {
        const { flightNumber, date } = req.body;

        const status = {
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
            operatingAirline: 'Turkish Airlines',
            timestamp: new Date().toISOString()
        };

        res.json({ success: true, ...status });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Booking Details
app.post('/api/booking-details', async (req, res) => {
    try {
        const { pnr, surname } = req.body;

        const booking = {
            pnr,
            passenger: surname,
            bookingStatus: 'CONFIRMED',
            bookingDate: '2026-01-15',
            flights: [
                {
                    number: 'TK123',
                    route: 'IST → LHR',
                    date: '2026-02-15',
                    departure: '09:00',
                    arrival: '13:35',
                    seat: '12A',
                    seatClass: 'Economy',
                    bookingReference: pnr
                }
            ],
            passengers: [{ name: surname, type: 'ADT' }],
            baggage: {
                checkedBags: 2,
                bagWeight: 23,
                unit: 'kg',
                carry: 'Included'
            },
            milesCredited: 3450,
            totalPrice: 245,
            currency: 'USD',
            timestamp: new Date().toISOString()
        };

        res.json({ success: true, ...booking });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Promotions
app.post('/api/promotions', async (req, res) => {
    try {
        const { country } = req.body;

        const promotions = {
            country,
            offers: [
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
                    description: 'Earn double loyalty points this month',
                    validFrom: '2026-02-01',
                    validUntil: '2026-02-14',
                    code: 'DOUBLE2X'
                }
            ],
            timestamp: new Date().toISOString()
        };

        res.json({ success: true, ...promotions });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// City Guide
app.post('/api/city-guide', async (req, res) => {
    try {
        const { city } = req.body;

        const guide = {
            city,
            highlights: [
                { title: 'Major Attractions', description: 'Explore iconic landmarks and historical sites' },
                { title: 'Hotels & Restaurants', description: 'Premium accommodation and dining options' },
                { title: 'Transportation', description: 'Convenient transit options from airport' },
                { title: 'Weather & Season', description: 'Best time to visit and climate information' }
            ],
            flights: 'Multiple daily flights from Istanbul',
            timezone: 'GMT',
            currency: 'GBP',
            visaInfo: 'Check requirements at Turkish Airlines website',
            timestamp: new Date().toISOString()
        };

        res.json({ success: true, ...guide });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'operational',
        mcp: mcpConnected ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString()
    });
});

// Start Server
const server = http.createServer(app);

async function start() {
    try {
        // Try to start MCP client (optional - doesn't block if fails)
        try {
            await startMCPClient();
        } catch (e) {
            console.warn('MCP Client startup warning:', e.message);
        }

        server.listen(PORT, () => {
            console.log(`\n✅ Turkish Airlines Dashboard API Server running on http://localhost:${PORT}`);
            console.log(`📊 Live at: http://localhost:${PORT}`);
            console.log(`🔌 MCP Status: ${mcpConnected ? 'Connected' : 'Running in mock mode'}\n`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    if (mcpProcess) mcpProcess.kill();
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

start();
