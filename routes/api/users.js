const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   public
router.post('/', [
    check('name', 'Name is required!').not().isEmpty(),
    check('email', 'Please enter valid email!').isEmail(),
    check('password', 'Please enter a password with 6 or more charchters').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists!' }] });
            }

            // Get users gravatar
            const avatar = gravatar.url(email, {
                s: 200,
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            // Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token });
                });

            // res.send(user);
        } catch (e) {
            console.log(e.message);
            res.send(500).send('Server error!');
        }
    });

module.exports = router;