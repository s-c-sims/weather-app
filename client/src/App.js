import './App.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import React, { useState } from 'react';

import { fetchOptions, connect, getRows} from './util/connect';
import { inputDefault, inputBlank, inputNotFound } from './util/validation';
import { formatDate, defaultHeadings, rowHeadings } from './util/format';
import Header from './components/Header';

import Icon from './components/Icon';

function App() {

  const [ input, setInput ] = useState({search: ''});

  const [ location, setLocation ] = useState('');

  const [ headings, setHeadings ] = useState(defaultHeadings);

  const [ form, setForm ] = useState(inputDefault);

  const [ data, setData ] = useState
  ({
    day: [],
    forecast: [],
    low: [],
    high: [],
  });


  let container = 'container d-flex text-center align-items-center justify-content-center';

  const formatColHead = (arr, day, date) =>
  { 
    let colHead =  
    <th> 
      <h5>{day}</h5>
      <p>{date}</p>
    </th>

    arr.push(colHead);
  };

  const formatData = (arr, item) =>
  {
    let element = <td>{item}</td>
    arr.push(element)
  };

  const connectBackend = () =>
  {
    const options = fetchOptions(JSON.stringify(input));

    const conn = connect('/post', options);

    return conn;
  };


  const handleBackend= (conn) =>
  {
    conn.then(result => 
      {
        const rows = getRows(result);

        if(!rows) setForm(inputNotFound)

        else
        { 
          setLocation(rows.location.name);
          setHeadings(rowHeadings);

          let days = [];
          let forecast = [];
          let lows = [];
          let highs = [];

          rows.forecast.forEach(day =>
          {
            formatColHead(days, day.day, formatDate(day.date));
            formatData(forecast, day.skytextday);
            formatData(lows, day.low);
            formatData(highs, day.high);
          });

          setData
          ({
            day: days,
            forecast: forecast,
            low: lows,
            high: highs
          });

        };

      });
  };

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if(!input.search) setForm(inputBlank)
    else 
    { 

      const conn = connectBackend();
      handleBackend(conn);
      
    };
  };
  return (
    
    <div className="App">

      <Header></Header>

      <div className={container}>
 
    
        <form noValidate onSubmit={handleSubmit}>

          <label className="col-form-label mt-4" htmlFor="input">
            Enter by city or zip
          </label>

          <div className="input-group">

            <input
            className={form.class}
            type="text"
            id="input"
            placeholder='Ex.) Los Angeles, CA'
            onChange={e => setInput({search: e.target.value})}
            />


          <div className="invalid-feedback">{form.msg}</div>
          
        </div>
        

        <button type='submit' className="btn btn-primary mt-4">
                  Enter
        </button>
        <small className='text-muted d-flex p-3'>Wrong location? Try searching by zip code.</small>


        </form>
  
      </div>

      <h3 className='text-center p-5'>{location}</h3>


      <div className={container}>
        <div className='row'>
          <table className='table'>
            <thead>
              <tr>
              <th scope='col'></th>
              {data.day}
              </tr>
            </thead>
            <tbody>
            <tr>
              <th scope='row'></th>
              <Icon weather='sunny'></Icon>

            </tr>
            <tr>
              <th scope='row'></th>
              {data.forecast}
            </tr>
            <tr>
            <th scope='row'>{headings.low}</th>
              {data.low}
            </tr>
            <tr>
            <th scope='row'>{headings.high}</th>
              {data.high}
            </tr>
            </tbody>
          


          </table>

      </div>
      </div>


      </div>
      
  
  );
}

export default App;

