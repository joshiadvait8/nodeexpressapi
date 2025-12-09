const db = require('./db');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');
const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
passport.use(new LocalStategy(async (username, password, done) => {
    //authentication logic here
    try {
        console.log("Received creds:", username, password);
        const user = await Person.findOne({ username: username });
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        // const isPasswordMatch = user.password === password;
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        }
        return done(null, false, { message: 'Incorrect password.' });

    } catch (err) {
        console.log(err);
    }
}))

module.exports = passport;