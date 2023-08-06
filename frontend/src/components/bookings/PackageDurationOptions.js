

const PackageDurationOptions = ({tourPackages, selectedDestination}) => {
    
    let packageDurationOptions;

    if (tourPackages && selectedDestination) {
        
        // Filter Tourpackages based on selected destination
        const destinationTourPackages = tourPackages.filter(
            (tourPackage) => tourPackage.destination === selectedDestination
        );

        const ids = destinationTourPackages.map(
            (destinationTourPackage) => destinationTourPackage._id
        );
    
        // Iterate Tourpackage packageDurations
        const packageDurations = destinationTourPackages.map(
            (destinationTourPackage) => destinationTourPackage.packageDuration
        );

        // Reformat Package Duration Data
        let reformattedPackageDurations = [];
        packageDurations.map((packageDuration) => {
                switch (packageDuration) {
                    case '5D4N':
                    return reformattedPackageDurations.push('5 Days & 4 Nights');
                    case '4D3N':
                    return reformattedPackageDurations.push('4 Days & 3 Nights');
                    case '3D2N':
                    return reformattedPackageDurations.push('3 Days & 2 Nights');
                    default:
                    return reformattedPackageDurations.push('No package available');
                }
            }
        );

        packageDurationOptions = ids.map((id, i) => {
            const packageDuration = packageDurations[i];
            const reformattedPackageDuration = reformattedPackageDurations[i];
            
            return (
                <option key={id} value={packageDuration}>
                    {reformattedPackageDuration}
                </option>
            );
        });

    };
    
    return ( packageDurationOptions );
}
 
export default PackageDurationOptions;