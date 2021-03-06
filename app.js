const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const chalk = require('chalk');
const log = require('./bin/bin');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT;

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use('/', require('./routes/index'));
app.use((req, res) => res.status(404).render('404', { title: 'Oops'}));

app.listen(PORT, err => err ? log(err) : log(chalk.white.bgGreen(`runing on ${ PORT }`)));