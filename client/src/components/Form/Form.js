import { inputBlank, inputDefault, inputNotFound } from "../../util/validation";
import Input from "./Input";
import Feedback from "./Feedback";
import Submit from "./Submit";
import { connect, fetchOptions, getRows } from "../../util/connect";
import { useEffect, useState } from "react";

import TableHead from "../Table/TableHead";
import ColHead from "../Table/ColHead";
import Data from "../Table/Data";
import Icon from "../Icon";
import Row from "../Table/Row";

const Form = () =>
{

    const [ input, setInput ] = useState({search: ''});

    const [ form, setForm ] = useState(inputDefault);

    const [ title, setTitle ] = useState('');

    const [ rows, setRows ] = useState([]);

    const [ data, setData ] = useState({
        dayDate: [],
        forecast: [],
        low: [],
        high: [],
        icon: []
    });

    const container = 'container d-flex text-center align-items-center justify-content-center';
    
    const handleData = () =>
    {
        
        let dayDates = [];
        let forecasts = [];
        let lows = [];
        let highs = [];
        let icons = [];

        for (let i = 0; i < rows.forecast.length; i++) 
        {
 
            const day = rows.forecast[i];

            const props = { key: i, day: day.day, date: day.date };

            dayDates.push( <ColHead {...props} /> );
            forecasts.push( <Data {...props} item = {day.skytextday} /> );
            lows.push( <Data {...props} item = {day.low} /> );
            highs.push( <Data {...props} item={day.high}/> );
            icons.push(<td {...props}><Icon weather={day.skytextday}/></td>)
  
        };

        setData({
            dayDate: dayDates,
            forecast: forecasts,
            low: lows,
            high: highs,
            icon: icons
        });

    };

    useEffect( () =>
    {
        if(rows.location)
        {
            setTitle(rows.location.name);

            handleData();

            setForm(inputDefault);
        };

    }, [rows]);


    const connectBackend = () =>
    {
      const options = fetchOptions(JSON.stringify(input));
  
      const conn = connect('/post', options);
  
      handleBackend(conn);
    };
    
  const handleBackend= (conn) =>
  {
    conn.then(result => 
      {
        const rows = getRows(result);

        setRows(rows);
        
        if(!rows) setForm(inputNotFound);
       
      });

  };

    const handleSubmit = (e) =>
    {
      e.preventDefault();
      if(!input.search) setForm(inputBlank)
      else connectBackend();
    };

    return (
        <div>

        <div className={container}>

            <form noValidate onSubmit={handleSubmit}>

            <label className='p-3' htmlFor="input">
                Enter by city or zip
            </label>
        
            <Input className={form.class} onChange={e => setInput({search: e.target.value})}/>
            <Feedback msg={form.msg}/>
            <Submit/>

            <small className='text-muted d-flex p-3'>Wrong location? Try searching by zip code.</small>

        </form>
        </div>

        <div className={container}>
    
            <div className='row'>

            <h2 className='p-5'>{title}</h2>
            
            <table className='table'>

                <TableHead colHead={data.dayDate}/>

                <tbody>
                <Row heading='' data={data.icon}/>
                <Row heading='Forecast' data={data.forecast}/>
                <Row heading='Low' data={data.low}/>
                <Row heading='High' data={data.high}/>
                </tbody>

            </table>

            </div>
        </div>

        </div>
    )

};

export default Form;