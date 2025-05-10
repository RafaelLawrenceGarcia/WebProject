const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Handle all routes by serving index.html
app.get('*', (req, res) => {
  // Extract the path from the URL
  const requestPath = req.path;
  
  // Map paths to specific HTML files
  if (requestPath === '/') {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else if (requestPath === '/products') {
    res.sendFile(path.join(__dirname, 'products.html'));
  } else if (requestPath.startsWith('/product/')) {
    res.sendFile(path.join(__dirname, 'product-details.html'));
  } else if (requestPath === '/categories') {
    res.sendFile(path.join(__dirname, 'categories.html'));
  } else if (requestPath === '/about') {
    res.sendFile(path.join(__dirname, 'about.html'));
  } else if (requestPath === '/contact') {
    res.sendFile(path.join(__dirname, 'contact.html'));
  } else if (requestPath === '/faq') {
    res.sendFile(path.join(__dirname, 'faq.html'));
  } else if (requestPath === '/cart') {
    res.sendFile(path.join(__dirname, 'cart.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});