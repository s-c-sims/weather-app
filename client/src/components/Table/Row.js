const Row = (props) =>
{
    return (
        <tr>
            <th scope='row'>{props.heading}</th>
            { props.data }
        </tr>

    );


};

export default Row;