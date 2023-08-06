import { useState } from "react";
import { Accordion } from "react-bootstrap";
import DestinationDetails from "./DestinationDetails";

const AllDestinationsMobile = ({ destinations }) => {

  // Iterate Data
  const allDestinations = destinations.map((tourPackage) => {
      
        const {
            _id,
            destination,
        } = tourPackage;

        return (
            <Accordion.Item key={_id} eventKey={_id} className="destination">
                <Accordion.Header id={`destination-name-${_id}`}>
                    {destination === 'Balabac Island' && <img src="/images/balabac6.webp" alt="balabac1" />}
                    {destination === 'Cebu-Bohol' && <img src="/images/bohol6.webp" alt="cebubohol1" />}
                    {destination === 'Cebu' && <img src="/images/cebu6.webp" alt="cebu1" />}
                    {destination === 'Coron' && <img src="/images/coron6.webp" alt="coron1" />}
                    {destination === 'El Nido - Coron' && <img src="/images/elnido6.webp" alt="elnidocoron1" />}
                    {destination === 'Puerto Princesa - El Nido' && <img src="/images/palawan4.webp" alt="puertopelnido1" />}
                    {destination === 'Puerto Princesa - Port Baron' && <img src="/images/portbaron6.webp" alt="puertopbaron1" />}
                    {destination === 'Siargao' && <img src="/images/siargao6.webp" alt="siargao1" />}
                    <h3>{destination}</h3>
                </Accordion.Header>
                <Accordion.Body>
                    <DestinationDetails tourPackage={tourPackage} />
                </Accordion.Body>
            </Accordion.Item>
        );
  });

  return (
        <>
        <Accordion flush>
            {allDestinations}
        </Accordion>
        </>
  );
};

const AllDestinationsMain = ({ destinations }) => {
    const [selectedDestination, setSelectedDestination] = useState('');
  
    // Iterate Data
    const allDestinations = destinations.map((tourPackage) => {
      const { _id, destination } = tourPackage;
  
      const isSelected = destination === selectedDestination;
  
      return (
        <li key={_id} onClick={() => setSelectedDestination(destination)} className="pointer">
          <h3>{destination}</h3>
          {destination === 'Balabac Island' && <img src="/images/balabac6.webp" alt="balabac1" />}
          {destination === 'Cebu-Bohol' && <img src="/images/bohol6.webp" alt="cebubohol1" />}
          {destination === 'Cebu' && <img src="/images/cebu6.webp" alt="cebu1" />}
          {destination === 'Coron' && <img src="/images/coron6.webp" alt="coron1" />}
          {destination === 'El Nido - Coron' && <img src="/images/elnido6.webp" alt="elnidocoron1" />}
          {destination === 'Puerto Princesa - El Nido' && <img src="/images/palawan4.webp" alt="puertopelnido1" />}
          {destination === 'Puerto Princesa - Port Baron' && <img src="/images/portbaron6.webp" alt="puertopbaron1" />}
          {destination === 'Siargao' && <img src="/images/siargao6.webp" alt="siargao1" />}
          {
            !isSelected ?
            <div
              className="overlay"
              style={{
                display: 'block'
              }}
            ></div>
            :
            <div
              className="overlay"
              style={{
                display: 'none'
              }}
            ></div>
          }
        </li>
      );
    });
  
    // Get the details of the first selected destination
    const selectedTourPackage = destinations.find((tourPackage) => tourPackage.destination === selectedDestination);
  
    return (
      <div className="row desktop-view d-none">
        <div className="col-4 destination-names">
          <ul>{allDestinations}</ul>
        </div>
        <div className="col-8 destination-desc">
          {selectedTourPackage ? (
            <DestinationDetails tourPackage={selectedTourPackage} />
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginTop: '4rem', color: 'white' }}>Please Select a Destination</h2>
            </div>
          )}
        </div>
      </div>
    );
  };
  
export { AllDestinationsMobile, AllDestinationsMain };
