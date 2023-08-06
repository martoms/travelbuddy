import { Accordion } from "react-bootstrap";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import AdminBookings from "./AdminBookings";
import AdminTourPackages from "./AdminTourPackages";
import { TopDestination } from "./AdminModify";

const AdminDestinations = () => {

    const { bookings, tourPackages } = useContext(AllContext);
    
    if (bookings && tourPackages) {

        let allDestinationBookings;

        if (!bookings.error) {
            
            allDestinationBookings = bookings.reduce((acc, booking) => {
                const destination = booking.destination;
                
                // Check if a destination group already exists in the accumulator
                const existingGroup = acc.find(group => group.destination === destination);
                
                if (existingGroup) {
                    // If the destination group exists, push the current booking to it
                    existingGroup.destinationBookings.push(booking);
                } else {
                    // If the destination group doesn't exist, create a new one
                    acc.push({
                    destination: destination,
                    destinationBookings: [booking]
                    });
                }
                    return acc;
            }, []);
        };

        const allDestinationsTourPackages = tourPackages.reduce((acc, tourPackage) => {
            const destination = tourPackage.destination;
            
            // Check if a destination group already exists in the accumulator
            const existingGroup = acc.find(group => group.destination === destination);
            
            if (existingGroup) {
                // If the destination group exists, push the current booking to it
                existingGroup.destinationTourPackages.push(tourPackage);
            } else {
                // If the destination group doesn't exist, create a new one
                acc.push({
                destination: destination,
                destinationTourPackages: [tourPackage]
                });
            }

            const toAlphabet = acc.sort((a, b) => a.destination.localeCompare(b.destination));

            return toAlphabet;

        }, []);

        const destination = allDestinationsTourPackages.map((tourPackage) => {

            const { destination, destinationTourPackages } = tourPackage;

            const isTopDestination = destinationTourPackages[0].isTopDestination

            let bookingsFromDestination;
            let allBookings;
            if (!bookings.error) {
                bookingsFromDestination = allDestinationBookings.filter(bookings => {
                    return bookings.destination === destination;
                });


                allBookings = bookingsFromDestination.map(bookings => {
                    return bookings.destinationBookings;
                });
            }

            return ( 
                <Accordion.Item  key={destination} eventKey={destination} className="destinations-list-item">
                    <Accordion.Header>
                        {destination === 'Balabac Island' && <img src="/images/balabac6.webp" alt="balabac1" />}
                        {destination === 'Cebu-Bohol' && <img src="/images/bohol6.webp" alt="bohol1" />}
                        {destination === 'Cebu' && <img src="/images/cebu6.webp" alt="cebu1" />}
                        {destination === 'Coron' && <img src="/images/coron6.webp" alt="coron1" />}
                        {destination === 'El Nido - Coron' && <img src="/images/elnido6.webp" alt="elnidocoron1" />}
                        {destination === 'Puerto Princesa - El Nido' && <img src="/images/palawan4.webp" alt="puertopelnido1" />}
                        {destination === 'Puerto Princesa - Port Baron' && <img src="/images/portbaron6.webp" alt="puertopbaron1" />}
                        {destination === 'Siargao' && <img src="/images/siargao6.webp" alt="siargao1" />}
                        <div className="overlay"></div>
                        <span className="admin-destinations-name">
                            {
                                isTopDestination &&
                                <img className="star" src="/images/star.svg" alt="star" />
                            }
                            { destination }
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="destination-controls">
                            <TopDestination destination={destination} isTopDestination={isTopDestination} />
                        </div>
                        <hr />
                        <h3>Tour Packages:</h3>
                        <Accordion>
                            <AdminTourPackages destinationTourPackages={destinationTourPackages} allBookings={allBookings} />
                        </Accordion><br />
                        <h3>Bookings:</h3>
                        {
                            bookings.error || allBookings.length === 0 ?
                            <p>No bookings yet 🥱</p>
                            :
                            <Accordion>
                                <AdminBookings allBookings={allBookings} />
                            </Accordion>
                        }
                    </Accordion.Body>
                </Accordion.Item>
            );
        })

        return (
            <Accordion className="d-lg-none">
                { destination }
            </Accordion>
        )
    }
    
}
 
export default AdminDestinations;