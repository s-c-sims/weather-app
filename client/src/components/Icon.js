import { useState } from "react";

const Icon = (props) =>
{
    const [ icon, setIcon ] = useState('');

    const getIcon = () =>
    {
        let icon = '';
        if(props.weather.includes('sunny')) icon='wb sunny'
        else icon = 'wb cloudy';
        return icon;
    }

    

    return (
        <div>
    
        <span class="material-icons">
            {getIcon()}
        </span>


        </div>
          
  
    )

};

export default Icon;