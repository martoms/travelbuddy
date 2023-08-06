import { useState } from "react";
import useHandleForm from "../../hooks/useHandleForm";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import { Accordion, Form, Button } from "react-bootstrap";
import FormItinerary from "./FormItinerary";

const CreatePackage = () => {

    const initialFormState = {
        destination: '',
        packageDuration: '',
        tourStarts: '',
        basePrice: '',
        itinerary: [{ day1: '', day2: '', day3: '' }],
        inclusions: ''
    };
    const [showExclusions, setShowExclusions] = useState(false);
    const {
        formData,
        setFormData,
        handleForm,
    } = useHandleForm(initialFormState)
    const {
        createTourPackage
    } = useHandleSubmit(formData, initialFormState, setFormData)

    return ( 
        <div className="row create-package">
            <Accordion id="create-package">
                <Accordion.Item eventKey="0">
                <Accordion.Header className="create-package">
                    <div>
                        <img src="/images/create.svg" alt="create" />
                        <span className="create-package">Create New Package</span>
                    </div>
                </Accordion.Header>
                <Accordion.Body>
                    <Form id="create-package" onSubmit={(e) => createTourPackage(e)}>
                        <h4>New Package</h4>
                        
                        {/* Fields Start */}
                        <Form.Group className="section row d-flex">
                            <Form.Group className="col-12 col-md-3">
                                <Form.Label htmlFor="create-destination">Destination:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="destination"
                                    id="create-destination"
                                    value={formData.destination}
                                    onChange={(e) => handleForm(e)}
                                />
                            </Form.Group>

                            {
                                formData.destination.length !== 0 &&
                                <Form.Group className="col-12 col-md-3">
                                    <Form.Label htmlFor="packageDuration">Package:</Form.Label>
                                    <select id="packageDuration" name="packageDuration" value={formData.packageDuration} onChange={(e) => handleForm(e)}>
                                        <option>Select Duration</option>
                                        <option value="3D2N">3D2N</option>
                                        <option value="4D3N">4D3N</option>
                                        <option value="5D4N">5D4N</option>
                                    </select>
                                </Form.Group>
                            }
                            
                            {
                                formData.packageDuration.length !== 0 &&
                                <Form.Group className="col-12 col-md-3">
                                    <Form.Label htmlFor="create-date">Date Start:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="tourStarts"
                                        id="tourStarts"
                                        value={formData.tourStarts}
                                        onChange={(e) => handleForm(e)}
                                    />
                                </Form.Group>
                            }
                            
                            {
                                formData.tourStarts.length !== 0 &&
                                <Form.Group className="col-12 col-md-3">
                                    <Form.Label htmlFor="basePrice">{'Base Price'}</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="basePrice"
                                        id="basePrice"
                                        value={formData.basePrice}
                                        onChange={(e) => handleForm(e)}
                                    />
                                </Form.Group>
                            }
                            
                        </Form.Group>
                        
                        <FormItinerary
                            formData={formData}
                            handleForm={handleForm}
                            setFormData={setFormData}
                        />
                        
                        <Form.Group className="section row d-flex">

                            {
                                formData.itinerary[0].day3.length !== 0 &&
                                <Form.Group className="col-12 col-md-6">
                                    <Form.Label htmlFor="inclusions">Inclusions:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        id="inclusions"
                                        name="inclusions"
                                        value={formData.inclusions}
                                        onChange={(e) => handleForm(e)}
                                        required
                                    />
                                </Form.Group>
                            }
                            
                            
                            <Form.Group className="col-12 col-md-6">

                                {
                                    formData.inclusions.length !== 0 && !showExclusions &&
                                    <div className="tourpackage-add-fields" onClick={() => setShowExclusions(true)}>
                                        Add Exclusions
                                        <img src="/images/more.svg" alt="add more" style={{height: '30px', marginLeft: '5px'}} />
                                    </div>
                                }
                                {
                                    formData.inclusions.length !== 0 && showExclusions &&
                                    <>
                                    <Form.Label htmlFor="exclusions">
                                        Exclusions:
                                        <img src="/images/remove.svg"
                                            onClick={() => {
                                                setShowExclusions(false);
                                                delete formData['exclusions'];
                                            }}
                                            alt="remove"
                                            style={{height: '30px', marginLeft: '5px'}}
                                        />
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        id="exclusions"
                                        name="exclusions"
                                        onChange={(e) => handleForm(e)}
                                    />
                                    </>
                                }
                            </Form.Group>
                        </Form.Group>
                        {/* Fields End */}
                        <div className="create-package-btns">
                        {
                            formData.destination.length !== 0 &&
                            <Button
                                style={{backgroundColor: 'white'}}
                                onClick={() => setFormData(initialFormState)}
                            >
                            Cancel
                            </Button>
                        }
                        {
                            formData.inclusions.length !== 0 &&
                            <Button style={{marginLeft: '10px'}} type="submit">Submit</Button>
                        }
                        </div>
                    </Form>
                </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
}
 
export default CreatePackage;