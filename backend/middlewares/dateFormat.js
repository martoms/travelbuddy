
// Whole date
const dateFormat = (start, end) => {
    
    // Compare Dates
    const date1 = new Date(start).getDate();
    const date2 = new Date(end).getDate();
    let startDate, endDate;

    startDate = new Date(start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (date1 < date2) {
        endDate = new Date(end).toLocaleDateString('en-US', { day: 'numeric' });
    } else {
        endDate = new Date(end).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }

    return `${startDate}-${endDate}, ${new Date(start).getFullYear()}`;

}

// Module Exports
module.exports = {
    dateFormat
};
