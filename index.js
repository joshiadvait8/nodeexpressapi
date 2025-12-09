const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const passport = require('./auth');

require('dotenv').config();
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()}: request made to ${req.originalUrl}`);
    next();
}
//this will be used on all routes
app.use(logRequest);

//this is also kind of middleware to parse json body and it will add data to req.body
app.use(bodyParser.json());


app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', { session: false })

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/greetuser', (req, res) => {
    res.send('Hello, World! Advait');
});

app.use('/person', personRoutes);
app.use('/menuitem',localAuthMiddleware, menuItemRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:3000');
});

