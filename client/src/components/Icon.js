import { useEffect, useState } from "react";

const Icon = (props) =>
{

    const sun = {id: 'sun', name: 'wb sunny'};
    const cloud = {id: 'cloud', name: 'wb cloudy'};

    const [ icon, setIcon ] = useState({id: '', name: ''});

    useEffect(() =>
    {
        if(props.weather.includes('sunny')) setIcon(sun)
        else(setIcon(cloud));

    }, [props.weather]);

    
    return (
        
        <span class="material-icons" id={icon.id}>
            {icon.name}
        </span>



          
  
    )

};

export default Icon;