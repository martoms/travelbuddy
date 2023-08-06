import { useEffect } from "react";

const useTourPackageValue = (edit, setEdit, formData, setFormData) => {

    useEffect(() => {
        const packageDuration = document.getElementById('tourpackage-packageDuration')
        const tourStarts = document.getElementById('tourpackage-tourStarts')
        const basePrice = document.getElementById('tourpackage-basePrice')
        const day1 = document.getElementById('tourpackage-day1')
        const day2 = document.getElementById('tourpackage-day2')
        const day3 = document.getElementById('tourpackage-day3')
        const day4 = document.getElementById('tourpackage-day4')
        const day5 = document.getElementById('tourpackage-day5')
        const inclusions = document.getElementById('tourpackage-inclusions')
        const exclusions = document.getElementById('tourpackage-exclusions')
        
        const updatedFormData = { ...formData };

        if (basePrice) {

            
            updatedFormData.basePrice = basePrice.value;
            updatedFormData.inclusions = inclusions.value;
            
            const itineraryObject = {
            day1: day1.value,
            day2: day2.value,
            day3: day3.value,
            };

            if (day4) {
                itineraryObject.day4 = day4.value;
            };

            if (day5) {
                itineraryObject.day5 = day5.value;
            };

            updatedFormData.itinerary = [itineraryObject];
            
        };

        if (packageDuration) {
            updatedFormData.packageDuration = packageDuration.value;
            updatedFormData.tourStarts = tourStarts.value;
        };

        if (exclusions) {
            updatedFormData.exclusions = exclusions.value; 
        };

        setFormData(updatedFormData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit])
}
 
export default useTourPackageValue;