import express from 'express';
import Category from '../../models/blog/category';
import Post from '../../models/blog/post';
import Author from '../../models/blog/author';

const router = express.Router();

router.get('/category', (req, res) => {
    Category.find({}, 
        {
            _id: 0
        }
    ).exec((err, doc) => {
        return res.json(doc);
    })
});

router.get('/post/list', (req, res) => {
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : 9;
    
    getListPosts({
        skip: skip,
        limit: limit
    }).then((result) => {
        return res.json(result);
    })
});

router.post('/post/detail', (req, res) => {
    let postSlug = req.body.postSlug;
    Post.findOne({slug: postSlug.trim()}).exec((err, post) => {
        return res.json(post);
    });
});

export function getListPosts(cond){
    let match = {};
    cond.categorySlug ? match['category.slug'] = cond.categorySlug : '';
    cond.authorUserName ? match['author.username'] = cond.authorUserName : '';

    return Post.aggregate([
        {
            $lookup: {
                from: 'authors',
                localField: 'authorID',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'category'
            }
        },
        {
            $match: match
        },
        {
            $project: {
                '_id': 0,
                'title': 1,
                'slug': 1,
                'image': 1,
                'author.fullname': 1,
                'author.username': 1,
                'author.avatar': 1,
                'category.name': 1,
                'category.slug': 1,
                'created_at': 1
            }
        },{
            $skip: cond.skip
        },{
            $limit: cond.limit
        }, {
            $sort: {
                created_at: 1
            }
        }
    ]);
}

export default router;