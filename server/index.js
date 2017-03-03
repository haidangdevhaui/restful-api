import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';

import configServer from './config/server';
import configDB from './config/database';

import mongoose from 'mongoose';

import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev'

import auth from './routers/auth';
import routerUser from './routers/api/user';
import routerIndex from './routers/api/index';
import uploadRouter from './routers/api/upload';
import productRouter from './routers/api/product';

let app = express();

mongoose.Promise = global.Promise;
mongoose.connect(configDB.mongo.uri);

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride());
app.use(session({
	saveUninitialized: true,
	resave: true,
	secret: 'xxx'
}));

app.use(passport.initialize());
app.use(passport.session());

const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use('/static', express.static('public'))
app.use(cors());
app.use('/api/user', routerUser);
app.use('/api/auth', auth);
app.use('/api/upload', uploadRouter);
app.use('/api/product', productRouter);

app.get('/*', (req, res) => {
    res.json({
        message: 'Application is working!'
    });
})


app.listen(configServer.port, () => {
    console.log('App. is running on port ' + configServer.port);
})