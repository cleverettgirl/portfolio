const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
  res.render('index')
})

app.listen(3000, function(){
  console.log('listening on port 3000');
});

