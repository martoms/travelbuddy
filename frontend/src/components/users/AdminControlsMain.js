import { Accordion } from "react-bootstrap";
import { useState, useContext } from "react";
import { AllContext } from "../../context/AllContext";
import AdminBookings from "./AdminBookings";
import AdminTourPackages from "./AdminTourPackages";
import { TopDestination } from "./AdminModify";
import { AdminRetrieveUsersMain } from "./AdminRetrieveUsers";

const AdminControlsMain = () => {

    const { bookings, tourPackages, allUsers } = useContext(AllContext);
    const [selectedDestination, setSelectedDestination] = useState('');
    const [isTopDestination, setIsTopDestination] = useState(false);
    const [viewUsers, setViewUsers] = useState(false);
    let isSelected;

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

        
        let allBookings;
        const destination = allDestinationsTourPackages.map((tourPackage) => {
            const { destination, destinationTourPackages } = tourPackage;
            const isTopDestination = destinationTourPackages[0].isTopDestination;
            let bookingsFromDestination;
            isSelected = destination === selectedDestination;
            
            if (!bookings.error) {
                bookingsFromDestination = allDestinationBookings.filter(bookings => {
                    return bookings.destination === selectedDestination;
                });

                allBookings = bookingsFromDestination.map(bookings => {
                    return bookings.destinationBookings;
                });
            }

            return ( 
                <li className="admin-control-tab pointer"
                    key={destination}
                    onClick={() => {
                        setSelectedDestination(destination);
                        setViewUsers(false);
                        setIsTopDestination(isTopDestination);
                    }}
                    >
                    {
                        isTopDestination &&
                        <img className="star" src="/images/star.svg" alt="star" />
                    }
                    {
                        !isSelected ?
                        <p className="admin-control-tab-name" style={{marginLeft: '20px'}} >
                            { destination }
                        </p>
                        :
                        <p className="admin-control-tab-name-selected" style={{marginLeft: '20px'}} >
                            { destination }
                        </p>
                    }
                    
                    {destination === 'Balabac Island' && <img className="admin-destinations-img" src="/images/balabac6.webp" alt="balabac1" />}
                    {destination === 'Cebu-Bohol' && <img className="admin-destinations-img" src="/images/bohol6.webp" alt="cebubohol1" />}
                    {destination === 'Cebu' && <img className="admin-destinations-img" src="/images/cebu6.webp" alt="cebu1" />}
                    {destination === 'Coron' && <img className="admin-destinations-img" src="/images/coron6.webp" alt="coron1" />}
                    {destination === 'El Nido - Coron' && <img className="admin-destinations-img" src="/images/elnido6.webp" alt="elnidocoron1" />}
                    {destination === 'Puerto Princesa - El Nido' && <img className="admin-destinations-img" src="/images/palawan5.webp" alt="puertopelnido1" />}
                    {destination === 'Puerto Princesa - Port Baron' && <img className="admin-destinations-img" src="/images/portbaron6.webp" alt="puertopbaron1" />}
                    {destination === 'Siargao' && <img className="admin-destinations-img" src="/images/siargao1.webp" alt="siargao6" />}
                    {
                        !isSelected ?
                        <div
                            className="admin-destinations-overlay"
                            style={{
                                display: 'block'
                            }}
                        ></div>
                        :
                        <div
                            className="admin-destinations-overlay"
                            style={{
                                display: 'none'
                            }}
                        ></div>
                    }
                </li>
            );
        });
        
        const selectedDestinationData = allDestinationsTourPackages.filter((tourPackage) => {
            return tourPackage.destination === selectedDestination;
        });

        let destinationTourPackages;
        if (selectedDestinationData.length !== 0) {
            destinationTourPackages = selectedDestinationData[0].destinationTourPackages;
        };

        return ( 
            <div className="destination-and-bookings row d-none d-lg-flex">
                {/* DATA OPTIONS */}
                <div className="lg-destination-items col-5">
                    <h3 className="admin-control-header">Users:</h3>
                    <ul>
                        <li className="admin-control-tab pointer" onClick={() => {
                            setViewUsers(true);
                            setSelectedDestination('')
                        }}>
                            {
                                !allUsers ?
                                <p className="admin-control-tab-name" style={{marginLeft: '20px'}}>Fetching users...</p>
                                :
                                <p className="admin-control-tab-name"
                                style={{marginLeft: '20px'}}
                                >
                                   {` View all users (${allUsers && allUsers.length})`}
                                </p>
                            }
                        </li>
                    </ul>
                    <h3 className="admin-control-header">Destinations:</h3>
                    <ul>
                        { destination }
                    </ul>
                </div>
    
                {/* VIEW DATA */}
                <div className="lg-bookings col-7">
                    {
                        selectedDestination.length === 0 && !viewUsers &&
                        <div style={{textAlign: 'center'}}>
                            <h2 style={{marginTop: '2rem', color: '#8dcbe6', fontWeight: '600'}}>Let's Get started!</h2>
                        </div>
                    }
                    {
                        viewUsers && 
                        <AdminRetrieveUsersMain />
                    }
                    {
                        selectedDestination.length !== 0 && !viewUsers &&
                        <>
                        <h2 className="admin-controls-destination">{ selectedDestination }</h2>
                        <div className="destination-controls">
                            <TopDestination destination={selectedDestination} isTopDestination={isTopDestination} />
                        </div>
                        <hr />
                        <h3>Tour Packages:</h3>
                        <Accordion>
                            <AdminTourPackages
                                destinationTourPackages={destinationTourPackages}
                                allBookings={allBookings}
                            />
                        </Accordion><br />
                        <h3>Bookings:</h3>
                        {
                            bookings.error || allBookings.length === 0 ?
                            <p style={{color: 'black'}}>No bookings yet 🥱</p>
                            :
                            <Accordion>
                                <AdminBookings allBookings={allBookings} />
                            </Accordion>
                        }
                        </>
                    }
                </div>
            </div>
        );
    }
}
 
export default AdminControlsMain;