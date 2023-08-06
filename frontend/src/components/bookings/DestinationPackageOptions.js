import { Form } from "react-bootstrap";

const DestinationPackageOptions = ({tourPackages, selectedDestination, handleForm}) => {

    let destinationPackageOptions;

    if (tourPackages && selectedDestination) {
        // Filter Tourpackages based on selected destination
        const destinationTourPackages = tourPackages.filter(
          (tourPackage) => tourPackage.destination === selectedDestination
        );
  
        // Iterate Tourpackage details
        const tourStarts = destinationTourPackages.map(
          (destinationTourPackage) => new Date(destinationTourPackage.tourStarts)
        );
        const tourEnds = destinationTourPackages.map(
          (destinationTourPackage) => new Date(destinationTourPackage.tourEnds)
        );
  
        // Reformat Dates...
        const dates = tourStarts.map((startDate, index) => {
          const endDate = tourEnds[index];
          const date1 = startDate.getDate();
          const date2 = endDate.getDate();
          const startFormatted = startDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const endFormatted = date1 < date2
            ? endDate.toLocaleDateString("en-US", { day: "numeric" })
            : endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
          const year = startDate.getFullYear();
          return `${startFormatted}-${endFormatted}, ${year}`;
        });
  
        // Extract other properties
        const packageDurations = destinationTourPackages.map(
          (destinationTourPackage) => destinationTourPackage.packageDuration
        );
        const availableSlots = destinationTourPackages.map(
          (destinationTourPackage) => destinationTourPackage.availableSlots
        );
        const ids = destinationTourPackages.map(
          (destinationTourPackage) => destinationTourPackage._id
        );
        
        destinationPackageOptions = ids.map((id, i) => {
            const packageDuration = packageDurations[i];
            const date = dates[i];
            const availableSlot = availableSlots[i];

            return (
              <Form.Label key={id} htmlFor={id} className="tour">
                <input
                  className="form-check-input"
                  id={id}
                  value={id}
                  name="tourPackageId"
                  type="radio"
                  onClick={(e) => handleForm(e)}
                />
                <span className="radio"></span>
                {`${packageDuration} ${date}`}
                <span className="slot">{availableSlot}</span>
              </Form.Label>
            );
          })
      }


    return ( destinationPackageOptions );
}
 
export default DestinationPackageOptions;