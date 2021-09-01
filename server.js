
const express = require('express');

const logger = require('morgan');

const weather = require('weather-js');

const app = express();

const port = 5000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => 
{
  res.send('Hello World!')
});

app.get('/get', (req, res) => 
{

  res.send('GET from backend')
});

app.post('/post', (req, res) => 
{
  
  let input = '';
  
  let rows = '';

  Object.keys(req.body).forEach( key => input = req.body[key] );

  weather.find({search: input, degreeType: 'F'}, function(err, result) 
  {

    if(err) console.log(err);

    Object.keys(result).forEach( key => rows = result[key] )
    
    if(rows) console.log(rows.forecast);

    else console.log('No results'); 

    res.send(result);

  });

});

app.listen(port, () => 
{
  console.log(`Example app listening at http://localhost:${port}`)
});

/*
Add nodemon as dependency (?) in package.json
Change from nodemon to node 

README 
1. cd <project>/client
2. npm i 
3. npm start
4. cd ..
5. npm run server



*/