import TourDetails from "./TourDetails";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

const UpcomingTours = ({ bookings }) => {

    useFetch(`${process.env.REACT_APP_API_URL}/users/profile/bookings`, 'SET_BOOKING');
    const { tourPackages, toursHistory } = useContext(AllContext);

    let upcomingTours;
    let travelBuddies;
    let destination;
    let packageDuration;
    let tourDestination;
    // let daysLeft;

    if (bookings && tourPackages) {
        
        upcomingTours = bookings.map((booking) => {
            
            destination = booking.destination
            const {
                _id,
                tourStarts,
                tourEnds,
                travelPlan,
                buddies,
                isCompleted
            } = booking

            // Compare Dates
            const date1 = new Date(tourStarts).getDate();
            const date2 = new Date(tourEnds).getDate();
    
            // Get PackageDuration
            const datesDifference = date1 - date2;
            const datesInterval = Math.abs(datesDifference);
            
            switch (datesInterval) {
                case 5:
                    packageDuration = '5D4N';
                    break;
                case 4:
                    packageDuration = '4D3N';
                    break;
                case 3:
                    packageDuration = '3D2N';
                    break;
                case 29:
                    packageDuration = '5D4N';
                    break;
                case 28:
                    packageDuration = '4D3N';
                    break;
                case 27:
                    packageDuration = '3D2N';
                    break;
                default:
                    packageDuration = null;
            }
    
            // Reformat Dates
            let startDate = new Date(tourStarts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            let endDate;
            
            if (date1 < date2) {
                endDate = new Date(tourEnds).toLocaleDateString('en-US', { day: 'numeric' });
            } else {
                endDate = new Date(tourEnds).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
    
            let tourDates = `${startDate}-${endDate}, ${new Date(tourStarts).getFullYear()}`;
    
            // Days Left
            // const today = new Date();
            // const timeDiff = new Date(tourStarts).getTime() - today.getTime();
            // daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
            // Travel Buddies
            travelBuddies = buddies.map((buddy, i) => {
                const { fullName } = buddy;
                
                if (fullName.length !== 0) {
                  return (
                      <li style={{color: 'grey'}} key={i}>{fullName}</li>
                  );
                } else {
                  return null;
                }
            });

            tourDestination = tourPackages.find(
                (tourPackage) => {
                    return (
                        tourPackage.destination === destination &&
                        tourPackage.packageDuration === packageDuration
                    )
                }
            );

            // Tour Destination Details
            // const {
            //     itinerary: [{ day1, day2, day3, day4, day5 }],
            //     inclusions,
            //     exclusions
            // } = tourDestination;
           
            return (
                bookings.length === 0 ?
                <div className="no-tours">
                    <h3>No upcoming tours yet</h3>
                    <Link to='/destinations'>
                        <button>
                            View Available Tours
                        </button>
                    </Link>
                </div>
                :
                isCompleted ?
                <></>
                :
                <div key={_id} className="upcoming-tours-item">
                    <div className="tour">
                        <h4>{ destination }</h4>
                        <p>{ tourDates } | { packageDuration } | { travelPlan }</p>
                        
                    </div>

                    { travelBuddies[0] && 
                        <div className="buddies">
                            <h5>Travel Buddies:</h5>
                            <ol>
                                { travelBuddies }
                            </ol>
                        </div>
                    }
                    {/* Details */}
                    <TourDetails tourDestination={tourDestination} />
                </div>
            )
        })
    };

    // if (tourPackages && destination && packageDuration) {
    //     tourDestination = tourPackages.find(
    //         (tourPackage) => {
    //             return (
    //                 tourPackage.destination === destination &&
    //                 tourPackage.packageDuration === packageDuration
    //             )
    //         }
    //     );
        
      
    // };

    

    return ( 
        <div className="col-lg-8 upcoming-tours" style={{minHeight: '60vh'}}>
            <h3>Upcoming Tour:</h3>
            
            {
                !bookings ?
                <div className="loading">
                    <p>fetching data...</p>
                    <img src="/images/loading.gif" alt="loading" />
                </div>
                :
                bookings.length === 0 || (bookings.length === 0 && toursHistory) ?
                <div className="no-tours">
                
                    <h3>No upcoming tours yet</h3>
                    <Link to='/destinations'>
                        <button>
                            View Available Tours
                        </button>
                    </Link>
                </div>
                :
                <>
                {/* { daysLeft <= 0 ? (
                    <span>Tour is Going on</span>
                ) : (
                    <span>{ daysLeft } Days to Go!</span>
                )} */}
                { upcomingTours }
                </>
            }
        </div>
    );
}
 
export default UpcomingTours;