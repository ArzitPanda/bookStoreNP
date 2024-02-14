const express = require('express');

const categoryRoutes = require('./routes/categoryRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const authorRoutes = require('./routes/authorRoutes');
const customerRoutes = require('./routes/customerRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const cors = require('cors')
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'uploads')));

// Example route to access images by their filenames
app.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(path.join(__dirname, 'uploads', imageName));
});

app.use('/api/categories', categoryRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req, res) => {
 

res.send('Welcome all working good');

})

app.listen(3000,() => {console.log('listening on port 3000');});