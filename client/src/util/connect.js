
const fetchOptions = (body) =>
{
    return (
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
    });
};

const connect = async(URL, options) =>
{
    const conn = await fetch(URL, options).then( res => res.json() );
    
    return conn;

};


const getRows = (result) =>
{
    let rows = '';
    Object.keys(result).forEach(key => 
    {
        rows = result[key];

    });
    return rows;
};


module.exports={fetchOptions, connect, getRows}