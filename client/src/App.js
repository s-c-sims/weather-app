import './App.css';
import 'bootswatch/dist/lux/bootstrap.min.css';
import React, { useState } from 'react';

import { fetchOptions, connect, getRows} from './util/connect';
import { inputDefault, inputBlank, inputNotFound } from './util/validation';
import Header from './components/Header';

function App() {

  const [ input, setInput ] = useState({search: ''});

  const [ location, setLocation ] = useState('');

  const [ form, setForm ] = useState(inputDefault);


  let container = 'container d-flex text-center align-items-center justify-content-center';

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    const options = fetchOptions(JSON.stringify(input));

    const conn = connect('/post', options);
    
    conn.then(result => 
    {
        const rows = getRows(result);

        if(!rows) setForm(inputNotFound)
        else
        { 
          setLocation(rows.location.name);

        };

    });


  }
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
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>

 
          <div className="invalid-feedback">{form.msg}</div>
          
        </div>
        <button type='submit' className="btn btn-primary mt-4">
                  Enter
        </button>

        </form>
  
      </div>

      <h3 className='text-center p-5'>{location}</h3>


      <div className={container}>
        <div className='row'>
          <table>
            <thead>

            </thead>


          </table>
        </div>

      </div>


      </div>
      
  
  );
}

export default App;
