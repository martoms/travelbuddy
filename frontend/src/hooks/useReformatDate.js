const useReformatDate = () => {

    const reformatDate = (tourStarts, tourEnds) => {

        // Compare Dates
        const date1 = new Date(tourStarts).getDate();
        const date2 = new Date(tourEnds).getDate();
        
        // Reformat Dates
        let startDate = new Date(tourStarts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        let endDate;
        
        if (date1 < date2) {
            endDate = new Date(tourEnds).toLocaleDateString('en-US', { day: 'numeric' });
        } else {
            endDate = new Date(tourEnds).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        let tourDates = `${startDate}-${endDate}, ${new Date(tourStarts).getFullYear()}`;

        return tourDates
    };

    return { reformatDate }
}
 
export default useReformatDate;