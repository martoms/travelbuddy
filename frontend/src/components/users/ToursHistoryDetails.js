
const ToursHistoryDetails = ({ toursHistory }) => {
    

    if (toursHistory && toursHistory.details) {

        const toursHistoryDetails = toursHistory.details.map((tour) => {
            
            const {
                _id,
                destination,
                date,
                packageDuration,
                travelPlan
            } = tour;

            return (
                <div key={_id}>
                    <h4>{ destination }</h4>
                    <p>{ date } | { packageDuration } | { travelPlan }</p>
                </div>
            )
        })

        return ( 
            <>  
                { toursHistoryDetails }
            </>
        );
    }

    if (toursHistory && toursHistory.message) {
        return ( 
            <>  
                { toursHistory.message }
            </>
        );
    }

    return null

}
 
export default ToursHistoryDetails;