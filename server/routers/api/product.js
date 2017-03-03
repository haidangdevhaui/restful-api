import express from 'express';
import Product from '../../models/product';

const router = express.Router();

router.get('/', (req, res) => {
    Product.find().exec((err, products) => {
        return res.json({
            error: err ? err : false,
            result: products
        });
    })
})

router.post('/create', (req, res) => {
    Product.create(req.body, (err, product) => {
        return res.json({
            error: err ? err : false,
            result: product
        });
    })
});

router.get('/show/:_id', (req, res) => {
    Product.findById(req.params._id).exec((err, product) => {
        return res.json({
            error: err ? err : false,
            result: product
        });
    });
})

router.get('/edit/:_id', (req, res) => {
    Product.findById(req.params._id).exec((err, product) => {
        return res.json({
            error: err ? err : false,
            result: product
        });
    });
})

router.put('/update/:_id', (req, res) => {
    Product.update({ _id: req.params._id }, { $set: req.body}, (err, result) => {
        return res.json({
            error: err ? err : false,
            result: result
        });
    });
});

router.delete('/destroy/:_id', (req, res) => {
    Product.remove({_id: req.params._id}).exec((err, result) => {
        return res.json({
            error: err ? err : false,
            result: result
        });
    });
    
});

export default router;