import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import useHandleForm from "../../hooks/useHandleForm";
import useHandleSubmit from "../../hooks/useHandleSubmit";

const ExperienceForm = ({ toursHistory }) => {
    
    const initialFormState = {
        tourPackageId: '',
        message: '',
        rating: '',
    };

    const {
        formData,
        setFormData,
        handleForm,
    } = useHandleForm(initialFormState)
    const {
        submitExperience
    } = useHandleSubmit(formData, initialFormState, setFormData)

    useEffect(() => {
        if (toursHistory) {
            
            const tourDestination = toursHistory.noUserExperience[0];
            const { _id } = tourDestination;

            setFormData({ ...formData, tourPackageId: _id });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    if (toursHistory) {

        const tourDestination = toursHistory.noUserExperience[0];

        const {
            destination,
            tourStarts,
            tourEnds,
            packageDuration,
        } = tourDestination


        // Compare Dates
        const date1 = new Date(tourStarts).getDate();
        const date2 = new Date(tourEnds).getDate();

        // Reformat Dates
        let startDate = new Date(tourStarts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        let endDate;
        
        if (date1 < date2) {
            endDate = new Date(tourEnds).toLocaleDateString('en-US', { day: 'numeric' });
        } else {
            endDate = new Date(tourEnds).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }

        let tourDates = `${startDate}-${endDate}, ${new Date(tourStarts).getFullYear()}`;


        return ( 
            <Form id="addExperience" onSubmit={submitExperience}>
                <h4>Share Experience</h4>
                
                {/* Fields Start */}
                <Form.Label htmlFor="destination">Destination:</Form.Label>
                <Form.Control
                    type="text"
                    name="destination"
                    id="destination"
                    defaultValue={ destination }
                    title="No need to edit this field"
                    readOnly
                />
    
                <Form.Label htmlFor="date">When:</Form.Label>
                <Form.Control
                    type="text"
                    name="date"
                    id="date"
                    title="No need to edit this field"
                    defaultValue={ tourDates }
                    readOnly
                />
    
                <Form.Label htmlFor="package">Package:</Form.Label>
                <Form.Control
                    type="text"
                    name="package"
                    id="package"
                    title="No need to edit this field"
                    defaultValue={ packageDuration }
                    readOnly
                />
    
                <Form.Label htmlFor="message">Your Experience:</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={5}
                    id="message"
                    name="message"
                    value={formData.message}
                    maxLength={500}
                    onChange={handleForm}
                    required
                />
                <div>{`(${formData.message.length}/500)`}</div>
    
                <Form.Label htmlFor="rating">Rating:</Form.Label>
                <select id="rating" name="rating" value={formData.rating} onChange={handleForm}>
                    <option>Select</option>
                    <option value="1 Star">1 Star</option>
                    <option value="2 Stars">2 Stars</option>
                    <option value="3 Stars">3 Stars</option>
                    <option value="4 Stars">4 Stars</option>
                    <option value="5 Stars">5 Stars</option>
                </select>
                
                {/* Submit Button */}
                <Button type="submit">Submit</Button>
                
            </Form>
        );
    };
};
 
export default ExperienceForm;