const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// =============================================================================
// ⚠️ MOCK DATA STORE (Fallback if MongoDB fails)
// =============================================================================
let MOCK_DATA = {
  hospitals: [
    { _id: '1', name: 'Apollo Hospital', bio: 'Jayanagar, Bangalore • Multi-speciality', rating: 4.8, photo: 'https://images.unsplash.com/photo-1587351021759-3e566b9af9ef?q=80&w=2072&auto=format&fit=crop', user: 'u1' },
    { _id: '2', name: 'Manipal Hospital', bio: 'Whitefield, Bangalore • Premium Care', rating: 4.6, photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop', user: 'u2' },
    { _id: '3', name: 'Fortis Hospital', bio: 'Bannerghatta Road, Bangalore • Heart Care', rating: 4.7, photo: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=80&w=2074&auto=format&fit=crop', user: 'u3' }
  ],
  beds: [],
  ambulances: []
};

// Populate mock beds & ambulances
MOCK_DATA.hospitals.forEach(h => {
  // Add 10 beds each
  for (let i = 1; i <= 10; i++) {
    MOCK_DATA.beds.push({
      _id: `b-${h._id}-${i}`,
      bedNumber: `B-${100 + i}`,
      isAvailable: i > 3, // some booked
      hospital: h._id
    });
  }
  // Add 3 ambulances
  for (let i = 1; i <= 3; i++) {
    MOCK_DATA.ambulances.push({
      _id: `a-${h._id}-${i}`,
      ambulanceNumber: `KA-0${i}-123${i}`,
      isAvailable: true,
      hospital: h._id,
      status: 'available'
    });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.log('⚠️ MongoDB Connection Failed. Using Mock Data Mode.');
    // Override Mongoose models methods to return mock data if DB fails
    // This is a simple hack for demonstration purposes
    global.USE_MOCK_DATA = true;
  });

// =============================================================================
// 🔄 MOCK API ROUTE HANDLERS
// =============================================================================

// Middleware to check mock mode
app.use((req, res, next) => {
  if (global.USE_MOCK_DATA) {
    console.log(`[MOCK] Handling ${req.method} ${req.url}`);

    // /hospitals
    if (req.url === '/hospitals' && req.method === 'GET') {
      return res.json(MOCK_DATA.hospitals);
    }

    // /hospitals/:id
    if (req.url.startsWith('/hospitals/') && req.method === 'GET') {
      const id = req.url.split('/')[2];
      const hospital = MOCK_DATA.hospitals.find(h => h._id === id);
      if (hospital) {
        return res.json({
          hospital,
          beds: MOCK_DATA.beds.filter(b => b.hospital === id),
          ambulances: MOCK_DATA.ambulances.filter(a => a.hospital === id)
        });
      }
    }

    // /beds
    if (req.url === '/beds' && req.method === 'GET') {
      return res.json(MOCK_DATA.beds);
    }
    // /chat mock handler REMOVED to allow real API usage
  }
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/beds', require('./routes/beds'));
app.use('/ambulances', require('./routes/ambulances'));
app.use('/hospitals', require('./routes/hospitals'));
app.use('/bookings', require('./routes/bookings'));
app.use('/ambulance', require('./routes/ambulance-booking.js'));
app.use('/api/chat', require('./routes/chat'));

app.get('/', (req, res) => {
  res.send('Hospital Admin Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
