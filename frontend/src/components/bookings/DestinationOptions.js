
const DestinationOptions = ({ tourPackages }) => {

    let destinationOptions;
    if (tourPackages) {

        // Limit tourPackages to each instance of a particular destination
        const allActiveDestinations = tourPackages.reduce((destinationArray, destinationObj) => {

            const exists = destinationArray.some((item) => item.destination === destinationObj.destination);

            if (!exists) {
            destinationArray.push(destinationObj);
            }

            return destinationArray;
        }, []);

        const destinationsAlphabetical = allActiveDestinations.sort((a, b) => a.destination.localeCompare(b.destination));

        destinationOptions = destinationsAlphabetical.map((tourPackage) => {
            const { _id, destination } = tourPackage;
    
            return (
                <option key={_id} value={destination}>
                    {destination}
                </option>
            );
        })
    }
    
  return ( destinationOptions );
};

export default DestinationOptions;
