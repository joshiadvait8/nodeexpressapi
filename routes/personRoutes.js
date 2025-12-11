const router = require('express').Router();
const Person = require('../models/Person');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

//POST route to add a person
router.post('/signup', async (req, res) => {

    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Generated Token:', token);

        res.status(201).json({ response: response, token: token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

});
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if(!username || !password){
            return res.status(400).json({ error: 'Username and password are required' });
        }
        //find user by username
        const user = await Person.findOne({ username: username });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        //generate token
        const payload = {
            id: user.id,
            username: user.username
        };
        const token = generateToken(payload);
        res.status(200).json({ token: token });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await Person.findById(userid);
        res.status(200).json({ user });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Person.findById(id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatePersonData = req.body;
        const response = await Person.findByIdAndUpdate(id, updatePersonData, {
            new: true, //return updated document
            runValidators: true
        });
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


module.exports = router;