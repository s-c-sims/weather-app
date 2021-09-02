
const defaultHeadings = 
{
    forecast: '',
    low: '',
    high: ''
};

const rowHeadings = 
{
    forecast: 'Forecast',
    low: 'Low',
    high: 'High'

};

const monthNames = 
[
    "Jan", "Feb", "March", 
    "April", "May", "June", "July", 
    "Aug", "Sept", "Oct", 
    "Nov", "Dec"                 
];

const formatDate = (date) =>
{
    const d = new Date(date);

    const month = d.getUTCMonth();

    const day = d.getUTCDate();

    const dateFormat = monthNames[month] + ' ' + day;

    return dateFormat;
};


module.exports={formatDate, defaultHeadings, rowHeadings};