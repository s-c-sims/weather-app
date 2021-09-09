import './App.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

import { fetchOptions, connect, getRows} from './util/connect';
import { inputDefault, inputBlank, inputNotFound } from './util/validation';
import { defaultHeadings, rowHeadings } from './util/format';
import Header from './components/Header';
import ColHead from './components/ColHead';

import Icon from './components/Icon';

function App() {

  const [ input, setInput ] = useState({search: ''});

  const [ location, setLocation ] = useState('');

  const [ rows, setRows ] = useState([])

  const [ headings, setHeadings ] = useState(defaultHeadings);

  const [ form, setForm ] = useState(inputDefault);


  const [ data, setData ] = useState
  ({
    dayDate: [],
    icon: [],
    forecast: [],
    low: [],
    high: [],
  });



  useEffect(() =>
  {
    if(rows) 
    {
  
      setForm(inputDefault);
      
      const dayDates = rows.map(day => 
      ( 
        <ColHead key={day.date} day={day.day} date={day.date}/>
      ));

      const icons = rows.map( day => 
        ( 
          
        
          <td key={day.date}><Icon weather={day.skytextday}/></td>
        ));

      const forecast = rows.map( day => 
      ( 
          <td key={day.date}>{day.skytextday}</td>
      ));
 
      const lows = rows.map( day => 
        ( 
          <td key={day.date}>{day.low}</td>
        ));
  
      const highs = rows.map( day => 
      ( 
        <td key={day.date}>{day.high}</td>
      ));

      setData(
      {
        dayDate: dayDates,
        icon: icons,
        forecast: forecast,
        low: lows,
        high: highs
      });
    };
   


  }, [rows]);


  let container = 'container d-flex text-center align-items-center justify-content-center';

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

        setRows(rows.forecast);
     

        if(!rows) setForm(inputNotFound);
        else
        { 
          setHeadings(rowHeadings);
          setLocation(rows.location.name);
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
          <table className='table '>
            <thead>
              <tr>
              <th scope='col'></th>
              { data.dayDate }
              </tr>
            </thead>
            <tbody>
            <tr>
              <th scope='row'></th>
              { data.icon }
            </tr>
            <tr>
              <th scope='row'>{headings.forecast}</th>
              { data.forecast }
            </tr>
            <tr>
            <th scope='row'>{headings.low}</th>
            { data.low }
            </tr>
            <tr>
            <th scope='row'>{headings.high}</th>
            { data.high }
            </tr>
            </tbody>

          </table>

      </div>
      </div>

      </div>
      
  );
}

export default App;

