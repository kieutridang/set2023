var jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../models/user')
// const refreshAccessToken = require('../utils/refreshAccessToken')


function authentication(req,res,next) {
        if (!req.headers.authorization) {
          throw new Error('Invalid token.');
        }
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.id;

        // phat trien them refresh token
        // let refreshToken = req.headers['x-refresh-token'];
        // if (!userId) {
        //   if (!refreshToken) {
        //     throw new Error('Invalid token.');
        //   }
        //   refreshAccessToken(refreshToken);
        // }
      
        UserModel.find({_id: userId}).then(foundUser => {
          if (!foundUser) {
            throw new Error('Invalid token.')
          }
        })
      
}


module.exports = authentication