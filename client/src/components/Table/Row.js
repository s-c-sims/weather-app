import { useEffect, useState } from "react";
import { getRows } from "../../util/connect";

const Row = (props) =>
{
    const [ heading, setHeading ] = useState('');

   useEffect( () =>
   {
       const rows = getRows(props.data);
       if(rows) setHeading(props.heading);

   }, [props.data, props.heading]);
    return (
        <tr>
            <th scope='row'>{heading}</th>
            {props.data}
        </tr>

    );


};

export default Row;