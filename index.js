const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./db');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
app.use(bodyParser.json()); 
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/greetuser', (req, res) => {
    res.send('Hello, World! Advait');
});

app.use('/person', personRoutes);
app.use('/menuitem', menuItemRoutes);



app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

