import { formatDate } from "../../util/format";


const ColHead = (props) =>
{
    const date = formatDate(props.date)
    return (
        <th> 
        <h5>{props.day}</h5>
        <p>{date}</p>
        </th>

    )


};

export default ColHead;