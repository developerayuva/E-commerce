let jwt = require('jsonwebtoken');

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).json({success: false, error: 'Please use a valid token'});
    }
    
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if(err) {
                res.status(401).json({success: false, error: 'Please use a valid token'});
            }
            else {
                req.user = data.user;
                next();
            }
        });

    } catch(error) {
        res.status(500).send("Internal server error occured");
    }
}

module.exports = fetchuser;