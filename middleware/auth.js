const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // When we send a req to a protected route, we need to send a token with a header
    // Get token from header
    const token = req.header('x-auth-token');

    // Chekc if there is a token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authoriztion denid!' });
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};