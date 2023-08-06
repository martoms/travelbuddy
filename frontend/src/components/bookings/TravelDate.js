import { Form } from "react-bootstrap";


const TravelDate = ({handleForm, formData}) => {

    let packageDuration = formData.packageDuration;
    let tourStarts = formData.tourStarts;
    let tourEnds;
    let year; 

        
    if (packageDuration && tourStarts.length !== 0) {
        
        tourStarts = new Date(formData.tourStarts);
        tourEnds = new Date(tourStarts);
        switch (packageDuration) {
            case '5D4N':
                tourEnds = new Date(tourEnds.setDate(
                                    tourEnds.getDate() + 5));
                break;
            case '4D3N':
                tourEnds = new Date(tourEnds.setDate(
                                    tourEnds.getDate() + 4));
                break;
            case '3D2N':
                tourEnds = new Date(tourEnds.setDate(
                                    tourEnds.getDate() + 3));
                break;
            default:
                tourEnds = null
        };
        year = tourStarts.getFullYear();
        
        tourEnds = tourStarts.getDate() < tourEnds.getDate()
        ? tourEnds.toLocaleDateString("en-US", { day: "numeric" })
        : tourEnds.toLocaleDateString("en-US", { month: "short", day: "numeric" });

        tourStarts =  tourStarts.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      });
        
    }


    return ( 
        <>
        <Form.Label htmlFor="travel-date" className="date">
            When do you wanna to go?
        </Form.Label>
        <Form.Label htmlFor="travel-date" className="travel-date">
            <input type="date" id="travel-date" name="tourStarts" onChange={(e) => handleForm(e)} />
            <Form.Label htmlFor="travel-date">
                { packageDuration.length === 0 ? ('Select a tour package first') : (
                    tourEnds === undefined ? ('👈 Click to pick start date') : (
                    `${tourStarts}-${tourEnds}, ${year}`
                ))}
            </Form.Label>
        </Form.Label>
        </>
    );
}
 
export default TravelDate;