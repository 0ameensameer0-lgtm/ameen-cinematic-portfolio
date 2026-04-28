const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/portfolio', (req, res) => {
  const portfolioData = require('./src/data/portfolio.json');
  res.json(portfolioData);
});

app.get('/api/skills', (req, res) => {
  const skillsData = require('./src/data/skills.json');
  res.json(skillsData);
});

app.get('/api/services', (req, res) => {
  const servicesData = require('./src/data/services.json');
  res.json(servicesData);
});

app.get('/api/certificates', (req, res) => {
  const certificatesData = require('./src/data/certificates.json');
  res.json(certificatesData);
});

// Contact form handler
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Here you would normally send an email or save to database
  console.log('Contact form submitted:', { name, email, message });
  
  res.json({ 
    success: true, 
    message: 'Message received successfully!' 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Portfolio website running at http://localhost:${PORT}`);
  console.log(`📱 Open your browser and navigate to http://localhost:${PORT}`);
  console.log(`⏹️  Press Ctrl+C to stop the server`);
});
