import express from 'express';
import User from '../../models/user';
import Status from '../../models/status';
import Image from '../../models/image';
import async from 'async';

const router = express.Router();

router.get('/friend-suggest', (req, res) => {
    var friends = req.user.friends;
    friends.push(req.user._id);
    User.find({
        _id: {
            $not: {
                $in: friends
            }
        }
    }, {
        _id: 1,
        username: 1,
        fullname: 1,
        avatar: 1
    }).exec((err, users) => {
        return res.json(users);
    });
});

router.get('/news', (req, res) => {

    const getListUser = () => {
        return new Promise((resolve, reject) => {
            User.find().exec((err, users) => {
                resolve(users);
            })
        })
    }

    (async () => {
        let list = await getListUser();
        res.json(list);
    })();
    /*
    Status.aggregate([
    {
        $lookup: {
            from: 'users',
            localField: 'uid',
            foreignField: '_id',
            as: 'user'
        }
    },
    {
        $project: {
            'content': 1,
            'images': 1,
            'user.username': 1,
            'user.fullname': 1,
            'user.avatar': 1,
            'created_at': 1
        }
    }
    ]).limit(10).sort({created_at: -1}).exec((err, doc) => {
        async.map(doc, mapMedia,(err, results) => {
            return res.json(results);
        });
    });
    */
});

const mapMedia = (ele, cb) => {
    if(ele.images.length == 0){
        return cb(ele);
    }
    Image.find({
        _id: {
            $in: ele.images
        }
    }, {
        src: 1,
        type: 1
    }).exec((err, img) => {
        ele.images = img;
        return cb(err, ele);
    })
}

export default router;