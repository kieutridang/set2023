const jwt = require("jsonwebtoken");

// format authHeader = Authorization Bearer

const formatHeaderAuth = {
    "AUTHORIZATION": 0,
    "TOKEN": 1
};

function veryfyToken(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[formatHeaderAuth.TOKEN];

    if (!token) {
        return res.status(401).json({
            "success": false,
            "message": "Access token not found"
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(403).json({
            "success": false,
            "message": "Invalid access token"
        });
    }
}

module.exports = veryfyToken