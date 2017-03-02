import express from 'express';

const router = express.Router();

import User from '../../models/user';
import validatorUser from '../../shared/validations/signup';
import Status from '../../models/status';
import Request from '../../models/request';

router.get('/', (req, res) => {
    User.find().exec((e, d) => {
        res.json(d);
    })
});

router.post('/', (req, res) => {
    const error = validatorUser(req.body);
    if(!error.isValid) {
        return res.json(error);
    }
    User.findOne({
        $or: [{
            email: req.body.email
        }, {
            username: req.body.username
        }]
    }, (err, user) => {
        if(user){
            error.isValid = false;
            if(user.username == req.body.username){
                error.errors = {
                    username: 'Username has been used'
                }
            }
            if(user.email == req.body.email){
                error.errors = {
                    email: 'Email has been used'
                }
            }
            return res.json(error)
        }
        var newUser = new User();
        newUser.email = req.body.email;
        newUser.username = req.body.username;
        newUser.password = newUser.hashPassword(req.body.password);
        newUser.save(function(err, nUser){
            return res.json({
                isValid: true,
                success: true,
                message: 'Signup successfully!'
            });
        })
    });
});

router.get('/status/:id', (req, res) => {

})

router.post('/status', (req, res) => {
    req.body.uid = req.user._id;
    let _status = new Status(req.body);
    _status.save((err, doc) => {
        res.json(doc);
    })
});

router.post('/friend/create', (req, res) => {
    let _request = new Request({
        _request: req.user._id,
        _receive: req.body._id
    });
    _request.save((err, doc) => {
        return res.json(doc);
    });
})


export default router;