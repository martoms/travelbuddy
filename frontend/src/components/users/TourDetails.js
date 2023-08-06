
const TourDetails = ({ tourDestination }) => {

    if (tourDestination) {

        const {
            itinerary: [{ day1, day2, day3, day4, day5 }],
            inclusions,
            exclusions,
            destination
        } = tourDestination;

        return ( 
            // <>Hello?</>
            <div className="details">
                <div className="itinerary">
                    <h2>Itinerary:</h2>
                    <div className="itinerary-details">
                        <h6>Day 1</h6>
                        <p>{ day1 }</p>
                        {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac1.webp" alt="balabac1" />}
                        {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/cebu3.webp" alt="cebubohol1" />}
                        {destination === 'Cebu' && <img className="tp-img" src="/images/cebu1.webp" alt="cebu1" />}
                        {destination === 'Coron' && <img className="tp-img" src="/images/coron1.webp" alt="coron1" />}
                        {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/elnido1.webp" alt="elnidocoron1" />}
                        {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/palawan1.webp" alt="puertopelnido1" />}
                        {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/palawan3.webp" alt="puertopbaron1" />}
                        {destination === 'Siargao' && <img className="tp-img" src="/images/siargao1.webp" alt="siargao1" />}
                        <h6>Day 2</h6>
                        <p>{ day2 }</p>
                        {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac2.webp" alt="balabac2" />}
                        {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/cebu4.webp" alt="cebubohol2" />}
                        {destination === 'Cebu' && <img className="tp-img" src="/images/cebu2.webp" alt="cebu2" />}
                        {destination === 'Coron' && <img className="tp-img" src="/images/coron2.webp" alt="coron2" />}
                        {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/elnido2.webp" alt="elnidocoron2" />}
                        {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/palawan2.webp" alt="puertopelnido2" />}
                        {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/palawan4.webp" alt="puertopbaron2" />}
                        {destination === 'Siargao' && <img className="tp-img" src="/images/siargao2.webp" alt="siargao2" />}
                        <h6>Day 3</h6>
                        <p>{ day3 }</p>
                        {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac3.webp" alt="balabac3" />}
                        {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/bohol2.webp" alt="cebubohol3" />}
                        {destination === 'Cebu' && <img className="tp-img" src="/images/cebu3.webp" alt="cebu3" />}
                        {destination === 'Coron' && <img className="tp-img" src="/images/coron3.webp" alt="coron3" />}
                        {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/coron4.webp" alt="elnidocoron3" />}
                        {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/elnido3.webp" alt="puertopelnido3" />}
                        {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/portbaron1.webp" alt="puertopbaron3" />}
                        {destination === 'Siargao' && <img className="tp-img" src="/images/siargao3.webp" alt="siargao3" />}
                        { day4 !== undefined && (
                            <>
                            <h6>Day 4</h6>
                            <p>{day4}</p>
                            {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac5.webp" alt="balabac4" />}
                            {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/bohol4.webp" alt="cebubohol4" />}
                            {destination === 'Cebu' && <img className="tp-img" src="/images/cebu4.webp" alt="cebu4" />}
                            {destination === 'Coron' && <img className="tp-img" src="/images/coron5.webp" alt="coron4" />}
                            {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/coron5.webp" alt="elnidocoron4" />}
                            {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/elnido4.webp" alt="puertopelnido4" />}
                            {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/portbaron2.webp" alt="puertopbaron4" />}
                            {destination === 'Siargao' && <img className="tp-img" src="/images/siargao4.webp" alt="siargao4" />}
                            </>
                        )}
                        { day5 !== undefined && (
                            <>
                            <h6>Day 5</h6>
                            <p>{day5}</p>
                            {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac4.webp" alt="balabac5" />}
                            {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/bohol5.webp" alt="cebubohol5" />}
                            {destination === 'Cebu' && <img className="tp-img" src="/images/cebu5.webp" alt="cebu5" />}
                            {destination === 'Coron' && <img className="tp-img" src="/images/coron5.webp" alt="coron5" />}
                            {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/coron6.webp" alt="elnidocoron5" />}
                            {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/elnido5.webp" alt="puertopelnido5" />}
                            {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/portbaron3.webp" alt="puertopbaron5" />}
                            {destination === 'Siargao' && <img className="tp-img" src="/images/siargao5.webp" alt="siargao5" />}
                            </>
                        )}
                    </div>
                </div><hr />
                <div className="inclusion">
                    <h2>Inclusions:</h2>
                    <p>{ inclusions }</p>
                </div><hr />
                <div className="exclusion">
                    <h2>Exclusions:</h2>
                    <p>{ exclusions }</p>
                </div>
            </div>
        );
    };
};
 
export default TourDetails;