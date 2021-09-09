const TableHead = (props) =>
{
    return (
        
            <thead>
              <tr>
              <th scope='col'></th>
              { props.colHead }
              </tr>
            </thead>
        

     
    )

};

export default TableHead;