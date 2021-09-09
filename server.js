
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

app.post('/post', (req, res) => 
{

  let input = '';
  
  let rows = '';

  Object.keys(req.body).forEach( key => input = req.body[key] );

  weather.find({search: input, degreeType: 'F'}, function(err, result) 
  {
    if(err) console.log(err);

    Object.keys(result).forEach( key => rows = result[key] )
    
    if(rows) console.log('Location: ' + rows.location.name)
    else console.log('No results'); 

    res.send(result);

  });

});

app.listen(port, () => 
{
  console.log(`Example app listening at http://localhost:${port}`)
});

