import { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import useReformatDate from "../../hooks/useReformatDate";
import { ActiveArchive } from "./AdminModify";
import useHandleForm from "../../hooks/useHandleForm";
import useHandleSubmit from "../../hooks/useHandleSubmit";
import useTourPackageValue from "../../hooks/useTourPackageValue";

const AdminTourPackages = ({ destinationTourPackages, allBookings }) => {

    const initialFormState = {
        packageDuration: '',
        basePrice: '',
        itinerary: [{ day1: '', day2: '', day3: '' }],
        inclusions: ''
    };
    const {
        formData,
        setFormData,
        handleForm,
    } = useHandleForm(initialFormState)
    const {
        updateTourPackage
    } = useHandleSubmit(formData, initialFormState, setFormData)

    const { reformatDate } = useReformatDate()
    const [edit, setEdit] = useState(false);
    useTourPackageValue(edit, setEdit, formData, setFormData)

    const tourPackages = destinationTourPackages.map(destinationTourPackage => {

        const {
            _id,
            destination,
            packageDuration,
            tourStarts,
            tourEnds,
            basePrice,
            itinerary: [{ day1, day2, day3, day4, day5 }],
            inclusions,
            exclusions,
            isActive,
            availableSlots
        } = destinationTourPackage;

        const dates = reformatDate(tourStarts, tourEnds)

        

        return (
            <Accordion.Item
                key={_id}
                eventKey={_id}
                className="destination-tourpackage"
            >
                <Accordion.Header  className="admin-control-item">
                    {
                        edit && allBookings.length === 0 ?
                        <>
                        <select
                            style={{
                                width: '100px',
                                marginRight: '5px'
                            }}
                            id="tourpackage-packageDuration"
                            name="packageDuration"
                            defaultValue={packageDuration}
                            onChange={(e) => handleForm(e)}
                            required
                        >
                            <option value="3D2N">3D2N</option>
                            <option value="4D3N">4D3N</option>
                            <option value="5D4N">5D4N</option>
                        </select>
                        <Form.Control
                            id="tourpackage-tourStarts"
                            type="date"
                            name="tourStarts"
                            onChange={(e) => handleForm(e)}
                            required
                        />
                        </>
                        :
                        isActive ?
                        <div>
                            <img style={{left: '10px'}} src="/images/active.svg" alt="active" /> { packageDuration } | { dates }
                        </div>
                        :
                        <>
                        <div>
                            <img style={{left: '10px'}} src="/images/inactive.svg" alt="inactive" /> { packageDuration } | { dates }
                        </div>
                        </>
                    }
                </Accordion.Header>
                <Accordion.Body>
                    <div className="tourpackage-controls">
                        <ActiveArchive isActive={isActive} availableSlots={availableSlots} _id={_id} />
                        <div className="edit" onClick={() => setEdit(true)}>
                            <span>Edit</span>
                            <img src="/images/edit.svg" alt="edit" style={{width: '20px'}} />
                        </div>
                    </div>
                    <hr />
                    <Form onSubmit={(e) => updateTourPackage(e, _id, setEdit)}>
                        <div>
                            <p style={{margin: '0'}}>
                                <span>
                                    {`Available Slots: `}
                                </span>
                                { availableSlots }
                            </p>
                            <p>
                                <span>
                                    {`Base Price: `}
                                </span>
                                {
                                    edit ?
                                    <Form.Control
                                        id="tourpackage-basePrice"
                                        type="number"
                                        name="basePrice"
                                        defaultValue={basePrice}
                                        onChange={(e) => handleForm(e)}
                                        required
                                    />
                                    :
                                    <>
                                    { basePrice }
                                    </>
                                }
                            </p>
                        </div>
                        <hr />
                        <div className="destination-tourpackage-details">
                            <div className="itinerary">
                                <h2>Itinerary:</h2>
                                <h6>Day 1</h6>
                                {
                                    edit ?
                                    <Form.Control
                                        id="tourpackage-day1"
                                        as="textarea"
                                        rows={5}
                                        name="day1"
                                        defaultValue={day1}
                                        onChange={(e) => handleForm(e)}
                                        required
                                    />
                                    :
                                    <p>{ day1 }</p>
                                }
                                {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac1.webp" alt="balabac1" />}
                                {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/cebu3.webp" alt="cebubohol1" />}
                                {destination === 'Cebu' && <img className="tp-img" src="/images/cebu1.webp" alt="cebu1" />}
                                {destination === 'Coron' && <img className="tp-img" src="/images/coron1.webp" alt="coron1" />}
                                {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/elnido1.webp" alt="elnidocoron1" />}
                                {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/palawan1.webp" alt="puertopelnido1" />}
                                {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/palawan3.webp" alt="puertopbaron1" />}
                                {destination === 'Siargao' && <img className="tp-img" src="/images/siargao1.webp" alt="siargao1" />}
                                <h6>Day 2</h6>
                                {
                                    edit ?
                                    <Form.Control
                                        id="tourpackage-day2"
                                        as="textarea"
                                        rows={5}
                                        name="day2"
                                        defaultValue={day2}
                                        onChange={(e) => handleForm(e)}
                                        required
                                    />
                                    :
                                    <p>{ day2 }</p>
                                }
                                {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac2.webp" alt="balabac2" />}
                                {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/cebu4.webp" alt="cebubohol2" />}
                                {destination === 'Cebu' && <img className="tp-img" src="/images/cebu2.webp" alt="cebu2" />}
                                {destination === 'Coron' && <img className="tp-img" src="/images/coron2.webp" alt="coron2" />}
                                {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/elnido2.webp" alt="elnidocoron2" />}
                                {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/palawan2.webp" alt="puertopelnido2" />}
                                {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/palawan4.webp" alt="puertopbaron2" />}
                                {destination === 'Siargao' && <img className="tp-img" src="/images/siargao2.webp" alt="siargao2" />}
                                <h6>Day 3</h6>
                                {
                                    edit ?
                                    <Form.Control
                                        id="tourpackage-day3"
                                        as="textarea"
                                        rows={5}
                                        name="day3"
                                        defaultValue={day3}
                                        onChange={(e) => handleForm(e)}
                                        required
                                    />
                                    :
                                    <>
                                    <p>{ day3 }</p>
                                    {destination === 'Balabac Island' && <img className="tp-img" src="/images/balabac3.webp" alt="balabac3" />}
                                    {destination === 'Cebu-Bohol' && <img className="tp-img" src="/images/bohol2.webp" alt="cebubohol3" />}
                                    {destination === 'Cebu' && <img className="tp-img" src="/images/cebu3.webp" alt="cebu3" />}
                                    {destination === 'Coron' && <img className="tp-img" src="/images/coron3.webp" alt="coron3" />}
                                    {destination === 'El Nido - Coron' && <img className="tp-img" src="/images/coron4.webp" alt="elnidocoron3" />}
                                    {destination === 'Puerto Princesa - El Nido' && <img className="tp-img" src="/images/elnido3.webp" alt="puertopelnido3" />}
                                    {destination === 'Puerto Princesa - Port Baron' && <img className="tp-img" src="/images/portbaron1.webp" alt="puertopbaron3" />}
                                    {destination === 'Siargao' && <img className="tp-img" src="/images/siargao3.webp" alt="siargao3" />}
                                    </>
                                }
                                { day4 !== undefined && (
                                    <>
                                    <h6>Day 4</h6>
                                    {
                                        edit ?
                                        <Form.Control
                                            id="tourpackage-day4"
                                            as="textarea"
                                            rows={5}
                                            name="day4"
                                            defaultValue={day4}
                                            onChange={(e) => handleForm(e)}
                                        />
                                        :
                                        <>
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
                                    }
                                    </>
                                )}
                                { day5 !== undefined && (
                                    <>
                                    <h6>Day 5</h6>
                                    {
                                        edit ?
                                        <Form.Control
                                            id="tourpackage-day5"
                                            as="textarea"
                                            rows={5}
                                            name="day5"
                                            defaultValue={day5}
                                            onChange={(e) => handleForm(e)}
                                        />
                                        :
                                        <>
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
                                    }
                                    </>
                                )}
                            </div><hr />
                            
                            <div className="inclusion">
                                <h2>Inclusions:</h2>
                                {
                                    edit ?
                                    <Form.Control
                                        id="tourpackage-inclusions"
                                        as="textarea"
                                        rows={5}
                                        name="inclusions"
                                        defaultValue={inclusions}
                                        onChange={(e) => handleForm(e)}
                                        required
                                    />
                                    :
                                    <p>{ inclusions }</p>
                                }
                            </div>
                            {
                                exclusions === undefined ?
                                <></>
                                :
                                <>
                                <hr />
                                <div className="exclusion">
                                    <h2>Exclusions:</h2>
                                    {
                                        edit ?
                                    <Form.Control
                                        id="tourpackage-exclusions"
                                        as="textarea"
                                        rows={5}
                                        name="exclusions"
                                        defaultValue={exclusions}
                                        onChange={(e) => handleForm(e)}
                                    />
                                    :
                                    <p>{ exclusions }</p>
                                    }
                                </div>
                                </>
                            }
                        </div>
                        {
                            edit &&
                            <>
                            <Button onClick={() => setEdit(false)} >Cancel</Button> 
                            <Button 
                                type="submit" 
                                disabled={!formData.tourStarts}
                                title="Plase set the date"
                            >
                            Submit
                            </Button>
                            </>
                        }
                    </Form>
                </Accordion.Body>
            </Accordion.Item>
        )

    });

    return tourPackages;
}

export default AdminTourPackages;