import jwt from 'jsonwebtoken';
import apiConfig from '../config/api';

export default function(req, res, next){
    const authorizationHeader = req.headers['authorization'];
    let token;
    if(authorizationHeader){
        token = authorizationHeader.split(' ')[1];
    }
    if(token && req.user){
        jwt.verify(token, apiConfig.jwtSecrect, (err, decode) => {
            if(err){
                return res.json({
                    error: true,
                    message: 'Failed to authenticate'
                })
            }
            if(decode._doc._id == req.user._id){
                return next();
            }
            return res.json({
                error: true,
                message: 'no such user'
            });
        })
    }else{
        res.json({
            error: true,
            message: 'No token provided'
        });
    }
}