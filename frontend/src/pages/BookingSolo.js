// Hooks
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import useSelectDestination from "../hooks/bookings/useSelectDestination";
import useHandleForm from "../hooks/useHandleForm";
import useHandleSubmit from "../hooks/useHandleSubmit";
import useSelectPackageDuration from "../hooks/bookings/useSelectPackageDuration";
import useModal from "../hooks/useModal";
// Context
import { AllContext } from "../context/AllContext";
// Components
import { PriceSolo } from "../components/bookings/BookingPrice";
import PaymentOptions from "../components/bookings/PaymentOptions";
import { TravelPlanOptionsMain, TravelPlanOptionsMobile } from "../components/bookings/TravelPlanOptions";
import DestinationOptions from "../components/bookings/DestinationOptions";
import PackageDurationOptions from "../components/bookings/PackageDurationOptions";
import TravelDate from "../components/bookings/TravelDate";
import TravelPlanInfo from "../components/bookings/TravelPlanInfo";
import { PreviewPackageMain, PreviewPackageMobile } from "../components/bookings/PreviewPackage";
import Agreement from "../components/bookings/Agreement";
// Dependencies
import { Form, Button } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { AdminWarning, UnauthenticatedWarning } from "../components/Warning";

const BookingWithSolo = () => {

    useFetch(`${process.env.REACT_APP_API_URL}/users/profile`, 'SET_USER');
    const {isPending, error } = useFetch(`${process.env.REACT_APP_API_URL}/bookings/solo`, 'SET_TOURPACKAGE');

    const initialFormState = {
        destination: '',
        packageDuration: '',
        tourStarts: '',
        paymentMethod: '',
    };
    const {
        tourPackages,
        token,
        user
    } = useContext(AllContext);
    const {
        selectedDestination,
        destinationSelected
    } = useSelectDestination();
    const {
        selectedPackageDuration,
        packageDurationSelected
    } = useSelectPackageDuration();
    const {
        showTravelPlanInfo, handleCloseTravelPlanInfo, handleShowTravelPlanInfo,
        showPreviewPackage, handleClosePreviewPackage, handleShowPreviewPackage,
        showAgreement, handleCloseAgreement, handleShowAgreement
    } = useModal();
    const {
        formData,
        handleForm,
    } = useHandleForm(initialFormState)
    const {
        submitBooking
    } = useHandleSubmit(formData)

    if (error) {
        console.log('error');
    }

    let username;
    let isAdmin;
    if(user) {
        username = user.username
        isAdmin = user.isAdmin
    }

    return ( 
        token === null ?
        <>
        <Navigate to='/users/login' />
        <UnauthenticatedWarning />
        </>
        :
        (
            token && isAdmin ?
            <>
            <Navigate to='/users/login' />
            <AdminWarning username={username} />
            </>
            :
            <div id="solo" className="page container-fluid d-flex flex-column">
                <div className="container-fluid">
                    <h2 className="current-page scrollOffsetIndicator">Booking</h2>
                    <h1 className="d-lg-none">You're Traveling Solo!</h1>
                    <div className="row">
                        {/* TRAVEL OPTIONS (for mobile screens) */}
                        <TravelPlanOptionsMobile handleShowTravelPlanInfo={handleShowTravelPlanInfo} />
                        
                        {/* PREVIEW FOR LARGER SCREENS */}
                        <PreviewPackageMain
                            selectedDestination={selectedDestination}
                            tourPackages={tourPackages}
                        />

                        {/* FORM STARTS */}
                        <div className="col-12 col-lg-5 col-xl-4">
                            <Form onSubmit={(e) => submitBooking(e, 'solo')}>
                                {/* Travel Options Main */}
                                <TravelPlanOptionsMain handleShowTravelPlanInfo={handleShowTravelPlanInfo} />

                                {/* Destination Starts */}
                                <Form.Group className="section destination">
                                    <Form.Label className="section-title" htmlFor="destination">
                                        Destination
                                    </Form.Label>
                                    <Form.Group className="selection">
                                        <select id="destination" name="destination" value={selectedDestination} onChange={(e) => { destinationSelected(e); handleForm(e); }}>
                                            <option>{ isPending ? 'Loading Destinations....' : 'Select Destination'}</option>
                                            <DestinationOptions tourPackages={tourPackages} />
                                        </select>
                                    </Form.Group>
                                </Form.Group>
                                {/* Destination Ends */}

                                {/* Tours Start */}
                                <Form.Group className="section package">
                                    { selectedDestination && (
                                        <>
                                        <Form.Label className="section-title">Select Your Tour Package:</Form.Label>
                                        <Form.Group className="selection">
                                            <Form.Group className="selection">
                                                <select id="package" name="packageDuration" value={selectedPackageDuration} onChange={(e) => { packageDurationSelected(e); handleForm(e); }} >
                                                    <option>{ !selectedDestination ? 'Choose a destination first' : 'Select Tour Package'}</option>
                                                    <PackageDurationOptions
                                                        tourPackages={tourPackages}
                                                        selectedDestination={selectedDestination}
                                                    />
                                                </select>
                                            </Form.Group>
                                        </Form.Group>
                                        </>
                                    ) }
                                    {/* Travel Date */}
                                    { formData.packageDuration && <TravelDate handleForm={handleForm} formData={formData} /> }

                                    {/* Package Preview */}
                                    { selectedDestination && (
                                        selectedDestination === 'Select Destination' ? (<></>) : (
                                            <Form.Label className="preview d-lg-none" onClick={handleShowPreviewPackage}>
                                                Preview Package
                                            </Form.Label>
                                        )
                                    ) }
                                </Form.Group>
                                {/* Tours End */}

                                {/* Price */}
                                { formData.tourStarts.length !== 0 &&
                                    <PriceSolo
                                        selectedDestination={selectedDestination}
                                        formData={formData}
                                        tourPackages={tourPackages}
                                    />
                                }
                                
                                {/* Payment Options */}
                                { (selectedDestination && formData.tourStarts.length !== 0) && <PaymentOptions handleForm={handleForm} /> }
                                {/* Pay Now Button */}
                                { formData.paymentMethod.length === 0 ? (<></>) : (
                                    <div className="section paynow">
                                        <div className="agree">
                                            <input className="form-check-input" type="checkbox" id="agree" value="agree" onClick={handleShowAgreement} />
                                            <Form.Label className="d-inline-block" htmlFor="agree">I have read and agreed <wbr />with <wbr />the <wbr />terms <wbr />and <wbr />conditions.</Form.Label>
                                        </div>
                                        {
                                            (document.getElementById('agree') && document.getElementById('agree').checked) ?
                                            (( <Button className="btn-primary" type="submit">Pay Now!</Button>))
                                            :
                                            ( <Button className="btn-primary" type="submit" disabled>Pay Now!</Button>)
                                        }
                                    </div>
                                )}

                            </Form>
                        </div>
                        {/* FORM ENDS */}

                        {/* Travel Plan Info */}
                            <TravelPlanInfo
                                showTravelPlanInfo={showTravelPlanInfo}
                                handleCloseTravelPlanInfo={handleCloseTravelPlanInfo}
                            />

                            {/* Preview Package */}
                            <PreviewPackageMobile
                                showPreviewPackage={showPreviewPackage}
                                handleClosePreviewPackage={handleClosePreviewPackage}
                                selectedDestination={selectedDestination}
                                tourPackages={tourPackages}
                            />

                            {/* Terms and Conditions Agreement */}
                            <Agreement
                                showAgreement={showAgreement}
                                handleCloseAgreement={handleCloseAgreement}
                            />

                    </div>
                </div>
            </div>
        )
    );
}
 
export default BookingWithSolo;