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
    icon: [],
    forecast: [],
    low: [],
    high: [],
  });


  let container = 'container d-flex text-center align-items-center justify-content-center';

  const formatColHead = (index, day, date) =>
  { 

    return (
      <th key={index}> 
      <h5>{day}</h5>
      <p>{date}</p>
    </th>
    );

  };

  const formatData = (index, item) =>
  {
    return <td key={index}>{item}</td>

  };

  const formatIcon = (index, forecast) =>
  {
    return (<td key={index}><Icon weather={forecast}/></td>)
  }

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
          let icons = [];
          let forecast = [];
          let lows = [];
          let highs = [];
        
          for (let i = 0; i < rows.forecast.length; i++) 
          {

            const day = rows.forecast[i];

            let date = formatDate(day.date);

            let colHead = formatColHead(i, day.day, date);

            days.push(colHead);

            icons.push(formatIcon(i, day.skytextday));
            forecast.push(formatData(i, day.skytextday));
            lows.push(formatData(i, day.low));
            highs.push(formatData(i,  day.high));
            

          };

          setData
          ({
            day: days,
            icon: icons,
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
              {data.icon}
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

