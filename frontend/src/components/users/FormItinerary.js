import { Form } from "react-bootstrap";
import { useState } from "react";

const FormItinerary = ({ formData, handleForm, setFormData }) => {

    const [showDay4, setShowDay4] = useState(false)
    const [showDay5, setShowDay5] = useState(false)

    return ( 
        <Form.Group className="section itinerary row d-flex">
            <Form.Group className="col-12 col-md-6 col-lg-4">
                {
                    formData.basePrice.length !== 0 &&
                    <>
                    <Form.Label htmlFor="day1">Day 1:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        id="day1"
                        name="day1"
                        value={formData.itinerary[0].day1}
                        onChange={(e) => handleForm(e)}
                        required
                    />
                    </>
                }
                
            </Form.Group>
            <Form.Group className="col-12 col-md-6 col-lg-4">
                {
                    formData.itinerary[0].day1.length !== 0 &&
                    <>
                    <Form.Label htmlFor="day2">Day 2:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        id="day2"
                        name="day2"
                        value={formData.itinerary[0].day2}
                        onChange={(e) => handleForm(e)}
                        required
                    />
                    </>
                }
                
            </Form.Group>
            <Form.Group className="col-12 col-md-6 col-lg-4">
                {
                    formData.itinerary[0].day2.length !== 0 &&
                    <>
                    <Form.Label htmlFor="day3">Day 3:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        id="day3"
                        name="day3"
                        value={formData.itinerary[0].day3}
                        onChange={(e) => handleForm(e)}
                        required
                    />
                    </>
                }
                
            </Form.Group>
            {
                formData.itinerary[0].day3.length !== 0 && !showDay4 &&
                <div className="tourpackage-add-fields" onClick={() => setShowDay4(true)}>
                    Add day 4
                    <img src="/images/more.svg" alt="add more" style={{height: '30px', marginLeft: '5px'}} />
                </div>
            }
            
            <Form.Group className="col-12 col-md-6">
                {
                    formData.itinerary[0].day3.length !== 0 && showDay4 &&
                    <>
                    <Form.Label htmlFor="day4">
                        Day 4:
                        <img src="/images/remove.svg"
                            onClick={() => {
                                setShowDay4(false);
                                setFormData({...formData, packageDuration: '3D2N'})
                                delete formData.itinerary[0]['day4'];
                                delete formData.itinerary[0]['day5'];
                            }}
                            alt="remove"
                            style={{height: '30px', marginLeft: '5px'}}
                        />
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        id="day4"
                        name="day4"
                        onChange={(e) => handleForm(e)}
                    />
                    </>
                }
                
            </Form.Group>
            {
                formData.itinerary[0].day4 && formData.itinerary[0].day4.length !== 0 && !showDay5 &&
                <div className="tourpackage-add-fields" onClick={() => setShowDay5(true)}>
                    Add day 5
                    <img src="/images/more.svg" alt="add more" style={{height: '30px', marginLeft: '5px'}} />
                </div>
            }
            <Form.Group className="col-12 col-lg-6">
                {
                    formData.itinerary[0].day4 && formData.itinerary[0].day4.length !== 0 && showDay4 && showDay5 &&
                    <>
                    <Form.Label htmlFor="day5">
                        Day 5:
                        <img src="/images/remove.svg"
                            onClick={() => {
                                setShowDay5(false);
                                setFormData({...formData, packageDuration: '4D3N'})
                                delete formData.itinerary[0]['day5'];
                            }}
                            alt="remove"
                            style={{height: '30px', marginLeft: '5px'}}
                        />
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        id="day5"
                        name="day5"
                        onChange={(e) => handleForm(e)}
                    />
                    </>
                }
                
            </Form.Group>
            
        </Form.Group>
    );
}
 
export default FormItinerary;