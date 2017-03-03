import express from 'express';
import Product from '../../models/product';

const router = express.Router();

router.get('/', (req, res) => {
    Product.find().exec((err, products) => {
        return res.json({
            error: err ? false : err,
            result: products
        });
    })
})

router.post('/create', (req, res) => {
    let product = new Product(req.body);
    console.log(product);
    product.save((err, _product) => {
        return res.json({
            error: err ? false : err,
            result: _product
        });
    })
});

router.get('/show/:_id', (req, res) => {
    Product.findById(req.params._id).exec((err, product) => {
        return res.json({
            error: err ? false : err,
            result: product
        });
    });
})

router.get('/edit/:_id', (req, res) => {
    Product.findById(req.params._id).exec((err, product) => {
        return res.json({
            error: err ? false : err,
            result: product
        });
    });
})

router.put('/update', (req, res) => {
    Product.findById(req.params._id).exec((err, product) => {
        [...product, req.body];
        product.save((err, newProduct) => {
            return res.json({
                error: err ? false : err,
                result: newProduct
            });
        });
    });
});

router.delete('/destroy/:_id', (req, res) => {
    Product.delete({_id: req.params._id}).exec();
    return res.json({
        error: false
    });
});

export default router;