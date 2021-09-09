import React, { useEffect, useState } from "react";

const Icon = (props) =>
{

    const [ icon, setIcon ] = useState({id: '', name: ''});

    useEffect(() => 
    {

        const sun = {id: 'sun', name: 'wb sunny'};
        const cloud = {id: 'cloud', name: 'wb cloudy'};
        const rain = {id: 'rain', name: 'water_drop'};
        const snow = {id: 'snow', name: 'ac_unit'};
    
        if(props.weather.includes('Sunny') || props.weather.includes('Clear')) setIcon(sun);
        else if(props.weather.includes('Cloudy')) setIcon(cloud)
        else if(props.weather.includes('Rain')) setIcon(rain)
        else if(props.weather.includes('Snow')) setIcon(snow)
        else setIcon(sun)


    }, [props.weather]);

    
    return (
        
        <span className="material-icons icon" id={icon.id}>
            {icon.name}
        </span>
     
          
    );

};

export default Icon;
